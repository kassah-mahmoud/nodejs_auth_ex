import React from "react";
import { Router, Redirect } from "@reach/router";

function App() {
  return (
    <div className="w-full p-5 md:p-10 lg:p-20 bg-gray-300 min-h-screen">
      <div className="w-full bg-white rounded-md px-5 md:px-10 py-5 mb-10">
        <div className="flex items-center justify-center space-x-4">
          <h1 className="font-bold text-2xl text-center">
            Node Authentication Example
          </h1>
        </div>
      </div>
      <div className="w-full bg-white rounded-md px-5 md:px-10 py-5 mb-10 overflow-hidden overflow-y-auto">
        <Router>
          <Redirect from="/" to="/stores" />
          <Login path="/login" />
          <Register path="/register" />
        </Router>
      </div>
    </div>
  );
}

export default App;
