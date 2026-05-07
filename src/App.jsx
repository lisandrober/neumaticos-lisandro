import Navbar from './components/Navbar';
import WhatsAppFloat from './components/WhatsAppFloat';
import Footer from './components/Footer';

import Hero from './sections/Hero';
import TiresSection from './sections/Tires';
import RecappingSection from './sections/Recapping';
import CertificationsSection from './sections/Certifications';
import ContactSection from './sections/Contact';

export default function App() {
  return (
    <>
      {/* Fixed elements */}
      <Navbar />
      <WhatsAppFloat />

      {/* Page sections */}
      <main>
        <Hero />
        <TiresSection />
        <RecappingSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
