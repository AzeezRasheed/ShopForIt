import React, { useState } from "react";
import tw from "twin.macro";
import { slide as Menu } from "react-burger-menu";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import MenuStyles from "../data/MenuStyles";
import LogoWhite from "../assets/SHOP FOR IT.png";

const styles = {
  container: tw`
    flex
    flex-wrap
    items-center
    list-none
    gap-6
  `,
  logoWrapper: tw`flex flex-row items-center cursor-pointer`,
  listContainer: tw``,
  navItems: (menu) => css`
    ${tw`
      block
      py-2
      pl-3
      pr-4
      text-white
      text-[16px]
      leading-[28px]
      md:hover:bg-transparent
      md:p-0
    `}

    ${menu &&
    tw`
      text-white
      text-xl
      mb-3
      focus:text-white
    `}
  `,
  buttonMd: tw`
    flex
    flex-row
    items-start
    py-[12px]
    px-[24px]
    gap-[12px]
    bg-white
    rounded-full
  `,
  buttonSm: tw`
    flex
    flex-row
    items-start
    py-[16px]
    px-[16px]
    gap-[12px]
    bg-white
    rounded-full
  `,
};

const Container = styled.div`
  ${styles.container}
`;

const ListContainer = styled.ul`
  ${styles.listContainer}
`;

const NavItems = styled.a`
  ${styles.navItems}
`;

const ButtonSm = styled.a`
  ${styles.buttonSm}
`;

const LogoContainer = styled.div``;

function NavbarIsMobile({ hamburgerOpen, setHamburgerOpen }) {
  return (
    <Menu
      isOpen={hamburgerOpen}
      onClose={() => {
        setHamburgerOpen(false);
      }}
      customBurgerIcon={false}
      right
      styles={MenuStyles}
    >
      <Container>
        <LogoContainer>
          <Link style={styles.logoWrapper} to="/">
            <img
              src={LogoWhite}
              alt="shop for it"
              className="w-[50px] h-[48px] "
            />
            <span
              className={`font-Montserrat font-medium text-[20px] text-white cursor-pointer`}
            >
              shop for it
            </span>
          </Link>
        </LogoContainer>
        <ListContainer>
          <li>
            <NavItems menu href="/">
              Home
            </NavItems>
          </li>

          <li>
            <NavItems menu href="/products">
              Shop All
            </NavItems>
          </li>
          <li>
            <NavItems menu href="/">
              About Us
            </NavItems>
          </li>
          <li>
            <NavItems menu href="/contact-us">
              Contact Us
            </NavItems>
          </li>
        </ListContainer>
      </Container>
    </Menu>
  );
}

export default NavbarIsMobile;
