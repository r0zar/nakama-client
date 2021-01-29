import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render () {
    return (
      <Html lang="en">
        <Head />
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
        ></script>
        <script
          src="https://kit.fontawesome.com/70c9e17067.js"
          crossOrigin="anonymous"
        ></script>
        <script type="text/javascript" src="/zest/settings.js"></script>
        <script type="text/javascript" src="/zest/start.js"></script>
        <body className="loading">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
