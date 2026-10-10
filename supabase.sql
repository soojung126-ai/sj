-- Supabase SQL Editor 에 통째로 붙여넣고 Run 하면 문의 표가 만들어집니다.

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  contact text not null check (char_length(contact) between 1 and 200),
  service text not null check (service in ('레시피 제품화', '1회 자문', '월 자문', '교육', '잘 모르겠음')),
  description text not null check (char_length(description) between 1 and 2000),
  created_at timestamptz not null default now()
);

-- RLS: 만들자마자 잠급니다. 정책(policy)은 만들지 않습니다.
-- 그러면 브라우저 키(anon)로는 아무것도 못 읽고 못 씁니다. 넣는 건 서버(api/inquiries.js)만.
alter table public.inquiries enable row level security;
revoke all on public.inquiries from anon, authenticated;
grant select, insert, update on public.inquiries to service_role;  -- delete 없음
