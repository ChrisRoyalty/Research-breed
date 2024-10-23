import React from "react";

const Subscribe = () => {
  const handleSubscription = () => {
    // Add logic to handle subscription here
    console.log("Subscribed!");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
      <div className="max-w-[600px] bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Upgrade Your Experience
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Subscribe now to unlock unlimited blog posts and more features!
        </p>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={handleSubscription}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-800 transition duration-300"
          >
            Subscribe Now
          </button>
        </div>

        <p className="text-sm text-gray-500 text-center">
          With our subscription, you can create unlimited blogs and access
          exclusive features.
        </p>
      </div>
    </div>
  );
};

export default Subscribe;
