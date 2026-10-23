#!/usr/bin/env bash
# Liga (ou rotaciona) a lista de novidades central (deciban.com.br/api/lista) ao Supabase "uai".
# Gera o segredo, grava só o hash dele no banco e cadastra as 3 variáveis na Vercel
# (projeto portfolio-rabelo, produção). O segredo não é impresso em lugar nenhum.
set -euo pipefail

REF="sropbxipfngjxkhfhrjs"
URL="https://$REF.supabase.co"
SITE="C:/Users/Rafael/portfolio-rabelo"
W="$(cygpath -m "$(mktemp -d)")"

supabase link --project-ref "$REF" --workdir "$W" </dev/null >/dev/null

SEG=$(node -e 'console.log(require("crypto").randomBytes(32).toString("base64url"))')
HASH=$(printf '%s' "$SEG" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>console.log(require("crypto").createHash("sha256").update(s).digest("hex")))')
KEY=$(supabase projects api-keys --project-ref "$REF" -o json 2>/dev/null | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const a=JSON.parse(s);const k=a.find(x=>x.type==="publishable")||a.find(x=>x.name==="anon");console.log(k.api_key)})')

supabase db query --linked --workdir "$W" \
  "insert into deciban.chaves (nome, hash) values ('lista', '$HASH') on conflict (nome) do update set hash = excluded.hash;" >/dev/null
echo "1/3 hash do segredo gravado em deciban.chaves"

chama() { curl -s -o /dev/null -w "%{http_code}" -X POST "$URL/rest/v1/rpc/lista_inscrever" \
  -H "apikey: $KEY" -H "Content-Type: application/json" -d "$1"; }
corpo() { printf '{"p_segredo":"%s","p_email":"teste-lista@deciban.com.br","p_produto":"deciban","p_idioma":"pt","p_origem":"teste","p_aceite_texto":"t","p_aceite_versao":"v"}' "$1"; }
echo "2/3 teste da função (esperado: errado 401 ou 403, certo 204, repetido 204, leitura 406)"
echo "    segredo errado -> $(chama "$(corpo errado)")"
echo "    segredo certo  -> $(chama "$(corpo "$SEG")")"
echo "    repetido       -> $(chama "$(corpo "$SEG")")"
echo "    leitura direta -> $(curl -s -o /dev/null -w "%{http_code}" "$URL/rest/v1/lista_espera?select=email" -H "apikey: $KEY" -H "Accept-Profile: deciban")"
supabase db query --linked --workdir "$W" "delete from deciban.lista_espera where email = 'teste-lista@deciban.com.br';" >/dev/null

cd "$SITE"
printf '%s' "$URL" | vercel env add LISTA_SUPABASE_URL production >/dev/null
printf '%s' "$KEY" | vercel env add LISTA_SUPABASE_ANON_KEY production >/dev/null
printf '%s' "$SEG" | vercel env add LISTA_SEGREDO production --sensitive >/dev/null
echo "3/3 variáveis cadastradas na Vercel (portfolio-rabelo, produção)"

unset SEG HASH KEY
rm -rf "$W"
