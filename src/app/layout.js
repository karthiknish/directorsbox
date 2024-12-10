import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import Header from "../components/header";
import Footer from "../components/footer";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
const mango = localFont({
  src: [
    {
      path: "./fonts/Mango.otf",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--font-mango",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Directors Box By Profici",
  description:
    "Directors Box is an exclusive, high-level networking group for business leaders and entrepreneurs, offering premium connections, strategic partnerships, and collaborative opportunities in a confidential environment. Join fellow directors and decision-makers in this carefully curated business community focused on growth, innovation, and mutual success.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '362063942726861');
            fbq('track', 'PageView');
          `}
        </Script>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-10832930955"
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-10832930955');
          `}
        </Script>
        <Script
          src="//profici.co.uk/wp-content/plugins/gravity-forms-iframe-master/assets/scripts/gfembed.min.js"
          type="text/javascript"
        />
      </head>
      <GoogleTagManager gtmId="GTM-TVDSJQ65" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${mango.variable} font-sans antialiased`}
      >
        <Header />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
