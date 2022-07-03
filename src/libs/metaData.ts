import { CustomSeoProps } from '@/components/atoms/Seo'

interface MetaData extends CustomSeoProps {
  title: string
  description: string
  keywords: Array<string>
  slug: string
  og_image: string
  og_image_alt: string
  type?: 'website' | 'blog'
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME
const TWITER_USERNAME = process.env.NEXT_PUBLIC_TWITTER_USERNAME

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
    type: data.type ?? 'website'
  },
  twitter: {
    cardType: 'summary_large_image',
    // TODO: Change to your Tiwetter username
    site: TWITER_USERNAME,
    handle: TWITER_USERNAME
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: data.keywords.join(', ')
    }
  ],
  ...data
})
