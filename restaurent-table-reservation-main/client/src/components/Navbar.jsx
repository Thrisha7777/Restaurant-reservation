import React, { useState } from "react";
import api from "../restApi.json"; 
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <nav>
        <div className="logo">Bhoosa</div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            {api.data[0].navbarLinks.map((element) => (
              <ScrollLink
                to={element.link}
                spy={true}
                smooth={true}
                duration={500}
                key={element.id}
              >
                {element.title}
              </ScrollLink>
            ))}
            <RouterLink
              to="/admin-login"
              className="admin-login-link"
              onClick={() => setShow(false)}
            >
              ADMIN LOGIN
            </RouterLink>
          </div>
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;

