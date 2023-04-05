import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Container = styled.div`
  ${tw`
  flex items-baseline
`}
`;

const Wrapper = styled.div`
  ${tw`
  grid grid-cols-2 sm:grid-cols-4  gap-10 md:gap-10 px-4
`}
`;

const LinksWrapper = styled.div`
  ${tw`
  text-start items-start
`}
`;

const HeaderWrapper = styled.h2`
  ${tw`
  mb-6 pb-2 text-start items-start border-b border-solid border-[#5B5959]
`}
`;

const Header = styled.h2`
  ${tw`
   text-[20px] mr-2 leading-[20px] w-full text-white font-normal font-Montserrat
`}
`;

const LinkWrapper = styled.ul`
  ${tw`
  text-gray-600
`}
`;

const Link = styled.ul`
  ${tw`
  hover:underline font-Montserrat font-normal text-[16px] leading-[20px] text-white cursor-pointer
`}
`;

function FooterLinks() {
  return (
    <Container>
      <Wrapper>
        {/* first grid */}

        <LinksWrapper>
          <HeaderWrapper>
            <Header>Contact Us</Header>
          </HeaderWrapper>
          <LinkWrapper>
            <li className="mb-6">
              <Link href="/">About Us</Link>
            </li>
            <li className="mb-6">
              <Link href="/">FAQ</Link>
            </li>

            <li className="mb-6">
              <Link href="/">Delivery Information</Link>
            </li>

            <li className="mb-6">
              <Link href="/">Contact us</Link>
            </li>

            <li className="mb-6">
              <Link href="/">About Us</Link>
            </li>
          </LinkWrapper>
        </LinksWrapper>

        {/* second grid */}
        <LinksWrapper>
          <HeaderWrapper>
            <Header>Account</Header>
          </HeaderWrapper>
          <LinkWrapper>
            <li className="mb-6">
              <Link href="/">My Account</Link>
            </li>
            <li className="mb-6">
              <Link href="/">Order History</Link>
            </li>

            <li className="mb-6">
              <Link href="/">Wish List</Link>
            </li>

            <li className="mb-6">
              <Link href="/">Specials</Link>
            </li>
          </LinkWrapper>
        </LinksWrapper>
        {/* third grid */}

        <LinksWrapper>
          <HeaderWrapper>
            <Header>Services</Header>
          </HeaderWrapper>
          <LinkWrapper>
            <li className="mb-6">
              <Link href="/">Discount Returns</Link>
            </li>
            <li className="mb-6">
              <Link href="/">Policy</Link>
            </li>

            <li className="mb-6">
              <Link href="/">Customer Service</Link>
            </li>

            <li className="mb-6">
              <Link href="/">About Us</Link>
            </li>

            <li className="mb-6">
              <Link href="/">Terms & condition</Link>
            </li>
          </LinkWrapper>
        </LinksWrapper>

        {/* forth grid */}

        <LinksWrapper>
          <HeaderWrapper>
            <Header>Newsletter</Header>
          </HeaderWrapper>
          <div className="w-full h-full max-h-[206px] flex ">
            <div className="h-full flex flex-col w-full justify-between ">
              <span className="font-Montserrat font-normal text-[16px] leading-[20px] text-white">
                Get instant updates about our new collections and special
                promos.
              </span>

              <input
                placeholder="Enter your email here..."
                className="border border-solid border-[#5C6273] px-2 bg-transparent items-center text-start py-2 w-full placeholder:font-Montserrat placeholder:text-white placeholder:text-[12px] outline-none text-white "
              />
            </div>
          </div>
        </LinksWrapper>
      </Wrapper>
    </Container>
  );
}

export default FooterLinks;
