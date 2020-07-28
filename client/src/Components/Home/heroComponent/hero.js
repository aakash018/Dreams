import React from "react";
//import video from "./heroVideo.mp4";
import "./hero.css";
import { Link } from "react-router-dom";
import img from "../../../img/heroSection-cover.jpg";

function Hero() {
  return (
    <div className="hero">
      <div className="img_container">
        <img src={img} alt="cover" />
      </div>
      <div className="heroDesc">
        <h1>Explore Your Dreams</h1>
        <h3>A dream journal</h3>
        <h2>
          <Link to="/signup">SignUp</Link>
        </h2>
      </div>
    </div>
  );
}

export default Hero;
