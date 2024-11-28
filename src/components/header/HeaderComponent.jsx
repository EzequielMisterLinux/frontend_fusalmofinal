import React from "react";
import { Outlet } from "react-router-dom";
import tw, { styled } from "twin.macro";
import NavbarDefault from "../navbar/NavbarComponent";

const HeaderContainer = styled.div`
  ${tw`flex flex-col min-h-screen w-full`}
`;

const Header = styled.header`
  ${tw`w-full`}
`;

const ContentContainer = styled.div`
  ${tw`flex-grow p-4`}
`;

const HeaderDefault = () => {
  return (
    <HeaderContainer>
      <Header>
        <NavbarDefault />
      </Header>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </HeaderContainer>
  );
};

export default HeaderDefault;
