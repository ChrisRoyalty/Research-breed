import React from "react";

import Footer from "./Footer";
import Main from "./submission/Main";

const SubmissionForm = () => {
  return (
    <div className="pt-[14vh] w-full h-fit flex flex-col items-center justify-center">
      <Main />
      <Footer />
    </div>
  );
};

export default SubmissionForm;
