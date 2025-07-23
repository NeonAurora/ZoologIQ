-- 🚨 DESTRUCTIVE OPERATION! THIS WILL REMOVE ALL TABLES AND VIEWS!

drop view if exists public.admin_quiz_overview cascade;
drop view if exists public.learning_flow_overview cascade;
drop view if exists public.user_progress_overview cascade;

drop table if exists public.quiz_questions cascade;
drop table if exists public.quiz_results cascade;
drop table if exists public.quizzes cascade;
drop table if exists public.study_sessions cascade;
drop table if exists public.quiz_categories cascade;
drop table if exists public.users cascade;

-- =========================================
-- USERS TABLE
-- =========================================
create table public.users (
  auth0_user_id text not null,
  email text not null,
  name text null,
  picture text null,
  role text default 'user' check (role in ('user','admin')),
  created_at timestamp with time zone default now(),
  last_login timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  onboarding_completed boolean default false,
  preferred_language text default 'en' check (preferred_language in ('en','ms')),
  education_status text null,
  highest_education text null,
  city text null,
  district text null,
  state_province text null,
  occupation text null,
  age integer null,
  gender text null,
  constraint users_pkey primary key (auth0_user_id),
  constraint users_email_key unique (email)
);

create index if not exists idx_users_email on public.users(email);
create index if not exists idx_users_role on public.users(role);
create index if not exists idx_users_onboarding_completed on public.users(onboarding_completed);
create index if not exists idx_users_preferred_language on public.users(preferred_language);

create trigger update_users_updated_at
before update on public.users
for each row
execute function update_updated_at_column();

-- =========================================
-- QUIZ CATEGORIES TABLE
-- =========================================
create table public.quiz_categories (
  id uuid not null default extensions.uuid_generate_v4(),
  name jsonb not null,
  slug text not null,
  description jsonb null,
  image_url text null,
  is_active boolean default true,
  display_order integer default 0,
  created_by text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint quiz_categories_pkey primary key (id),
  constraint quiz_categories_name_key unique (name),
  constraint quiz_categories_slug_key unique (slug),
  constraint quiz_categories_created_by_fkey foreign key (created_by) references public.users(auth0_user_id) on delete cascade,
  constraint check_name_languages check (name ? 'en' and name ? 'ms'),
  constraint check_description_languages check (description is null or (description ? 'en' and description ? 'ms'))
);

create index if not exists idx_categories_slug on public.quiz_categories(slug);
create index if not exists idx_categories_active on public.quiz_categories(is_active);
create index if not exists idx_categories_display_order on public.quiz_categories(display_order);

create trigger update_categories_updated_at
before update on public.quiz_categories
for each row
execute function update_updated_at_column();

-- =========================================
-- QUIZZES TABLE
-- =========================================
create table public.quizzes (
  id uuid not null default extensions.uuid_generate_v4(),
  category_id uuid not null,
  title jsonb not null,
  description jsonb null,
  instructions jsonb null,
  difficulty text default 'Medium' check (difficulty in ('Easy','Medium','Hard')),
  time_limit_minutes integer null,
  shuffle_questions boolean default false,
  shuffle_options boolean default false,
  is_published boolean default false,
  is_active boolean default true,
  created_by text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  quiz_type text default 'standalone' check (quiz_type in ('pre-lesson','post-lesson','standalone')),
  lesson_topic text null,
  paired_quiz_id uuid null,
  constraint quizzes_pkey primary key (id),
  constraint quizzes_category_id_fkey foreign key (category_id) references public.quiz_categories(id) on delete cascade,
  constraint quizzes_created_by_fkey foreign key (created_by) references public.users(auth0_user_id) on delete cascade,
  constraint quizzes_paired_quiz_id_fkey foreign key (paired_quiz_id) references public.quizzes(id),
  constraint check_title_languages check (title ? 'en' and title ? 'ms'),
  constraint check_quiz_description_languages check (description is null or (description ? 'en' and description ? 'ms')),
  constraint check_instructions_languages check (instructions is null or (instructions ? 'en' and instructions ? 'ms'))
);

create index if not exists idx_quizzes_category on public.quizzes(category_id);
create index if not exists idx_quizzes_published on public.quizzes(is_published);
create index if not exists idx_quizzes_active on public.quizzes(is_active);
create index if not exists idx_quizzes_created_by on public.quizzes(created_by);
create index if not exists idx_quizzes_type on public.quizzes(quiz_type);
create index if not exists idx_quizzes_topic on public.quizzes(lesson_topic);

