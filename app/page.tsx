import { I18nProvider } from '@/i18n'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Marquee } from '@/components/Marquee'
import { About } from '@/components/About'
import { Philosophy } from '@/components/Philosophy'
import { Skills } from '@/components/Skills'
import { Gallery } from '@/components/Gallery'
import { Fashion } from '@/components/Fashion'
import { Projects } from '@/components/Projects'
import { Teaching } from '@/components/Teaching'
import { Recognition } from '@/components/Recognition'
import { ConnectCta } from '@/components/ConnectCta'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <I18nProvider>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Philosophy />
        <Skills />
        <Gallery />
        <Fashion />
        <Projects />
        <Teaching />
        <Recognition />
        <ConnectCta />
        <Contact />
      </main>
      <Footer />
    </I18nProvider>
  )
}
