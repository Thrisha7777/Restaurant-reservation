import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="banner">
          <div className="top">
            <h1 className="heading">ABOUT US</h1>
            <p>The only thing we're serious about is food.</p>
          </div>
          <p className="mid">
            Welcome to Bhoosha, where great food meets effortless dining! Our
            restaurant ensures that your perfect table is always ready, making
            your dining experience smooth, enjoyable, and hassle-free. At
            Bhoosha, we believe that every meal should be a memorable
            experience. Whether you're planning a romantic dinner, a family
            gathering, or a corporate event, our reservation system allows you
            to book your table with ease.
          </p>

          {/* ✅ Clean and functional Explore Menu link styled like a button */}
          <Link to="/menu" className="menu-btn">
            Explore Menu <HiOutlineArrowRight style={{ marginLeft: "8px" }} />
          </Link>
        </div>

        <div className="banner">
          <img src="about.png" alt="about" />
        </div>
      </div>
    </section>
  );
};

export default About;
