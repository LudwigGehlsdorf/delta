import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { About } from "@/components/About";
import { Engage } from "@/components/Engage";
import { Packages } from "@/components/Packages";
import { Comparison } from "@/components/Comparison";
import { FloorMap } from "@/components/FloorMap";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <RevealObserver />
      <Nav lang={lang} dict={dict} />
      <main>
        <Hero lang={lang} dict={dict} />
        <Stats dict={dict} />
        <About dict={dict} />
        <Engage lang={lang} dict={dict} />
        <Packages lang={lang} dict={dict} />
        <Comparison lang={lang} dict={dict} />
        <FloorMap lang={lang} dict={dict} />
        <Faq dict={dict} />
        <Contact lang={lang} dict={dict} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
