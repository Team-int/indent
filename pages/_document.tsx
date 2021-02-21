import Document, { Head, Html, Main, NextScript } from 'next/document'
import { TypographyStyle } from 'react-typography'
import typography from '../utils/typography'

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <TypographyStyle typography={typography} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
