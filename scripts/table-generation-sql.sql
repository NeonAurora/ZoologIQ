-- =========================================
-- ZoologIQ Database Schema - Complete Setup
-- Auth0 Integration - Public Operations
-- =========================================

-- 🚨 DESTRUCTIVE OPERATION! THIS WILL REMOVE ALL TABLES AND VIEWS!
drop view if exists public.admin_quiz_overview cascade;
drop view if exists public.learning_flow_overview cascade;
drop view if exists public.user_progress_overview cascade;

drop table if exists public.quiz_questions cascade;
drop table if exists public.quiz_results cascade;
drop table if exists public.quizzes cascade;
drop table if exists public.quiz_categories cascade;
drop table if exists public.users cascade;

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- =========================================
-- UTILITY FUNCTIONS
-- =========================================
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- =========================================
-- USERS TABLE - Auth0 Integration
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
  highest_education text null,
  city text null,
  district text null,
  state_province text null,
  occupation text null,
  age integer null,
  gender text null,
  pre_assessment_completed jsonb default '{"tiger": false, "tapir": false, "turtle": false}',
  constraint users_pkey primary key (auth0_user_id),
  constraint users_email_key unique (email)
);

create index if not exists idx_users_email on public.users(email);
create index if not exists idx_users_role on public.users(role);
create index if not exists idx_users_onboarding_completed on public.users(onboarding_completed);
create index if not exists idx_users_preferred_language on public.users(preferred_language);
create index if not exists idx_users_pre_assessment on public.users using gin (pre_assessment_completed);

create trigger update_users_updated_at
before update on public.users
for each row
execute function update_updated_at_column();

-- =========================================
-- QUIZ CATEGORIES TABLE - WITH AUDIO SUPPORT
-- =========================================
create table public.quiz_categories (
  id uuid not null default uuid_generate_v4(),
  name jsonb not null,
  slug text not null,
  description jsonb null,
  image_url text null,
  lesson_audio_en text null,
  lesson_audio_ms text null,
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
create index if not exists idx_categories_audio_en on public.quiz_categories(lesson_audio_en);
create index if not exists idx_categories_audio_ms on public.quiz_categories(lesson_audio_ms);

create trigger update_categories_updated_at
before update on public.quiz_categories
for each row
execute function update_updated_at_column();

-- =========================================
-- QUIZZES TABLE - SIMPLIFIED
-- =========================================
create table public.quizzes (
  id uuid not null default uuid_generate_v4(),
  category_id uuid not null,
  title jsonb not null,
  quiz_type text default 'standalone' check (quiz_type in ('pre-lesson','post-lesson','standalone')),
  created_by text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint quizzes_pkey primary key (id),
  constraint quizzes_category_id_fkey foreign key (category_id) references public.quiz_categories(id) on delete cascade,
  constraint quizzes_created_by_fkey foreign key (created_by) references public.users(auth0_user_id) on delete cascade,
  constraint check_title_languages check (title ? 'en' and title ? 'ms')
);

create index if not exists idx_quizzes_category on public.quizzes(category_id);
create index if not exists idx_quizzes_created_by on public.quizzes(created_by);
create index if not exists idx_quizzes_type on public.quizzes(quiz_type);

create trigger update_quizzes_updated_at
before update on public.quizzes
for each row
execute function update_updated_at_column();

-- =========================================
-- QUIZ QUESTIONS TABLE
-- =========================================
create table public.quiz_questions (
  id uuid not null default uuid_generate_v4(),
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

-- =========================================
-- QUIZ RESULTS TABLE - UPDATED SESSION TYPES
-- =========================================
create table public.quiz_results (
  id uuid not null default uuid_generate_v4(),
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
  session_type text default 'regular' check (session_type in ('regular','pre-lesson','post-lesson')),
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
create index if not exists idx_results_user_category_session on public.quiz_results(user_id, category_id, session_type);

-- =========================================
-- VIEWS FOR ANALYTICS
-- =========================================

-- User Progress Overview
create view public.user_progress_overview as
select
  u.auth0_user_id,
  u.name as user_name,
  u.email,
  u.pre_assessment_completed,
  count(distinct qr.category_id) as categories_attempted,
  count(distinct qr.quiz_id) as quizzes_attempted,
  count(qr.id) as total_quiz_attempts,
  COALESCE(avg(qr.percentage), 0::numeric) as overall_average_score,
  count(case when qr.session_type = 'pre-lesson' then 1 end) as pre_assessments_completed,
  count(case when qr.session_type = 'post-lesson' then 1 end) as post_assessments_completed,
  max(qr.completed_at) as last_quiz_taken
from
  users u
  left join quiz_results qr on u.auth0_user_id = qr.user_id
where
  u.role = 'user'
group by
  u.auth0_user_id, u.name, u.email, u.pre_assessment_completed
order by
  max(qr.completed_at) desc;

-- Pre/Post Test Improvement Tracking
create view public.improvement_tracking as
select
  pre.user_id,
  pre.category_id,
  c.name->>'en' as category_name,
  c.slug as topic_slug,
  pre.score as pre_score,
  pre.percentage as pre_percentage,
  pre.completed_at as pre_completed_at,
  post.score as post_score,
  post.percentage as post_percentage,
  post.completed_at as post_completed_at,
  (post.score - pre.score) as score_improvement,
  (post.percentage - pre.percentage) as percentage_improvement,
  case 
    when pre.percentage > 0 then ((post.percentage - pre.percentage) / pre.percentage * 100)
    else null
  end as improvement_ratio
from 
  quiz_results pre
  join quiz_results post on pre.user_id = post.user_id 
    and pre.category_id = post.category_id
  join quiz_categories c on pre.category_id = c.id
where 
  pre.session_type = 'pre-lesson'
  and post.session_type = 'post-lesson'
order by post.completed_at desc;

-- =========================================
-- SECURITY POLICIES (Public Access for Auth0)
-- =========================================

-- Enable RLS but allow public access since Auth0 handles authentication
alter table public.users enable row level security;
alter table public.quiz_categories enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.quiz_results enable row level security;

-- Public access policies (Auth0 handles authentication at app level)
create policy "Public access for users" on public.users for all using (true);
create policy "Public access for categories" on public.quiz_categories for all using (true);
create policy "Public access for quizzes" on public.quizzes for all using (true);
create policy "Public access for questions" on public.quiz_questions for all using (true);
create policy "Public access for results" on public.quiz_results for all using (true);

-- Grant necessary permissions
grant all on all tables in schema public to postgres, anon, authenticated;
grant all on all sequences in schema public to postgres, anon, authenticated;
grant all on all functions in schema public to postgres, anon, authenticated;