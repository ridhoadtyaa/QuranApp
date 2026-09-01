# AGENTS.md — Panduan Codebase Quran App

Dokumen ini adalah peta lengkap project untuk AI agent / developer baru. Dibuat berdasarkan pembacaan seluruh source code.

## Ringkasan Project

**Quran App** adalah aplikasi web untuk membaca Al-Quran secara online (daftar 114 surah, detail ayat, terjemahan, tafsir, dan audio murottal). UI berbahasa Indonesia. Di-deploy di Vercel: https://quran-app-ran.vercel.app/

- **Repo**: https://github.com/ridhoadtyaa/QuranApp (author: Ridho Aditya Nurtama, lisensi MIT)
- **Sumber data**: [eQuran.id API v2](https://equran.id/apidev) — tidak ada database sendiri; semua data diambil saat build time (SSG).
- **PWA**: bisa di-install dan dipakai offline (via `next-pwa`).

## Tech Stack

| Kategori | Teknologi |
|---|---|
| Framework | Next.js 13.1.1 (**Pages Router**, bukan App Router) |
| Bahasa | TypeScript 4.6 (strict mode) |
| Styling | Tailwind CSS 3 (dark mode `class`) |
| UI primitives | Headless UI (`Dialog`/`Transition` untuk modal) |
| State global | Jotai (`search` untuk filter home; `lastRead` via `atomWithStorage` untuk penanda terakhir dibaca) |
| Theme | `next-themes` (light/dark, disimpan di `localStorage` key `theme`) |
| SEO | `next-seo` + `next-sitemap` (sitemap & robots.txt digenerate saat `postbuild`). Pola judul "Nama Halaman — Quran App" via `Seo.tsx`; deskripsi unik per surah; JSON-LD `WebSite` (home) & `BreadcrumbJsonLd` (surah). `SITE_URL` selalu dinormalisasi tanpa trailing slash sebelum digabung slug — jangan gabung `NEXT_PUBLIC_SITE_URL` mentah (env-nya diakhiri `/`, hasilnya double slash) |
| HTTP | `axios` dan `fetch` (dipakai campur di `getStaticProps`) |
| Ikon | `react-icons` |
| Progress bar | `nprogress` (di route change; base CSS di-inline di `globals.css`) |
| Font | Poppins via `@next/font` (self-host, var `--font-poppins` di-set di `_app.tsx`); LPMQ (Arab) self-host WOFF2 + fallback TTF di `public/fonts` |
| PWA | `next-pwa` (nonaktif saat development; ada `runtimeCaching` StaleWhileRevalidate untuk `equran.id/api`) |
| Package manager | **Yarn** (ada `yarn.lock`) |

## Perintah Penting

```bash
yarn dev        # jalankan dev server (http://localhost:3000)
yarn build      # production build + postbuild generate sitemap
yarn start      # jalankan hasil build
yarn lint       # next lint
yarn format     # prettier --write
```

Environment variables (lihat `.env.local`, semua `NEXT_PUBLIC_*`):
- `NEXT_PUBLIC_SITE_NAME` — "Quran App"
- `NEXT_PUBLIC_SITE_URL` — URL produksi (dipakai untuk canonical/OG URL)
- `NEXT_PUBLIC_TWITTER_USERNAME` — untuk meta Twitter card

## Struktur Direktori

```
src/
├── pages/
│   ├── index.tsx          # Home: daftar surah + search (getStaticProps, props dipangkas)
│   ├── surah/[id].tsx     # Detail surah (getStaticPaths fallback:false + getStaticProps)
│   ├── _app.tsx           # ThemeProvider + NProgress route events + @next/font Poppins
│   └── _document.tsx      # lang='id', manifest PWA, favicon
├── components/            # pola Atomic Design
│   ├── atoms/             # Button, Input, UnstyledLink, BackToTop, Seo
│   ├── mollecules/        # (sic, typo dipertahankan) Surah, SurahInfo, Ayat, SearchBar, Modal, ToggleDarkMode, LastReadCard
│   ├── organism/          # Header, Footer, SurahDetail
│   └── templates/         # Layout (Seo + Header + main + BackToTop + Footer)
├── hooks/
│   ├── useTheme.tsx       # wrapper next-themes + flag mounted (hindari hydration mismatch)
│   └── useWindowScroll.tsx# posisi scroll window (dipakai Header & BackToTop)
├── libs/
│   ├── twclsx.ts          # twclsx = twMerge(clsx(...)) — utility className utama
│   ├── metaData.ts        # getMetaData() → props untuk komponen Seo (OG, twitter, keywords)
│   └── index.ts           # barrel export twclsx & getMetaData
├── stores/index.ts        # Jotai atom: search (string, untuk filter surah di Home)
├── types/index.d.ts       # declare module 'quran-app' — semua tipe respons API eQuran
└── styles/globals.css     # Tailwind layers, class .layout/.star8/.next-before-button, @font-face LPMQ
public/
├── fonts/                 # font LPMQ (teks Arab standar Kemenag)
├── manifest.json          # PWA manifest
└── sw.js, workbox-*.js, sitemap*.xml, robots.txt   # file GENERATED — jangan diedit manual
```

## Alur Data (penting dipahami)

1. **Home (`/`)**: `getStaticProps` fetch `https://equran.id/api/v2/surat` lalu **memangkas tiap surah ke 5 field** yang dipakai kartu `Surah` (tipe `SuratListItem`; `deskripsi` & `audioFull` dibuang, payload ±120 KB → ±15 KB). Filter pencarian client-side terhadap `namaLatin` via atom Jotai `search` + `useMemo`.
2. **Detail (`/surah/[id]`)**: `getStaticPaths` generate 114 path dari daftar surat, `fallback: false`. `getStaticProps` hanya fetch `surat/{id}`, lalu **memangkas `audio` per-ayat (6 qari, tidak dipakai UI) dan `audioFull` selain qari `'01'`**. **Tafsir juga sengaja TIDAK ikut di props statis** (payload-nya besar, mis. Al-Baqarah ±650 KB) — di-fetch lazy di client oleh `SurahDetail.loadTafsir()` saat user pertama kali membuka modal tafsir, lalu di-cache di state dan dipetakan ke `ayat[i]` **berdasarkan index array**. `SurahDetail` merender ayat **secara bertahap** (chunk 30 ayat, `AYAT_PER_CHUNK`) memakai scroll listener + elemen sentinel, dan di-`key` per `surah.data.nomor` di halaman agar state ter-reset saat pindah surah. Elemen `<audio>` memakai `preload='none'`.
3. **Ayat**: tiap ayat menampilkan teks Arab (font `font-arabic`/LPMQ), latin (via `dangerouslySetInnerHTML`, karena API mengirim HTML), dan terjemahan Indonesia. Tombol share memakai Web Share API (`navigator.share`) dengan URL anchor `#nomorAyat`; tombol tafsir memanggil `loadTafsir()` lalu membuka `Modal` (tampil "Memuat tafsir..." selama data belum ada). Karena ayat dirender bertahap, `SurahDetail` menangani anchor `#nomorAyat` secara manual: saat mount, hash dibaca, `visibleCount` dinaikkan sampai ayat tujuan ikut dirender, lalu `scrollIntoView`.
4. **Terakhir dibaca**: tiap ayat punya tombol bookmark (toggle) yang menyimpan `{ surah, namaLatin, ayat }` ke atom `lastRead` (`atomWithStorage`, localStorage key `last-read`, per perangkat). Home menampilkan `LastReadCard` — shortcut ke `/surah/{surah}#{ayat}` yang memanfaatkan penanganan anchor di `SurahDetail`. Komponen yang membaca `lastRead` digate flag `mounted` agar bebas hydration mismatch (data hanya ada di client).
5. **Tipe**: semua bentuk respons API dideklarasikan di `src/types/index.d.ts` sebagai module ambient `'quran-app'` — import dengan `import { SuratData } from 'quran-app'`.

## Konvensi Kode

- **Path alias**: `@/*` → `src/*` (lihat `tsconfig.json`).
- **className selalu lewat `twclsx(...)`**, dengan class dikelompokkan per string berdasarkan concern (`'flex items-center'`, `'py-4'`, dst). Ikuti pola ini saat menambah komponen.
- **Prettier** (`.prettierrc.js`): no semicolon, single quote (termasuk JSX), printWidth 100, no trailing comma, dan **import diurutkan otomatis** oleh `@trivago/prettier-plugin-sort-imports` dengan urutan: `@/styles` → `@/components` → `@/*` → relatif → package eksternal, dipisah baris kosong.
- **ESLint** (`.eslintrc.js`): `next/core-web-vitals` + `@typescript-eslint/recommended` + prettier; `no-unused-vars` dan `no-explicit-any` = error.
- **Komponen** diekspor default, bertipe `React.FunctionComponent<Props>`; komponen yang berat di-render dibungkus `memo` (Ayat, SurahDetail, SurahInfo, ToggleDarkMode).
- **Dark mode**: class-based. Warna utama `primary` = palet `purple` Tailwind; background dark = `#001140` (alias `dark`).
- **Bahasa UI**: seluruh teks yang tampil ke user berbahasa Indonesia.
- **Aksesibilitas** (dipertahankan saat mengubah UI): tiap halaman punya tepat satu `h1` (logo header adalah `span`, bukan heading); teks Arab wajib `lang='ar' dir='rtl'`; tombol ikon wajib punya `<span className='sr-only'>` + `title`; fokus keyboard memakai `focus-visible:ring` global di `globals.css` (jangan hapus); ada skip link "Langsung ke konten" di `Layout` → `main#konten`; modal punya tombol tutup terlihat dan `initialFocus` ke tombol itu. Baseline: axe-core 0 violation di home & detail, kedua tema.
- **Commit**: Conventional Commits (repo dikonfigurasi dengan commitizen `cz-conventional-changelog`; riwayat commit memakai format `feat:`, `fix:`, `chore:`). Husky pre-commit menjalankan lint-staged (format/lint file yang di-stage).

## Hal yang Perlu Diwaspadai (gotchas)

- Folder bernama **`mollecules`** (typo dari "molecules") — jangan "memperbaiki" nama ini tanpa mengubah semua import.
- `next-pwa` **disable saat dev**; service worker hanya aktif di production build.
- `next.config.js` menghapus semua `console.*` saat production (`removeConsole`).
- Ada dua konfigurasi lint-staged (di `package.json` dan `.lintstagedrc.js`); yang di `package.json` (menjalankan `yarn format`) yang terbaca lebih dulu.
- **Tipe `SuratData`/`SuratDetail`/`Ayat` lebih "lengkap" dari data runtime**: `getStaticProps` memangkas field (lihat Alur Data). `Ayat.audio` bertipe opsional karena itu. Kalau butuh field yang dipangkas, tambahkan kembali secara sadar di `getStaticProps` — jangan asumsikan semua field API tersedia di client.
- File di `public/` seperti `sw.js`, `workbox-*.js`, `sitemap*.xml`, `robots.txt` adalah hasil generate build (sudah di-gitignore sebagian) — jangan diedit manual.
- Pemetaan ayat↔tafsir mengandalkan urutan index array dari API; jika API berubah struktur, halaman detail bisa salah pasang tafsir.
- Tafsir di-fetch **client-side langsung ke equran.id** saat modal tafsir dibuka — kalau mengubah `SurahDetail`, jaga agar fetch ini tetap sekali per surah (guard `tafsirRequested`) dan jangan kembalikan tafsir ke `getStaticProps` (payload Al-Baqarah membengkak ~1 MB).
- Build **membutuhkan koneksi internet** ke equran.id karena semua halaman digenerate statis dari API.
- OG image dan favicon di-host eksternal di ImageKit (`ik.imagekit.io`).
