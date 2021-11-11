import React from "react";

import { FaLinkedin, FaGithub } from "react-icons/fa";

import logo from "../images/Pomni-logos-transparent-rectangular.png";

import {
  FooterContainer,
  FooterWrap,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  WebsiteRights,
  SocialIcons,
  SocialIconLink,
} from "./FooterElements";
import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrap>
        {/* <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>About us</FooterLinkTitle>
              <FooterLink to="/">About us</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>About us</FooterLinkTitle>
              <FooterLink to="/">About us</FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
        </FooterLinksContainer> */}
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to="/">
              <img className={styles.logo} src={logo} alt="Pomni logo"></img>
            </SocialLogo>
            <WebsiteRights>Pomni © {new Date().getFullYear()}</WebsiteRights>
            <SocialIcons>
              <SocialIconLink
                href="https://github.com/malikasen"
                target="_blank"
                aria-label="Github"
              >
                <FaGithub />
              </SocialIconLink>
              <SocialIconLink
                href="https://www.linkedin.com/in/malika-kassen-lao/"
                target="_blank"
                aria-label="Linkedin"
              >
                <FaLinkedin />
              </SocialIconLink>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
