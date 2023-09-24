import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const cache = createCache({ key: 'css', prepend: true });
    const { extractCriticalToChunks } = createEmotionServer(cache);
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => (
          <CacheProvider value={cache}>
            <App {...props} />
          </CacheProvider>
        ),
      });

    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => ({
      ...style,
      key: style.key,
    }));

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        ...emotionStyleTags,
      ],
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>{/* ... other head elements */}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
