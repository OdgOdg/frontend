import { useState } from "react";

import React from "react";
import styled from "styled-components";
import { IconType } from "react-icons";
import { AiOutlineHome, AiOutlineCalendar, AiOutlineWechat, AiOutlineUser } from "react-icons/ai";
import { BiMap } from "react-icons/bi";

interface INavbarItem {
  id: number;
  icon: IconType;
  path: string;
  label: string; // Add the label property here
}

const navbarItems: INavbarItem[] = [
  { id: 1, icon: AiOutlineHome, path: "/", label: "Home" },
  { id: 2, icon: AiOutlineCalendar, path: "/calendar", label: "Calendar" },
  { id: 4, icon: AiOutlineWechat, path: "/chat", label: "Chat" },
  { id: 5, icon: BiMap, path: "/map", label: "Map" },
  { id: 6, icon: AiOutlineUser, path: "/profile", label: "Profile" },
];

const BottomNavbar: React.FC = () => {
  const [activeId, setActiveId] = useState(1);

  const handleClick = (id: number) => {
    setActiveId(id);
    // TODO: path에 따라 페이지 이동 로직 추가
  };

  return (
    <Navbar>
      {navbarItems.map((item) => (
        <NavbarItem key={item.id} className={activeId === item.id ? "active" : ""} onClick={() => handleClick(item.id)}>
          <Icon>
            <item.icon />
          </Icon>
          <Label>{item.label}</Label>
        </NavbarItem>
      ))}
    </Navbar>
  );
};

const Navbar = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  background-color: #fff;
  border-top: 1px solid #eee;
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

const Icon = styled.div`
  font-size: 24px;
  margin-bottom: 4px;
`;

const Label = styled.span`
  font-size: 12px;
`;

export default BottomNavbar;
