import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg width={30} height={30} viewBox="0 0 30 30" fill="none" {...props}>
    <Path
      d="M28.75 15c0 7.594-6.156 13.75-13.75 13.75S1.25 22.594 1.25 15 7.406 1.25 15 1.25 28.75 7.406 28.75 15M3.759 15c0 6.209 5.033 11.241 11.241 11.241 6.209 0 11.241-5.032 11.241-11.241S21.21 3.759 15 3.759 3.759 8.792 3.759 15"
      fill="#000"
    />
    <Path
      d="M15 6.25c-.69 0-1.25.56-1.25 1.25v8.083s0 .326.158.571c.106.208.272.389.489.514l5.775 3.334a1.25 1.25 0 0 0 1.25-2.165l-5.172-2.985V7.5c0-.69-.56-1.25-1.25-1.25"
      fill="#000"
    />
  </Svg>
);
export default SVGComponent;
