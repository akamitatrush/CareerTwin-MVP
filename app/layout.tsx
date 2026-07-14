import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CareerTwin | Evolua, reposicione-se e conquiste",
  description:
    "Use inteligência artificial para melhorar seu currículo e LinkedIn, analisar sua aderência a vagas e construir um plano prático de evolução profissional.",
  openGraph: {
    title: "CareerTwin | Evolua, reposicione-se e conquiste",
    description:
      "Use inteligência artificial para melhorar seu currículo e LinkedIn, analisar sua aderência a vagas e construir um plano prático de evolução profissional.",
    type: "website",
    locale: "pt_BR",
    siteName: "CareerTwin",
  },
  twitter: {
    card: "summary",
    title: "CareerTwin | Evolua, reposicione-se e conquiste",
    description:
      "Use inteligência artificial para melhorar seu currículo e LinkedIn, analisar sua aderência a vagas e construir um plano prático de evolução profissional.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
