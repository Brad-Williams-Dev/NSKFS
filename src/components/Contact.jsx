import React from "react";
import NavBar from "./NavBar";
import "./Contact.css";

const Contact = () => {
  return (
    <div>
      <NavBar />
      <div className="container">
        <img src="../images/nskfsLogo.png" alt="Logo" className="logo" />
        <div className="contactInfo">
          <div className="infoItem">
            <div className="infoText">Michael Cox</div>
          </div>
          <div className="infoItem">
            <div className="infoText">nskfs@gmail.com</div>
          </div>
          <div className="infoItem">
            <div className="infoText">(123) 456-7890</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
