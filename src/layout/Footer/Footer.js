import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import "./style.css";
import HomeIcon from '@mui/icons-material/Home';
import WalletIcon from '@mui/icons-material/Wallet';
import PinDropIcon from '@mui/icons-material/PinDrop';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const Footer = () => {
    const location = useLocation();

    const NavLink = ({ to, icon: IconComponent, label }) => {
        const isActive = location.pathname.startsWith(to) || (to === '/home' && location.pathname === '/');

        return (
            <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
                <div>
                    <IconComponent sx={{ fontSize: 35, color: isActive ? "white" : "gray" }} />
                    <p className={`nav-text ${isActive ? 'active' : ''}`}>{label}</p>
                </div>
            </Link>
        );
    };

    return (

        <nav className="nav-wrapper">
            <NavLink to="/home" icon={HomeIcon} label="Home" />
            <NavLink to="/wallet" icon={WalletIcon} label="Wallet" />
            <NavLink to="/map" icon={PinDropIcon} label="Map" />
            <NavLink to="/community" icon={ChatBubbleOutlineIcon} label="Community" />
            <NavLink to="/mypage" icon={PersonOutlineIcon} label="My Page" />
        </nav>
    );
};

export default Footer;