import React from "react";
import video from "./heroVideo.mp4";
import "./hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="hero">
      <div className="video_container">
        <video loop autoPlay muted>
          <source src={video} type="video/mp4" />
        </video>
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
