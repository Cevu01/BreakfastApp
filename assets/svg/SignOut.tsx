import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
    <Path
      d="m34.634 20.884-6.56 6.562a1.25 1.25 0 0 1-1.769-1.767l4.428-4.429H16.25a1.25 1.25 0 0 1 0-2.5h14.483l-4.428-4.429a1.25 1.25 0 0 1 1.768-1.767l6.561 6.562a1.25 1.25 0 0 1 0 1.768M16.25 32.5H7.5v-25h8.75a1.25 1.25 0 0 0 0-2.5H7.5A2.503 2.503 0 0 0 5 7.5v25A2.503 2.503 0 0 0 7.5 35h8.75a1.25 1.25 0 0 0 0-2.5"
      fill="#000"
    />
  </Svg>
);
export default SVGComponent;
