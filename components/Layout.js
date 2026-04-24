
import Header from "./Header";// Import your header component
import Footer from './Footer'; // Import your footer component
import CookieConsentBanner from "./CookieConsentBanner";

function Layout({ children, faq }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer faq={faq} />
      {/* <CookieConsentBanner /> */}
    </>
  );
}

export default Layout;
