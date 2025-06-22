-- All table SQL configuration
create table public.users (
  auth0_user_id text not null,
  email text not null,
  name text null,
  picture text null,
  role text null default 'user'::text,
  created_at timestamp with time zone null default now(),
  last_login timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint users_pkey primary key (auth0_user_id),
  constraint users_email_key unique (email),
  constraint users_role_check check ((role = any (array['user'::text, 'admin'::text])))
) TABLESPACE pg_default;

create index IF not exists idx_users_email on public.users using btree (email) TABLESPACE pg_default;

create index IF not exists idx_users_role on public.users using btree (role) TABLESPACE pg_default;

create trigger update_users_updated_at BEFORE
update on users for EACH row
execute FUNCTION update_updated_at_column ();

create view public.user_progress_overview as
select
  u.auth0_user_id,
  u.name as user_name,
  u.email,
  count(distinct qr.category_id) as categories_attempted,
  count(distinct qr.quiz_id) as quizzes_attempted,
  count(qr.id) as total_quiz_attempts,
  COALESCE(avg(qr.percentage), 0::numeric) as overall_average_score,
  count(distinct ss.id) as study_sessions_completed,
  COALESCE(avg(ss.improvement_percentage), 0::numeric) as average_improvement,
  max(qr.completed_at) as last_quiz_taken
from
  users u
  left join quiz_results qr on u.auth0_user_id = qr.user_id
  left join study_sessions ss on u.auth0_user_id = ss.user_id
  and ss.session_status = 'post_quiz_completed'::text
where
  u.role = 'user'::text
group by
  u.auth0_user_id,
  u.name,
  u.email
