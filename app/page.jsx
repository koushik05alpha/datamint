import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/components/HomePage';

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <HomePage />
      <Footer />
    </>
  );
}
