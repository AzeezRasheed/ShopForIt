import React, { useState } from "react";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import styled from "styled-components";
import tw from "twin.macro";
import ModalContactUs from "./ModalContactUs";
import { useLocation } from "react-router-dom";

const Container = styled.header`
  ${tw`
px-4 md:px-14 py-2 w-full items-center text-center
`}
`;

const InnerWrapper = styled.div`
  ${tw`
flex flex-row  w-full items-center justify-between text-center m-auto
`}
`;

const SocialMediaWrapper = styled.div`
  ${tw`
flex space-x-6 justify-center
`}
`;

const SocialMediaAction = styled.a`
  ${tw`
text-[#C0C0C0] cursor-pointer
`}
`;

const TITLE = styled.h2`
  ${tw`
font-Montserrat font-normal text-sm text-center
  `}
`;

const Button = styled.button`
  ${tw`
font-Montserrat font-normal text-sm
  `}
`;
function Header() {
  const [isModalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <Container
      style={{
        backgroundColor: pathname === "/" ? "#041706" : "#FFFFFF",
      }}
    >
      {location.pathname !== "/" ? (
        <div className="relative overflow-hidden">
          <div className=" top-0 left-0 w-full h-full animate-slideLeft  text-black">
            shopforit exclusive official e-shop. Any concerns please contact
            care.ng@shopforit.org
          </div>
        </div>
      ) : (
        <>
          {isModalOpen && (
            <ModalContactUs open={isModalOpen} setOpen={setModalOpen} />
          )}
          <InnerWrapper>
            <div>
              <SocialMediaWrapper>
                <SocialMediaAction href="/">
                  <BsInstagram />
                  <span className="sr-only">Instagram page</span>
                </SocialMediaAction>

                <SocialMediaAction href="/">
                  <BsTwitter />
                  <span className="sr-only">Twitter page</span>
                </SocialMediaAction>
                <SocialMediaAction href="/">
                  <BsFacebook />
                  <span className="sr-only">Facebook page</span>
                </SocialMediaAction>

                <SocialMediaAction href="/">
                  <BsYoutube />
                  <span className="sr-only">Youtube account</span>
                </SocialMediaAction>
              </SocialMediaWrapper>
            </div>
            <div className="hidden lg:block text-center flex-1 items-center justify-center  ">
              <div>
                <div>
                  <TITLE
                    style={{
                      color: pathname === "/" ? "#FFFFFF" : "#000000",
                    }}
                  >
                    Free Shipping for most week order!!
                  </TITLE>
                </div>
              </div>
            </div>

            <div>
              <Button
                onClick={() => setModalOpen(true)}
                style={{
                  color: pathname === "/" ? "#FFFFFF" : "#000000",
                }}
              >
                contact@shopforit.com
              </Button>
            </div>
          </InnerWrapper>
        </>
      )}
    </Container>
  );
}

export default Header;