order by
  (max(qr.completed_at)) desc;

  create table public.study_sessions (
  id uuid not null default extensions.uuid_generate_v4 (),
  user_id text not null,
  category_id uuid not null,
  pre_study_quiz_id uuid null,
  pre_study_result_id uuid null,
  study_started_at timestamp with time zone null,
  study_completed_at timestamp with time zone null,
  post_study_quiz_id uuid null,
  post_study_result_id uuid null,
  improvement_score integer null,
  improvement_percentage numeric(5, 2) null,
  session_status text null default 'started'::text,
  created_at timestamp with time zone null default now(),
  lesson_started_at timestamp with time zone null,
  lesson_time_spent_minutes integer null,
  lesson_sections_completed jsonb null default '[]'::jsonb,
  constraint study_sessions_pkey primary key (id),
  constraint study_sessions_category_id_fkey foreign KEY (category_id) references quiz_categories (id) on delete CASCADE,
  constraint study_sessions_post_study_quiz_id_fkey foreign KEY (post_study_quiz_id) references quizzes (id),
  constraint study_sessions_post_study_result_id_fkey foreign KEY (post_study_result_id) references quiz_results (id),
  constraint study_sessions_pre_study_quiz_id_fkey foreign KEY (pre_study_quiz_id) references quizzes (id),
  constraint study_sessions_pre_study_result_id_fkey foreign KEY (pre_study_result_id) references quiz_results (id),
  constraint study_sessions_user_id_fkey foreign KEY (user_id) references users (auth0_user_id) on delete CASCADE,
  constraint study_sessions_session_status_check check (
    (
      session_status = any (
        array[
          'started'::text,
          'pre_quiz_completed'::text,
          'studying'::text,
          'study_completed'::text,
          'post_quiz_completed'::text
        ]
      )
    )
  ),
  constraint check_study_timestamps check (
    (
      (study_completed_at is null)
      or (study_started_at is null)
      or (study_completed_at >= study_started_at)
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_sessions_user on public.study_sessions using btree (user_id) TABLESPACE pg_default;

create index IF not exists idx_sessions_category on public.study_sessions using btree (category_id) TABLESPACE pg_default;

create index IF not exists idx_sessions_status on public.study_sessions using btree (session_status) TABLESPACE pg_default;

create index IF not exists idx_sessions_created_at on public.study_sessions using btree (created_at desc) TABLESPACE pg_default;

create index IF not exists idx_sessions_lesson_started on public.study_sessions using btree (lesson_started_at) TABLESPACE pg_default;

create trigger trigger_update_study_session_improvement BEFORE INSERT
or
update on study_sessions for EACH row
execute FUNCTION update_study_session_improvement ();

create table public.quizzes (
  id uuid not null default extensions.uuid_generate_v4 (),
  category_id uuid not null,
  title text not null,
  description text null,
  instructions text null,
  difficulty text null default 'Medium'::text,
  time_limit_minutes integer null,
  shuffle_questions boolean null default false,
  shuffle_options boolean null default false,
  is_published boolean null default false,
  is_active boolean null default true,
  created_by text not null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  quiz_type text null default 'standalone'::text,
  lesson_topic text null,
  paired_quiz_id uuid null,
  constraint quizzes_pkey primary key (id),
  constraint quizzes_category_id_fkey foreign KEY (category_id) references quiz_categories (id) on delete CASCADE,
  constraint quizzes_created_by_fkey foreign KEY (created_by) references users (auth0_user_id) on delete CASCADE,
  constraint quizzes_paired_quiz_id_fkey foreign KEY (paired_quiz_id) references quizzes (id),
  constraint quizzes_difficulty_check check (
    (
      difficulty = any (array['Easy'::text, 'Medium'::text, 'Hard'::text])
    )
  ),
  constraint quizzes_quiz_type_check check (
    (
      quiz_type = any (
        array[
          'pre-lesson'::text,
          'post-lesson'::text,
          'standalone'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_quizzes_category on public.quizzes using btree (category_id) TABLESPACE pg_default;

create index IF not exists idx_quizzes_published on public.quizzes using btree (is_published) TABLESPACE pg_default;

create index IF not exists idx_quizzes_active on public.quizzes using btree (is_active) TABLESPACE pg_default;

create index IF not exists idx_quizzes_created_by on public.quizzes using btree (created_by) TABLESPACE pg_default;

create index IF not exists idx_quizzes_type on public.quizzes using btree (quiz_type) TABLESPACE pg_default;

create index IF not exists idx_quizzes_topic on public.quizzes using btree (lesson_topic) TABLESPACE pg_default;

create trigger update_quizzes_updated_at BEFORE
update on quizzes for EACH row
execute FUNCTION update_updated_at_column ();

create table public.quiz_results (
  id uuid not null default extensions.uuid_generate_v4 (),
  user_id text not null,
  quiz_id uuid not null,
  category_id uuid not null,
  quiz_title text not null,
  category_name text not null,
  total_questions integer not null,
  correct_answers integer not null default 0,
  score integer not null default 0,
  max_possible_score integer not null,
  percentage numeric GENERATED ALWAYS as (
    case
      when (max_possible_score > 0) then (
        ((score)::numeric / (max_possible_score)::numeric) * (100)::numeric
      )
      else (0)::numeric
    end
  ) STORED (5, 2) null,
  user_answers jsonb not null default '[]'::jsonb,
  time_taken_seconds integer null,
  started_at timestamp with time zone null default now(),
  completed_at timestamp with time zone null default now(),
  session_type text null default 'regular'::text,
  constraint quiz_results_pkey primary key (id),
  constraint quiz_results_category_id_fkey foreign KEY (category_id) references quiz_categories (id) on delete CASCADE,
  constraint quiz_results_quiz_id_fkey foreign KEY (quiz_id) references quizzes (id) on delete CASCADE,
  constraint quiz_results_user_id_fkey foreign KEY (user_id) references users (auth0_user_id) on delete CASCADE,
  constraint quiz_results_session_type_check check (
    (
      session_type = any (
        array[
          'regular'::text,
          'pre_study'::text,
          'post_study'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_results_user on public.quiz_results using btree (user_id) TABLESPACE pg_default;

create index IF not exists idx_results_quiz on public.quiz_results using btree (quiz_id) TABLESPACE pg_default;

create index IF not exists idx_results_category on public.quiz_results using btree (category_id) TABLESPACE pg_default;

create index IF not exists idx_results_completed_at on public.quiz_results using btree (completed_at desc) TABLESPACE pg_default;

create index IF not exists idx_results_session_type on public.quiz_results using btree (session_type) TABLESPACE pg_default;

create index IF not exists idx_results_percentage on public.quiz_results using btree (percentage desc) TABLESPACE pg_default;

create table public.quiz_questions (
  id uuid not null default extensions.uuid_generate_v4 (),
  quiz_id uuid not null,
  question_text text not null,
  question_image_url text null,
  options jsonb not null,
  correct_answer text not null,
  explanation text null,
  points integer null default 10,
  penalty integer null default 0,
  question_order integer not null,
  created_at timestamp with time zone null default now(),
  constraint quiz_questions_pkey primary key (id),
  constraint quiz_questions_quiz_id_question_order_key unique (quiz_id, question_order),
  constraint quiz_questions_quiz_id_fkey foreign KEY (quiz_id) references quizzes (id) on delete CASCADE,
  constraint check_minimum_options check (
    (
      (jsonb_array_length(options) >= 2)
      and (jsonb_array_length(options) <= 8)
    )
  ),
  constraint quiz_questions_penalty_check check ((penalty >= 0)),
  constraint quiz_questions_points_check check ((points > 0))
) TABLESPACE pg_default;

create index IF not exists idx_questions_quiz on public.quiz_questions using btree (quiz_id) TABLESPACE pg_default;

create index IF not exists idx_questions_order on public.quiz_questions using btree (quiz_id, question_order) TABLESPACE pg_default;

create trigger trigger_validate_quiz_question BEFORE INSERT
or
update on quiz_questions for EACH row
execute FUNCTION validate_quiz_question ();

create table public.quiz_categories (
  id uuid not null default extensions.uuid_generate_v4 (),
  name text not null,
  slug text not null,
  description text null,
  image_url text null,
  is_active boolean null default true,
  display_order integer null default 0,
  created_by text not null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint quiz_categories_pkey primary key (id),
  constraint quiz_categories_name_key unique (name),
  constraint quiz_categories_slug_key unique (slug),
  constraint quiz_categories_created_by_fkey foreign KEY (created_by) references users (auth0_user_id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_categories_slug on public.quiz_categories using btree (slug) TABLESPACE pg_default;

create index IF not exists idx_categories_active on public.quiz_categories using btree (is_active) TABLESPACE pg_default;

create index IF not exists idx_categories_display_order on public.quiz_categories using btree (display_order) TABLESPACE pg_default;

create trigger update_categories_updated_at BEFORE
update on quiz_categories for EACH row
execute FUNCTION update_updated_at_column ();

create view public.learning_flow_overview as
select
  ss.id as session_id,
  ss.user_id,
  u.name as user_name,
  c.name as topic_name,
  c.slug as topic_slug,
  ss.session_status,
  ss.created_at as session_started,
  pre_q.title as pre_quiz_title,
  pre_r.score as pre_quiz_score,
  pre_r.completed_at as pre_quiz_completed,
  ss.study_started_at as lesson_started,
  ss.study_completed_at as lesson_completed,
  ss.lesson_time_spent_minutes,
  post_q.title as post_quiz_title,
  post_r.score as post_quiz_score,
  post_r.completed_at as post_quiz_completed,
  ss.improvement_score,
  ss.improvement_percentage,
  case
    when ss.session_status = 'started'::text then 'Ready for pre-quiz'::text
    when ss.session_status = 'pre_quiz_completed'::text then 'Ready for lesson'::text
    when ss.session_status = 'studying'::text then 'Currently in lesson'::text
    when ss.session_status = 'study_completed'::text then 'Ready for post-quiz'::text
    when ss.session_status = 'post_quiz_completed'::text then 'Session complete'::text
    else null::text
  end as next_action
from
  study_sessions ss
  left join users u on ss.user_id = u.auth0_user_id
  left join quiz_categories c on ss.category_id = c.id
  left join quizzes pre_q on ss.pre_study_quiz_id = pre_q.id
  left join quiz_results pre_r on ss.pre_study_result_id = pre_r.id
  left join quizzes post_q on ss.post_study_quiz_id = post_q.id
  left join quiz_results post_r on ss.post_study_result_id = post_r.id
order by
  ss.created_at desc;

  create view public.admin_quiz_overview as
select
  c.name as category_name,
  c.slug as category_slug,
  q.id as quiz_id,
  q.title as quiz_title,
  q.difficulty,
  q.is_published,
  count(qq.id) as question_count,
  count(qr.id) as total_attempts,
  count(distinct qr.user_id) as unique_users,
  COALESCE(avg(qr.percentage), 0::numeric) as average_score,
  q.created_at,
  u.name as created_by_name
from
  quiz_categories c
  left join quizzes q on c.id = q.category_id
  left join quiz_questions qq on q.id = qq.quiz_id
  left join quiz_results qr on q.id = qr.quiz_id
  left join users u on q.created_by = u.auth0_user_id
group by
  c.id,
  c.name,
  c.slug,
  q.id,
  q.title,
  q.difficulty,
  q.is_published,
  q.created_at,
  u.name
order by
  c.display_order,
  q.created_at desc;