import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import "@/styles/globals.css";
import "@/styles/header.css"
import "@/styles/footer.css"
import Layout from '@/components/Layout'; // Import your custom layout component
import Head from "next/head";

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }


function MyAppWithLayout({ Component, pageProps }) {
 

 {
    return (
      <>
      <Head>
         <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.stonediscover.co.uk/#organization",
                  "name": "Stone Discover UK Ltd.",
                  "url": "https://www.stonediscover.co.uk/",
                  "foundingDate": "1984",
                  "sameAs": [
                    "https://x.com/sdiscover_uk",
                    "https://www.linkedin.com/company/stone-discover-uk-ltd/"
                  ],
                  "logo": {
                    "@type": "ImageObject",
                    "@id": "https://www.stonediscover.co.uk/#logo",
                    "inLanguage": "en-GB",
                    "url": "https://www.stonediscover.co.uk/stone-logo.png",
                    "contentUrl": "https://www.stonediscover.co.uk/stone-logo.png",
                    "width": 1024,
                    "height": 1024,
                    "caption": "Stone Discover UK"
                  },
                  "image": { "@id": "https://www.stonediscover.co.uk/#logo" },
                  "description": "Wholesale granite memorial headstones for UK stonemasons, funeral directors and monument dealers. Factory direct from our quarry in India. UK stock in London, Liverpool and Southampton.",
                  "alternateName": "Stone Discover Wholesale Memorial Headstones Supplier UK",
                  "telephone": ["+44 1613 941 594", "+44 161 394 1594"],
                  "email": "info@stonediscover.co.uk",
                  "brand": {
                    "@type": "Brand",
                    "name": "Stone Discover UK Ltd.",
                    "logo": "https://www.stonediscover.co.uk/stone-logo.png"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.stonediscover.co.uk/#website",
                  "url": "https://www.stonediscover.co.uk/",
                  "name": "Stone Discover UK Ltd.",
                  "alternateName": "Stone Discover — Wholesale Granite Memorials Supplier UK",
                  "description": "Wholesale granite memorial headstones for UK stonemasons, funeral directors and monument dealers. Factory direct since 1984. UK warehouse stock in London, Liverpool and Southampton.",
                  "publisher": { "@id": "https://www.stonediscover.co.uk/#organization" },
                  "potentialAction": [{
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://www.stonediscover.co.uk/?s={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }],
                  "inLanguage": "en-GB"
                },
                {
                  "@type": "WebPage",
                  "@id": "https://www.stonediscover.co.uk/#webpage",
                  "url": "https://www.stonediscover.co.uk/",
                  "name": "Wholesale Memorial Headstones UK | Stone Discover UK",
                  "isPartOf": { "@id": "https://www.stonediscover.co.uk/#website" },
                  "about": { "@id": "https://www.stonediscover.co.uk/#organization" },
                  "primaryImageOfPage": { "@id": "https://www.stonediscover.co.uk/#logo" },
                  "datePublished": "2024-01-01T00:00:00+00:00",
                  "dateModified": "2025-05-26T00:00:00+00:00",
                  "description": "Wholesale granite memorial headstones for UK stonemasons, funeral directors and monument dealers. Factory direct since 1984. UK warehouse stock in London, Liverpool and Southampton.",
                  "inLanguage": "en-GB",
                  "potentialAction": [{
                    "@type": "ReadAction",
                    "target": ["https://www.stonediscover.co.uk/"]
                  }],
                  "headline": "UK's Wholesale Memorial Headstones Supplier",
                  "keywords": [
                    "wholesale memorial headstones UK",
                    "granite memorial UK",
                    "memorial supplier UK",
                    "memorial headstones UK",
                    "wholesale granite headstones",
                    "granite grave markers UK",
                    "trade memorial supplier UK"
                  ]
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://www.stonediscover.co.uk/#localbusiness",
                  "name": "Stone Discover UK Ltd.",
                  "description": "Wholesale granite memorial headstones for UK stonemasons, funeral directors and monument dealers. Factory direct since 1984. UK warehouse stock in London, Liverpool and Southampton.",
                  "image": "https://www.stonediscover.co.uk/stone-logo.png",
                  "alternateName": "Stone Discover Wholesale Memorial Supplier UK",
                  "priceRange": "££",
                  "telephone": ["+44 1613 941 594", "+44 161 394 1594"],
                  "email": "info@stonediscover.co.uk",
                  "url": "https://www.stonediscover.co.uk/",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "124-128 City Road",
                    "addressLocality": "London",
                    "addressRegion": "England",
                    "postalCode": "EC1V 2NX",
                    "addressCountry": "GB"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 51.52706865727293,
                    "longitude": -0.08876773400079006
                  },
                  "brand": {
                    "@type": "Brand",
                    "name": "Stone Discover UK Ltd.",
                    "logo": "https://www.stonediscover.co.uk/stone-logo.png"
                  },
                  "openingHoursSpecification": [{
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "08:00",
                    "closes": "17:00"
                  }],
                  "sameAs": [
                    "https://x.com/sdiscover_uk",
                    "https://www.linkedin.com/company/stone-discover-uk-ltd/"
                  ]
                }
              ]
            })
          }}
        />
      </Head>
      <Layout faq={pageProps.faq}>
        <Component {...pageProps} />
      </Layout>
      </>
    );
  }


}

export default MyAppWithLayout;