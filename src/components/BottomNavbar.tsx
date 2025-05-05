import { useEffect } from "react";
import { useState } from "react";
import React from "react";
import styled from "styled-components";
import { IconType } from "react-icons";
import { AiOutlineHome, AiOutlineCalendar, AiOutlineWechat, AiOutlineUser } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

interface INavbarItem {
  id: number;
  icon: IconType;
  path: string;
  label: string;
}

const navbarItems: INavbarItem[] = [
  { id: 1, icon: AiOutlineHome, path: "/", label: "Home" },
  { id: 2, icon: AiOutlineCalendar, path: "/calendar", label: "Calendar" },
  { id: 4, icon: AiOutlineWechat, path: "/chatroomlist", label: "Chat" },
  { id: 5, icon: BiMap, path: "/map", label: "Map" },
  { id: 6, icon: AiOutlineUser, path: "/myprofile", label: "Profile" },
];

interface BottomNavbarProps {
  paddingBottom?: boolean;
}

const BottomNavbar: React.FC<BottomNavbarProps> = ({ paddingBottom = true }) => {
  const location = useLocation(); // 컴포넌트 상단에 추가

  const [activeId, setActiveId] = useState(1);

  const handleClick = (id: number) => {
    setActiveId(id);
  };

  useEffect(() => {
    if (!paddingBottom) {
      document.body.style.paddingBottom = "0px";
    } else {
      document.body.style.paddingBottom = "60px";
    }
    return () => {
      document.body.style.paddingBottom = "0px"; // 컴포넌트가 언마운트될 때 초기화
    };
  }, [paddingBottom]);

  return (
    <Navbar>
      {navbarItems.map((item) => (
        <NavbarLink key={item.id} to={item.path} className={location.pathname === item.path ? "active" : ""}>
          <Icon>
            <item.icon />
          </Icon>
          <Label>{item.label}</Label>
        </NavbarLink>
      ))}
    </Navbar>
  );
};

const Navbar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  background-color: #fff;
  border-top: 1px solid #eee;
  margin: auto;
  max-width: 580px;
  z-index: 999;
`;

const NavbarItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
  cursor: pointer;
  &.active {
    color: #00aa5b;
  }
`;

const NavbarLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
  cursor: pointer;
  text-decoration: none;

  &.active {
    color: #00aa5b;
  }
`;

const Icon = styled.div`
  font-size: 24px;
  margin-bottom: 4px;
`;

const Label = styled.span`
  font-size: 12px;
`;

export default BottomNavbar;
