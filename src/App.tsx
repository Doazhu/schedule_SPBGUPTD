import { Hero, Marquee, Nav } from './sections/Top';
import { Why } from './sections/Why';
import { Features } from './sections/Features';
import { Screens } from './sections/Screens';
import { Roadmap, Tech, Wall } from './sections/Middle';
import { Author, Contacts, Footer, Idea, Rate } from './sections/Bottom';

export default function App() {
  return (
    <>
      <a className="skip" href="#why">К содержанию</a>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Why />
        <Features />
        <Screens />
        <Wall />
        <Tech />
        <Roadmap />
        <Idea />
        <Rate />
        <Author />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
