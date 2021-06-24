import React from "react";
import "./Banner.css";
const Banner = () => {
  return (
    <div className="Banner">
      <div className="Banner-content">
        <div className="Banner-text">
          <div className="Banner-text-heading">
            <h1>E-kart | Speedlabs</h1>
          </div>
          <div className="Banner-text-description">
            <p>Comprehensive learning programs & classes for all students.</p>
          </div>
        </div>
        <div className="Banner-image">
          <img
            src="https://www.speedlabs.in/images/partners-new/personalized-education.png"
            alt="speedlab.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
