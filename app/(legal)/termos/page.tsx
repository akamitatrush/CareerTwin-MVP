import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Uso | CareerTwin",
  description:
    "Condições de uso da plataforma CareerTwin AI: natureza consultiva da IA, planos, pagamento e responsabilidades.",
};

const UPDATED_AT = "22 de julho de 2026";

export default function TermosDeUsoPage() {
  return (
    <>
      <h1>Termos de Uso</h1>
      <p className="!text-muted-foreground text-sm">
        Última atualização: {UPDATED_AT}
      </p>

      <p>
        Estes Termos regem o uso da plataforma <strong>CareerTwin AI</strong>. Ao
        criar uma conta ou usar o serviço, você concorda com as condições abaixo. Se
        não concordar, não utilize a plataforma.
      </p>

      <h2>1. O que é o CareerTwin</h2>
      <p>
        O CareerTwin é um mentor de carreira com inteligência artificial que analisa
        currículo e LinkedIn para gerar diagnóstico de perfil, score de aderência a
        vagas e recomendações práticas de evolução profissional.
      </p>

      <h2>2. Natureza consultiva da IA</h2>
      <ul>
        <li>
          As análises são de caráter <strong>consultivo e informativo</strong>. O
          CareerTwin <strong>não garante contratação</strong>, entrevista ou qualquer
          resultado profissional.
        </li>
        <li>
          A IA estrutura e interpreta as informações dos seus documentos e pode conter
          imprecisões. Revise sempre as recomendações antes de aplicá-las.
        </li>
        <li>
          As recomendações baseiam-se exclusivamente no conteúdo que você fornece; a
          IA não inventa experiências, formações ou resultados.
        </li>
      </ul>

      <h2>3. Cadastro e conta</h2>
      <ul>
        <li>
          Você deve fornecer informações verdadeiras e é responsável por manter a
          confidencialidade das suas credenciais.
        </li>
        <li>O uso é destinado a maiores de 18 anos.</li>
        <li>
          Você é responsável pelos documentos que envia e declara ter o direito de
          fazê-lo, não enviando dados de terceiros sem autorização.
        </li>
      </ul>

      <h2>4. Planos e pagamento</h2>
      <ul>
        <li>
          Cada conta recebe <strong>3 análises gratuitas</strong>, compartilhadas
          entre os tipos de relatório.
        </li>
        <li>
          Há a opção de um pacote de <strong>7 dias de análises ilimitadas</strong>.
        </li>
        <li>
          <strong>Nesta fase de MVP, o pagamento é simulado (mock)</strong> — não há
          cobrança real nem processamento financeiro. O objetivo é validar o interesse
          pelo produto.
        </li>
      </ul>

      <h2>5. Uso aceitável</h2>
      <p>Você concorda em não:</p>
      <ul>
        <li>Enviar conteúdo ilícito, ofensivo ou que viole direitos de terceiros.</li>
        <li>Tentar burlar limites, acessar dados de outros usuários ou comprometer a segurança.</li>
        <li>Usar a plataforma para fins fraudulentos ou automação abusiva.</li>
      </ul>

      <h2>6. Propriedade intelectual</h2>
      <p>
        A plataforma, sua marca e seu conteúdo pertencem ao CareerTwin. Os documentos
        que você envia continuam sendo seus; você nos concede permissão para
        processá-los apenas para prestar o serviço, conforme a{" "}
        <Link href="/privacidade">Política de Privacidade</Link>.
      </p>

      <h2>7. Privacidade</h2>
      <p>
        O tratamento dos seus dados é descrito na{" "}
        <Link href="/privacidade">Política de Privacidade</Link>, incluindo o
        processamento por provedor de IA e seus direitos conforme a LGPD.
      </p>

      <h2>8. Limitação de responsabilidade</h2>
      <p>
        O serviço é fornecido &ldquo;no estado em que se encontra&rdquo;, especialmente
        por estar em fase de validação. Na máxima extensão permitida por lei, o
        CareerTwin não se responsabiliza por decisões profissionais tomadas com base
        nas análises nem por indisponibilidades temporárias.
      </p>

      <h2>9. Encerramento</h2>
      <p>
        Você pode encerrar sua conta a qualquer momento em{" "}
        <Link href="/dashboard/conta">Minha conta</Link>. Podemos suspender contas que
        violem estes Termos.
      </p>

      <h2>10. Lei aplicável</h2>
      <p>
        Estes Termos são regidos pelas leis do Brasil. Eventuais conflitos serão
        dirimidos no foro do domicílio do usuário, conforme a legislação consumerista
        aplicável.
      </p>

      <h2>11. Alterações</h2>
      <p>
        Podemos atualizar estes Termos periodicamente; mudanças relevantes serão
        comunicadas na plataforma. O uso continuado após a atualização representa
        concordância com a nova versão.
      </p>
    </>
  );
}
