import { Box, keyframes } from "@chakra-ui/react";
import { ReactNode } from "react";



const circleAnimation = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const smallCircleSize = "25px";
const mediumCircleSize = "50px";
const bigCircleSize = "150px";

export default function AnimatedBackground() {
  return (
    <Box
      w="100vw"
      h="100vh"
      bgGradient="linear(to-t, #667eea, #764ba2)"
      pos="fixed"
      top={0}
      left={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="-1"
    >
      <Box
        w={bigCircleSize}
        h={bigCircleSize}
        bg="transparent"
        pos="relative"
        animation={`${circleAnimation} 8s linear infinite`}
      >
        <Box
          w={mediumCircleSize}
          h={mediumCircleSize}
          bg="transparent"
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%) rotate(-60deg)"
          animation={`${circleAnimation} 4s linear infinite reverse`}
        >
          <Box w={smallCircleSize} h={smallCircleSize} bg="#c7c7c7" borderRadius="50%" />
        </Box>
        <Box
          w={smallCircleSize}
          h={smallCircleSize}
          bg="transparent"
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%) rotate(-60deg)"
          animation={`${circleAnimation} 2s linear infinite reverse`}
        >
          <Box w={mediumCircleSize} h={mediumCircleSize} bg="#888" borderRadius="50%" />
        </Box>
      </Box>
     
    </Box>
  );
}
