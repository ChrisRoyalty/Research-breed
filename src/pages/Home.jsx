import React from "react";
import HeroSection from "../component/home/HeroSection";
import Featured from "../component/home/Featured";
import Research from "../component/home/Research";
import HowItWorks from "../component/home/HowItWorks";
import Reviews from "../component/home/Reviews";
import "../css/home.css";
import Footer from "../component/Footer";
function Home() {
  return (
    <div className="pt-[14vh]">
      <HeroSection />
      <Featured />
      <Research />
      <HowItWorks />
      <Reviews />
      <Footer />
    </div>
  );
}

export default Home;
