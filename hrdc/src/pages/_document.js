import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Add title and favicon */}
        <title>HRDC Intranet Portal</title>
        <link rel="shortcut icon" href="/tree-logo.png" />
        <link rel="icon" type="image/png" href="/tree-logo.png" />
        <link rel="apple-touch-icon" href="/tree-logo.png" />


        {/* Load jQuery first */}

        <script
          src="/assets/js/jquery.min.js"
          defer
        />
        <script
          src="/assets/js/jquery.scrollex.min.js"
          defer
        />
        <script
          src="/assets/js/jquery.scrolly.min.js"
          defer
        />
        <script
          src="/assets/js/browser.min.js"
          defer
        />
        <script
          src="/assets/js/breakpoints.min.js"
          defer
        />
        <script
          src="/assets/js/util.js"
          defer
        />
        <script
          src="/assets/js/main.js"
          defer
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

