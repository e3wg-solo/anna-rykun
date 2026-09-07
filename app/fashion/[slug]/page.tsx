import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { I18nProvider } from '@/i18n'
import { en } from '@/i18n/en'
import { FASHION_ITEMS } from '@/data/content'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { FashionCase } from '@/components/FashionCase'

export function generateStaticParams() {
  return FASHION_ITEMS.map((item) => ({ slug: item.slug }))
}

// Language is chosen client-side, so metadata is built from the English dictionary.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const meta = en.fashion.items[slug]
  const item = FASHION_ITEMS.find((i) => i.slug === slug)
  if (!meta || !item) return {}

  const title = `${meta.title} — Fashion Art Direction by Anna Rykun`
  return {
    title,
    description: meta.dek,
    alternates: { canonical: `/fashion/${slug}` },
    openGraph: {
      title,
      description: meta.dek,
      type: 'article',
      images: [item.images[0]],
    },
  }
}

export default async function FashionCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!FASHION_ITEMS.some((i) => i.slug === slug)) notFound()

  return (
    <I18nProvider>
      <Nav />
      <main>
        <FashionCase slug={slug} />
      </main>
      <Footer />
    </I18nProvider>
  )
}
