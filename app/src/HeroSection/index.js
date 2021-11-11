import React, { useState } from "react";

import useAuth0 from "../auth/useAuth0";
import Video from "../videos/video.mp4";

import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
  Button,
} from "./HeroElements";

const HeroSection = () => {
  const { loginWithRedirect } = useAuth0();
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };
  return (
    <>
      <HeroContainer>
        <HeroBg>
          <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
        </HeroBg>
        <HeroContent>
          <HeroH1>Learning Words Made Easy</HeroH1>
          <HeroP>Start learning words today with Pomni</HeroP>
          <HeroBtnWrapper>
            <Button
              onClick={loginWithRedirect}
              onMouseEnter={onHover}
              onMouseLeave={onHover}
              primary="true"
              dark="true"
            >
              Get started {hover ? <ArrowForward /> : <ArrowRight />}
            </Button>
          </HeroBtnWrapper>
        </HeroContent>
      </HeroContainer>
    </>
  );
};

export default HeroSection;
