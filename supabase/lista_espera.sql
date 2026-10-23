-- Lista de novidades central da Deciban (POST /api/lista).
-- Mora no projeto Supabase "uai" (ref sropbxipfngjxkhfhrjs) por limite de projetos
-- grátis (decisão do Rafael em 23/10/2026), isolada no esquema privado "deciban",
-- que a API REST não expõe. O site só chama public.lista_inscrever com a chave
-- pública + LISTA_SEGREDO; a chave de serviço do uai nunca sai do uai.
-- Aplicado em 23/10/2026. Rodar de novo é seguro (idempotente).

create schema if not exists deciban;
revoke all on schema deciban from public, anon, authenticated;

create table if not exists deciban.lista_espera (
  id bigint generated always as identity primary key,
  email text not null check (char_length(email) <= 254),
  produto text not null check (produto in (
    'uai','grudi','sistere','limiar','borajogar','cinefeed','facefinder','plin','mooday','deciban'
  )),
  idioma text not null default 'pt' check (idioma in ('pt','en')),
  origem text check (char_length(origem) <= 40),
  aceite_texto text not null,
  aceite_versao text not null,
  criado_em timestamptz not null default now(),
  descadastrado_em timestamptz,
  unique (email, produto)
);
alter table deciban.lista_espera enable row level security;
revoke all on deciban.lista_espera from public, anon, authenticated;

-- Hash SHA-256 do LISTA_SEGREDO (o segredo em si fica só na Vercel).
create table if not exists deciban.chaves (
  nome text primary key,
  hash text not null
);
alter table deciban.chaves enable row level security;
revoke all on deciban.chaves from public, anon, authenticated;

create or replace function public.lista_inscrever(
  p_segredo text,
  p_email text,
  p_produto text,
  p_idioma text,
  p_origem text,
  p_aceite_texto text,
  p_aceite_versao text
) returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_hash text;
begin
  -- Quem chama prova que é o servidor da Deciban; a chave pública sozinha não basta.
  select c.hash into v_hash from deciban.chaves c where c.nome = 'lista';
  if v_hash is null or p_segredo is null
     or encode(extensions.digest(p_segredo, 'sha256'), 'hex') <> v_hash then
    raise exception 'nao_autorizado' using errcode = '42501';
  end if;

  insert into deciban.lista_espera (email, produto, idioma, origem, aceite_texto, aceite_versao)
  values (lower(trim(p_email)), p_produto, coalesce(p_idioma, 'pt'), nullif(trim(p_origem), ''),
          p_aceite_texto, p_aceite_versao)
  on conflict (email, produto) do nothing;
end;
$$;

revoke all on function public.lista_inscrever(text, text, text, text, text, text, text) from public, authenticated;
grant execute on function public.lista_inscrever(text, text, text, text, text, text, text) to anon;

-- Depois de aplicar, gravar o hash do segredo (fora do git):
-- insert into deciban.chaves (nome, hash) values ('lista', '<sha256 hex do LISTA_SEGREDO>')
--   on conflict (nome) do update set hash = excluded.hash;
