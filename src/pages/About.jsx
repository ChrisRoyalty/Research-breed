import React from "react";
import AboutMain from "../component/about/AboutMain";
import OurVision from "../component/about/OurVision";
import OurMission from "../component/about/OurMission";
import OurValues from "../component/about/OurValues";
import OurPlatform from "../component/about/OurPlatform";
import Team from "../component/about/Team";
import Reviews from "../component/home/Reviews";
import Footer from "../component/Footer";
function About() {
  return (
    <div className="pt-[14vh]">
      <AboutMain />
      <OurVision />
      <OurMission />
      <OurValues />
      <OurPlatform />
      <Team />
      <Reviews />
      <Footer />
    </div>
  );
}

export default About;
