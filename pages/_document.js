import { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script'
export default function Document() {
  return (
    <Html lang="en-GB">
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="192x192" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
        <meta property="og:locale" content="en_GB" />
        <meta name="google-site-verification" content="UuMJs_UyrvoSDR_TKigPMzLmqY6XAPP2u9Oq__tBcd0" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-H0L8BSTQ7R`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
               window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-H0L8BSTQ7R');
              `,
          }}
        />
        <Script id="GoogleTagManager" strategy="beforeInteractive">
          {
            `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KQ28WFGB');;`
          }
        </Script>
        {/* End Google Analytics tracking code */}
      </Head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KQ28WFGB"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <Main />
        <NextScript />

        {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script> */}
        {/* <script src="https://code-eu1.jivosite.com/widget/0vnMaZXeaH" async></script> */}


        {/* <script
          dangerouslySetInnerHTML={{
            __html: `window.$zoho=window.$zoho || {};
                     $zoho.salesiq=$zoho.salesiq||{ready:function(){}}`,
          }}
        />
        <script
          id="zsiqscript"
          src="https://salesiq.zohopublic.in/widget?wc=siqcfeea1f5820ab9000343a7b903f7b7ac53297b9dbfd79babb3fd60df230b0f35"
          defer
        ></script> */}

           {/* Zoho SalesIQ */}
          <script
          dangerouslySetInnerHTML={{
            __html: `
              var $zoho = $zoho || {};
              $zoho.salesiq = $zoho.salesiq || {
                  widgetcode: "siq24db42b123907969f273b450e1bf7256b38c9b3ce64b42d79f6952e155f88655",
                  values: {},
                  ready: function(){}
              };
              var d=document;
              s=d.createElement("script");
              s.type="text/javascript";
              s.id="zsiqscript";
              s.defer=true;
              s.src="https://salesiq.zoho.in/widget";
              t=d.getElementsByTagName("script")[0];
              t.parentNode.insertBefore(s,t);
            `,
          }}
        />

      </body>
    </Html>
  );
}
