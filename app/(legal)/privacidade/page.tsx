import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade | CareerTwin",
  description:
    "Como o CareerTwin AI coleta, usa, compartilha e protege seus dados pessoais, e quais são os seus direitos conforme a LGPD.",
};

const UPDATED_AT = "22 de julho de 2026";
const CONTACT_EMAIL = "privacidade@careertwin.com.br";

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <h1>Política de Privacidade</h1>
      <p className="!text-muted-foreground text-sm">
        Última atualização: {UPDATED_AT}
      </p>

      <p>
        Esta Política descreve como o <strong>CareerTwin AI</strong> (&ldquo;CareerTwin&rdquo;,
        &ldquo;nós&rdquo;) trata os dados pessoais dos usuários, em conformidade com a
        Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD). Ao usar a
        plataforma, você declara estar ciente das práticas aqui descritas.
      </p>
      <p>
        <strong>Aviso importante:</strong> o CareerTwin encontra-se em fase de
        <strong> MVP (validação)</strong>. Estamos evoluindo continuamente nossos
        controles de privacidade; algumas funcionalidades citadas abaixo estão em
        implementação e assim sinalizadas.
      </p>

      <h2>1. Quais dados coletamos</h2>
      <ul>
        <li>
          <strong>Dados de cadastro:</strong> nome, e-mail e, opcionalmente, CPF.
          No login com Google, recebemos nome, e-mail e foto de perfil.
        </li>
        <li>
          <strong>Documentos de carreira:</strong> currículo e PDF do LinkedIn que
          você envia, além do texto extraído desses arquivos.
        </li>
        <li>
          <strong>Dados de uso:</strong> vagas analisadas, relatórios gerados e
          eventos de produto (por exemplo, quando uma análise é solicitada).
        </li>
      </ul>
      <p>
        Coletamos apenas o necessário para prestar o serviço. Não solicitamos dados
        pessoais sensíveis; contudo, um currículo pode conter tais informações de
        forma incidental — recomendamos não incluir dados que você não deseje
        tratar.
      </p>

      <h2>2. Para que usamos seus dados</h2>
      <ul>
        <li>Criar e gerenciar sua conta e autenticação.</li>
        <li>
          Analisar seu currículo e LinkedIn por meio de inteligência artificial para
          gerar diagnósticos, score de aderência e recomendações.
        </li>
        <li>Controlar o uso das análises gratuitas e dos pacotes de acesso.</li>
        <li>Medir e melhorar o produto (métricas agregadas).</li>
      </ul>

      <h2>3. Base legal</h2>
      <ul>
        <li>
          <strong>Execução de contrato</strong> (art. 7º, V): criação e operação da
          sua conta.
        </li>
        <li>
          <strong>Consentimento</strong> (art. 7º, I): análise dos seus documentos
          por IA e o consequente envio a nosso provedor de IA.
        </li>
        <li>
          <strong>Legítimo interesse</strong> (art. 7º, IX): métricas de produto,
          sempre de forma proporcional.
        </li>
      </ul>

      <h2>4. Compartilhamento e uso de inteligência artificial</h2>
      <p>
        Para gerar os relatórios, seus documentos são enviados e processados pela
        <strong> Anthropic (Claude API)</strong>, provedora de IA sediada nos
        <strong> Estados Unidos</strong>. Isso caracteriza uma
        <strong> transferência internacional de dados</strong> (art. 33 da LGPD),
        realizada mediante o seu consentimento no momento do uso.
      </p>
      <p>
        Conforme os termos comerciais da Anthropic, os dados enviados via API
        <strong> não são utilizados para treinar modelos</strong> e ficam sujeitos a
        retenção limitada para fins de segurança. Não vendemos seus dados nem os
        compartilhamos para publicidade.
      </p>

      <h2>5. Armazenamento e segurança</h2>
      <p>
        Os dados são armazenados no <strong>Supabase</strong> (banco de dados e
        armazenamento de arquivos). Aplicamos:
      </p>
      <ul>
        <li>
          Isolamento por usuário no banco (Row Level Security) — cada pessoa acessa
          apenas os próprios dados.
        </li>
        <li>Armazenamento de arquivos em área privada, restrita ao dono.</li>
        <li>Tráfego criptografado (HTTPS/TLS) e segredos mantidos no servidor.</li>
      </ul>

      <h2>6. Retenção e eliminação</h2>
      <p>
        Mantemos seus dados enquanto sua conta existir. Você pode excluir sua conta e
        todos os dados associados a qualquer momento (ver seção 8). A definição de
        prazos de expurgo automático está <strong>em implementação</strong>.
      </p>

      <h2>7. Seus direitos (art. 18 da LGPD)</h2>
      <p>Você tem direito a:</p>
      <ul>
        <li>Confirmar a existência de tratamento e acessar seus dados.</li>
        <li>Corrigir dados incompletos ou desatualizados.</li>
        <li>
          Solicitar a <strong>eliminação</strong> dos seus dados — disponível na
          plataforma (seção 8).
        </li>
        <li>
          Revogar o consentimento e solicitar a portabilidade dos dados
          (<strong>portabilidade em implementação</strong>).
        </li>
        <li>Ser informado sobre com quem compartilhamos dados (seção 4).</li>
      </ul>

      <h2>8. Como excluir seus dados</h2>
      <p>
        Na área logada, acesse{" "}
        <Link href="/dashboard/conta">Minha conta → Excluir conta</Link>. A exclusão é
        permanente e remove seu perfil, os documentos enviados e os relatórios
        gerados. Você também pode solicitar a exclusão pelo e-mail de contato abaixo.
      </p>

      <h2 id="cookies">9. Cookies</h2>
      <p>
        Utilizamos cookies estritamente necessários para autenticação e manutenção da
        sua sessão. Eles são essenciais ao funcionamento da plataforma e não são
        usados para publicidade.
      </p>

      <h2>10. Contato e encarregado</h2>
      <p>
        Para exercer seus direitos ou tirar dúvidas sobre privacidade, escreva para{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Responderemos no menor
        prazo possível.
      </p>

      <h2>11. Alterações desta Política</h2>
      <p>
        Podemos atualizar esta Política periodicamente. Mudanças relevantes serão
        comunicadas na plataforma. Consulte também nossos{" "}
        <Link href="/termos">Termos de Uso</Link>.
      </p>
    </>
  );
}
