import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html lang='id'>
        <Head>
          <link rel='manifest' href='/manifest.json' />
          <link
            rel='icon'
            href='https://ik.imagekit.io/qmw3y9jqe/image_fp2T1MZiW.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1656857628815'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
