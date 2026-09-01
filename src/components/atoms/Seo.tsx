import { NextSeo, NextSeoProps } from 'next-seo'

export type CustomSeoProps = NextSeoProps

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME

/**
 * Membungkus NextSeo dengan pola judul "Nama Halaman — Quran App":
 * bagian unik halaman di depan agar tidak terpotong di hasil pencarian
 */
const Seo: React.FunctionComponent<CustomSeoProps> = ({ ...props }) => {
  return <NextSeo {...props} title={props.title} titleTemplate={`%s — ${SITE_NAME}`} />
}

export default Seo
