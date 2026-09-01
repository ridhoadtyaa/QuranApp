import { CustomSeoProps } from '@/components/atoms/Seo'

interface MetaData extends CustomSeoProps {
  title: string
  description: string
  slug: string
  og_image: string
  og_image_alt: string
  type?: 'website' | 'blog'
}

// Trailing slash dibuang agar SITE_URL + slug tidak menghasilkan double slash di canonical/og:url
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? '').replace(/\/+$/, '')
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME
const TWITTER_USERNAME = process.env.NEXT_PUBLIC_TWITTER_USERNAME
const TWITTER_HANDLE = TWITTER_USERNAME
  ? TWITTER_USERNAME.startsWith('@')
    ? TWITTER_USERNAME
    : `@${TWITTER_USERNAME}`
  : undefined

export const getMetaData = (data: MetaData): CustomSeoProps => ({
  canonical: SITE_URL + data.slug,
  openGraph: {
    images: [
      {
        url: data.og_image,
        alt: data.og_image_alt,
        width: 1200,
        height: 600
      }
    ],
    site_name: SITE_NAME,
    url: SITE_URL + data.slug,
    locale: 'id_ID',
    type: data.type ?? 'website'
  },
  twitter: {
    cardType: 'summary_large_image',
    site: TWITTER_HANDLE,
    handle: TWITTER_HANDLE
  },
  ...data
})
