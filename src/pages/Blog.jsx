import React from "react";
import CarouselComponent from "../component/blog/CarouselComponent";
import Search from "../component/blog/Search";
import Footer from "../component/Footer";

function Blog() {
  return (
    <div className="pt-[12vh]">
      <Search />
      <CarouselComponent />
      <CarouselComponent />

      <CarouselComponent />

      <CarouselComponent />
      <CarouselComponent />
      <Footer />
    </div>
  );
}

export default Blog;
