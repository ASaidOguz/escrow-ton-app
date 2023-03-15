import { Heading } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const extrude = keyframes`
  from {
    text-shadow:
      0 0 0 white,
      -0.075em -0.075em 0 #f9ca24,
      -0.15em -0.15em 0 #f0932b,
      -0.225em -0.225em 0 #eb4d4b,
      -0.3em -0.3em 0 #6ab04c,
      -0.375em -0.375em 0 #22a6b3,
      -0.45em -0.45em 0 #be2edd,
      -0.525em -0.525em 0 #ff7979,
      -0.6em -0.6em 0 #fdcb6e;
  }
  to {
    text-shadow:
      0 0 0 white,
      0.075em 0.075em 0 #f9ca24,
      0.15em 0.15em 0 #f0932b,
      0.225em 0.225em 0 #eb4d4b,
      0.3em 0.3em 0 #6ab04c,
      0.375em 0.375em 0 #22a6b3,
      0.45em 0.45em 0 #be2edd,
      0.525em 0.525em 0 #ff7979,
      0.6em 0.6em 0 #fdcb6e;
  }
`;

const AnimatedTitle = () => {
  return (
    <Heading
      mt={4}
      ml={7}
      as="h1"
      fontSize="6xl"
      fontWeight="bold"
      textTransform="uppercase"
      animation={`${extrude} 4s linear infinite`}
    >
      ESCROW-TON
    </Heading>
  );
};

export default AnimatedTitle;
