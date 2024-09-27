import React from "react";
import Header from "../component/Header";
import Main from "../component/publication/Main";
import Access from "../component/publication/Access";
import Listings from "../component/publication/Listings";
import Footer from "../component/Footer";

function Publications() {
  return (
    <div className="pt-[12vh]">
      <Main />
      {/* <Access /> */}
      <Listings />
      <Footer />
    </div>
  );
}

export default Publications;
