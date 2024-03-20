import React from "react";
import "./index.css"; // Ensure your CSS file is named Header.css

const Header = () => {
  return (
    <>
      <TopHeader />
      <BottomHeader />
    </>
  );
};

const TopHeader = () => {
  return (
    <header className="top-header">
      <div className="logo">
        <img src="/path-to-your-logo.png" alt="VehicleLight Logo" />
      </div>
      <div className="language-selector">
        <button>English</button>
        <button>عربى</button>
      </div>
    </header>
  );
};

const BottomHeader = () => {
  return (
    <div className="bottom-header">
      <nav className="navigation">
        <ul>
          <li>
            <a href="#">Transactions</a>
          </li>
          <li>
            <a href="#">Settings</a>
          </li>
          <li>
            <a href="#">Site Activity</a>
          </li>
        </ul>
      </nav>
      <div className="user-info">
        <span className="user-info-item">Logged In User: admin</span>
        <span className="user-info-item">Wednesday, October 5 2016</span>
        <a href="#" className="logout">
          Logout
        </a>
      </div>
    </div>
  );
};

export default Header;
