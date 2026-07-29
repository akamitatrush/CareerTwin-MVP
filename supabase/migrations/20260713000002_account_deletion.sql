-- CareerTwin AI — Migration 0003
-- Direito ao esquecimento (LGPD art. 18): permite o usuário excluir a própria
-- conta operando só com a publishable key. A função roda como SECURITY DEFINER
-- e apaga o registro em auth.users; o ON DELETE CASCADE remove em seguida
-- profiles → documents, analyses, access_packages. Em events, user_id vira NULL
-- (ON DELETE SET NULL), preservando métricas de forma anonimizada.
--
-- Os arquivos no Storage NÃO são removidos por cascade: a Server Action
-- deleteAccountAction apaga a pasta documents/<uid>/ antes de chamar esta função.

create or replace function public.delete_own_account()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function public.delete_own_account() from public, anon;
grant execute on function public.delete_own_account() to authenticated;
