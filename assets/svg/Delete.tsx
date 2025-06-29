import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
    <Path
      d="M36.667 8.333h-8.334v-5a1.667 1.667 0 0 0-1.666-1.666H13.333a1.667 1.667 0 0 0-1.666 1.666v5H3.333a1.667 1.667 0 1 0 0 3.334h1.862l3.152 25.206A1.67 1.67 0 0 0 10 38.333h20a1.67 1.67 0 0 0 1.653-1.46l3.152-25.206h1.862a1.667 1.667 0 0 0 0-3.334M15 5h10v3.333H15zm13.528 30H11.472L8.555 11.667h22.89z"
      fill="#fff"
    />
  </Svg>
);
export default SVGComponent;