create trigger update_quizzes_updated_at
before update on public.quizzes
for each row
execute function update_updated_at_column();

-- =========================================
-- QUIZ QUESTIONS TABLE
-- =========================================
create table public.quiz_questions (
  id uuid not null default extensions.uuid_generate_v4(),
  quiz_id uuid not null,
  question_text jsonb not null,
  question_image_url text null,
  options jsonb not null,
  correct_answer text not null,
  explanation jsonb null,
  points integer default 10 check (points > 0),
  penalty integer default 0 check (penalty >= 0),
  question_order integer not null,
  created_at timestamp with time zone default now(),
  constraint quiz_questions_pkey primary key (id),
  constraint quiz_questions_quiz_id_question_order_key unique (quiz_id, question_order),
  constraint quiz_questions_quiz_id_fkey foreign key (quiz_id) references public.quizzes(id) on delete cascade,
  constraint check_minimum_options check (jsonb_array_length(options->'en') between 2 and 8),
  constraint check_question_text_languages check (question_text ? 'en' and question_text ? 'ms'),
  constraint check_explanation_languages check (explanation is null or (explanation ? 'en' and explanation ? 'ms')),
  constraint check_options_languages check (options ? 'en' and options ? 'ms')
);

create index if not exists idx_questions_quiz on public.quiz_questions(quiz_id);
create index if not exists idx_questions_order on public.quiz_questions(quiz_id, question_order);

create trigger trigger_validate_quiz_question
before insert or update on public.quiz_questions
for each row
execute function validate_quiz_question();

-- =========================================
-- QUIZ RESULTS TABLE
-- =========================================
create table public.quiz_results (
  id uuid not null default extensions.uuid_generate_v4(),
  user_id text not null,
  quiz_id uuid not null,
  category_id uuid not null,
  quiz_title text not null,
  category_name text not null,
  total_questions integer not null,
  correct_answers integer default 0,
  score integer default 0,
  max_possible_score integer not null,
  percentage numeric generated always as (
    (
      case
        when max_possible_score > 0 then ((score::numeric / max_possible_score::numeric) * 100)
        else 0
      end
    )::numeric(5,2)
  ) stored,
  user_answers jsonb default '[]',
  time_taken_seconds integer null,
  started_at timestamp with time zone default now(),
  completed_at timestamp with time zone default now(),
  session_type text default 'regular' check (session_type in ('regular','pre_study','post_study')),
  constraint quiz_results_pkey primary key (id),
  constraint quiz_results_category_id_fkey foreign key (category_id) references public.quiz_categories(id) on delete cascade,
  constraint quiz_results_quiz_id_fkey foreign key (quiz_id) references public.quizzes(id) on delete cascade,
  constraint quiz_results_user_id_fkey foreign key (user_id) references public.users(auth0_user_id) on delete cascade
);

create index if not exists idx_results_user on public.quiz_results(user_id);
create index if not exists idx_results_quiz on public.quiz_results(quiz_id);
create index if not exists idx_results_category on public.quiz_results(category_id);
create index if not exists idx_results_completed_at on public.quiz_results(completed_at desc);
create index if not exists idx_results_session_type on public.quiz_results(session_type);
create index if not exists idx_results_percentage on public.quiz_results(percentage desc);

