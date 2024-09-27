import OurServices from './cars/page';
import Carousel from './components/Carousel';
import Pricing from './pricing/page';


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Carousel />
      <OurServices/>
      <Pricing/>

    </main>
  );
}