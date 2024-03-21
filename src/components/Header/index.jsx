import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./index.css"; // Ensure your CSS file is named Header.css
import {
  MdOutlineCalendarToday,
  MdSettings,
  MdOutlineList
} from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { Menu, MenuItem, Button } from "@mui/material";

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
  const navigate = useNavigate();
  const [transactionAnchorEl, setTransactionAnchorEl] = useState(null);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);

  const handleLogout = () => {
    // Implement logout logic here
    navigate("/login");
  };

  const handleTransactionClick = (event) => {
    setTransactionAnchorEl(event.currentTarget);
  };

  const handleSettingsClick = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setTransactionAnchorEl(null);
    setSettingsAnchorEl(null);
  };

  return (
    <div className="bottom-header">
      <nav className="navigation">
        <ul>
          <li>
            <Button
              className="menu-button"
              onClick={handleTransactionClick}
              startIcon={<MdOutlineList />}
              sx={{ color: "white" }}
            >
              Transactions
            </Button>
            <Menu
              anchorEl={transactionAnchorEl}
              open={Boolean(transactionAnchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => navigate("/add-transaction")}>
                Add Transaction
              </MenuItem>
              <MenuItem onClick={() => navigate("/list-transactions")}>
                List Transactions
              </MenuItem>
              <MenuItem onClick={() => navigate("/reports")}>Reports</MenuItem>
            </Menu>
          </li>
          <li>
            <Button
              className="menu-button"
              onClick={handleSettingsClick}
              startIcon={<MdSettings />}
              sx={{ color: "white" }}
            >
              Settings
            </Button>
            <Menu
              anchorEl={settingsAnchorEl}
              open={Boolean(settingsAnchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => navigate("/change-password")}>
                Change Password
              </MenuItem>
              <MenuItem onClick={() => navigate("/roles")}>Roles</MenuItem>
            </Menu>
          </li>
          <li>
            <Button
              className="menu-button"
              onClick={() => navigate("/site-activity")}
              sx={{ color: "white" }}
            >
              Site Activity
            </Button>
          </li>
        </ul>
      </nav>
      <div className="user-info">
        <span className="user-info-item">Logged In User: admin</span>
        <MdOutlineCalendarToday className="icon" />
        <span className="user-info-item">Wednesday, October 5, 2016</span>
        <Button
          className="logout"
          onClick={handleLogout}
          startIcon={<IoIosLogOut />}
          sx={{ color: "white", textTransform: "none" }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
export default Header;