-- =========================================
-- STUDY SESSIONS TABLE
-- =========================================
create table public.study_sessions (
  id uuid not null default extensions.uuid_generate_v4(),
  user_id text not null,
  category_id uuid not null,
  pre_study_quiz_id uuid null,
  pre_study_result_id uuid null,
  study_started_at timestamp with time zone null,
  study_completed_at timestamp with time zone null,
  post_study_quiz_id uuid null,
  post_study_result_id uuid null,
  improvement_score integer null,
  improvement_percentage numeric(5,2) null,
  session_status text default 'started' check (
    session_status in (
      'started',
      'pre_quiz_completed',
      'studying',
      'study_completed',
      'post_quiz_completed'
    )
  ),
  created_at timestamp with time zone default now(),
  lesson_started_at timestamp with time zone null,
  lesson_time_spent_minutes integer null,
  lesson_sections_completed jsonb default '[]',
  constraint study_sessions_pkey primary key (id),
  constraint study_sessions_category_id_fkey foreign key (category_id) references public.quiz_categories(id) on delete cascade,
  constraint study_sessions_post_study_quiz_id_fkey foreign key (post_study_quiz_id) references public.quizzes(id),
  constraint study_sessions_post_study_result_id_fkey foreign key (post_study_result_id) references public.quiz_results(id),
  constraint study_sessions_pre_study_quiz_id_fkey foreign key (pre_study_quiz_id) references public.quizzes(id),
  constraint study_sessions_pre_study_result_id_fkey foreign key (pre_study_result_id) references public.quiz_results(id),
  constraint study_sessions_user_id_fkey foreign key (user_id) references public.users(auth0_user_id) on delete cascade,
  constraint check_study_timestamps check (
    (study_completed_at is null)
    or (study_started_at is null)
    or (study_completed_at >= study_started_at)
  )
);

create index if not exists idx_sessions_user on public.study_sessions(user_id);
create index if not exists idx_sessions_category on public.study_sessions(category_id);
create index if not exists idx_sessions_status on public.study_sessions(session_status);
create index if not exists idx_sessions_created_at on public.study_sessions(created_at desc);
create index if not exists idx_sessions_lesson_started on public.study_sessions(lesson_started_at);

create trigger trigger_update_study_session_improvement
before insert or update on public.study_sessions
for each row
execute function update_study_session_improvement();

-- =========================================
-- VIEWS
-- =========================================

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
  left join study_sessions ss on u.auth0_user_id = ss.user_id and ss.session_status = 'post_quiz_completed'
where
  u.role = 'user'
group by
  u.auth0_user_id, u.name, u.email
order by
  max(qr.completed_at) desc;

create view public.learning_flow_overview as
select
  ss.id as session_id,
  ss.user_id,
  u.name as user_name,
  c.name->>'en' as topic_name,
  c.slug as topic_slug,
  ss.session_status,
  ss.created_at as session_started,
  pre_q.title->>'en' as pre_quiz_title,
  pre_r.score as pre_quiz_score,
  pre_r.completed_at as pre_quiz_completed,
  ss.study_started_at as lesson_started,
  ss.study_completed_at as lesson_completed,
  ss.lesson_time_spent_minutes,
  post_q.title->>'en' as post_quiz_title,
  post_r.score as post_quiz_score,
  post_r.completed_at as post_quiz_completed,
  ss.improvement_score,
  ss.improvement_percentage,
  case
    when ss.session_status = 'started' then 'Ready for pre-quiz'
    when ss.session_status = 'pre_quiz_completed' then 'Ready for lesson'
    when ss.session_status = 'studying' then 'Currently in lesson'
    when ss.session_status = 'study_completed' then 'Ready for post-quiz'
    when ss.session_status = 'post_quiz_completed' then 'Session complete'
    else null
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
  c.name->>'en' as category_name,
  c.slug as category_slug,
  q.id as quiz_id,
  q.title->>'en' as quiz_title,
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
  c.id, c.name, c.slug, q.id, q.title, q.difficulty, q.is_published, q.created_at, u.name
order by
  c.display_order, q.created_at desc;

-- Add audio URL columns to quiz_categories table
ALTER TABLE quiz_categories 
ADD COLUMN lesson_audio_en TEXT,
ADD COLUMN lesson_audio_ms TEXT;

-- Add a comment for clarity
COMMENT ON COLUMN quiz_categories.lesson_audio_en IS 'URL to English lesson audio file from Supabase storage';
COMMENT ON COLUMN quiz_categories.lesson_audio_ms IS 'URL to Malay lesson audio file from Supabase storage';

-- Remove the education_status column from users table
ALTER TABLE public.users DROP COLUMN IF EXISTS education_status;
-- Add column to track completed pre-assessments per topic
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS pre_assessment_completed JSONB DEFAULT '{}';

-- Add index for efficient querying
CREATE INDEX IF NOT EXISTS idx_users_pre_assessments ON public.users USING GIN (pre_assessment_completed);

-- Add comment for clarity
COMMENT ON COLUMN public.users.pre_assessment_completed IS 'JSON object tracking completed pre-assessments: {"tiger": true, "tapir": true, "turtle": false}';