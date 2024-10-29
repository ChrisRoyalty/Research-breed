import React, { useState, useEffect } from "react";
import HeroSection from "../component/home/HeroSection";
import Featured from "../component/home/Featured";
import Research from "../component/home/Research";
import HowItWorks from "../component/home/HowItWorks";
// import Reviews from "../component/home/Reviews";
import "../css/home.css";
import Footer from "../component/Footer";

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if a user is logged in (e.g., by checking for a token in sessionStorage)
    const userToken = localStorage.getItem("authToken"); // Adjust according to your authentication setup
    if (userToken) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="pt-[14vh]">
      <HeroSection loggedIn={loggedIn} />
      <Featured />
      <Research />
      <HowItWorks />
      {/* <Reviews /> */}
      <Footer />
    </div>
  );
}

export default Home;
