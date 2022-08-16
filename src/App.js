import React from "react";
import "./App.css";
// import ISeeFire from "./assets/i-see-fire.m4a";
import YourUniverse from "./assets/your-universe.m4a";
import Audio from "./Audio";

function App() {
  return (
    <div>
      <Audio source={YourUniverse} />
    </div>
  );
}

export default App;
