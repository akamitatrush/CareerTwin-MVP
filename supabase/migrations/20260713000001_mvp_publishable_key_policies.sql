-- CareerTwin AI — Migration 0002
-- Permite operar o MVP apenas com a publishable key (sem chave secreta):
-- o servidor atua com a sessão do próprio usuário (RLS).

-- O servidor grava o resultado da IA na análise do próprio usuário
create policy "analyses: atualização própria" on public.analyses
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- Compra SIMULADA do pacote de 7 dias (sem gateway real no MVP):
-- restrita ao preço e status fixos do produto
create policy "access_packages: inserção própria (mock)" on public.access_packages
  for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and price_cents = 3000
    and payment_status = 'mock_paid'
  );
