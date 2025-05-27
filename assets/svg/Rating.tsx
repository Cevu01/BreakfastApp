import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg width={22} height={22} viewBox="0 0 16 16" fill="none" {...props}>
    <Path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8" fill="#F44336" />
    <Path
      d="M8 3.667 9.3 6.3l2.9.433-2.1 2.034.5 2.9L8 10.3l-2.6 1.367.5-2.9-2.1-2.034L6.7 6.3z"
      fill="#FFCA28"
    />
  </Svg>
);
export default SVGComponent;
