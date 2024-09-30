import OurServices from './cars/page';
import Carousel from './components/Carousel';
import Pricing from './pricing/page';
import GalleryPreview from './components/GalleryPreview';
import Transfer from './components/Transfer';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Carousel />
      <OurServices />
      <Transfer />
      <GalleryPreview />
      <Pricing />
    </main>
  );
}