import React from "react";
import { collabrationData } from "../constants";
import Intro from "../component/collaboration/Intro";
import Collaborators from "../component/collaboration/Collaborators";
import Button from "../component/collaboration/Button";
import Footer from "../component/Footer";
function Collabration() {
  return (
    <div className="pt-[12vh]">
      <Intro />
      <Collaborators />
      <Button />
      <Footer />
    </div>
  );
}

export default Collabration;
