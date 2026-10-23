-- Lista de novidades central da Deciban (POST /api/lista).
-- Aplicar manualmente no SQL Editor do Supabase. Acesso só pela service key (servidor).

create table if not exists public.lista_espera (
  id bigint generated always as identity primary key,
  email text not null check (char_length(email) <= 254),
  produto text not null check (produto in (
    'uai','grudi','sistere','limiar','borajogar','cinefeed','facefinder','plin','mooday','deciban'
  )),
  idioma text not null default 'pt',
  origem text,
  aceite_texto text not null,
  aceite_versao text not null,
  criado_em timestamptz not null default now(),
  descadastrado_em timestamptz,
  unique (email, produto)
);

alter table public.lista_espera enable row level security;
-- Sem nenhuma policy: anon e authenticated não leem nem gravam.
revoke all on public.lista_espera from anon, authenticated;
