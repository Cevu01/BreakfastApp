import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg width={19} height={17} viewBox="0 0 19 17" fill="none" {...props}>
    <Path
      d="m1.38 11.657 4.612 4.585a1.91 1.91 0 0 0 2.712-.018 1.937 1.937 0 0 0-.017-2.73l-3.138-3.118 11.242-.07c.508-.004.995-.21 1.352-.575a1.936 1.936 0 0 0-.017-2.729c-.361-.36-.85-.56-1.36-.557l-11.24.071L8.624 3.36A1.937 1.937 0 0 0 8.608.63a1.91 1.91 0 0 0-2.712.017L1.34 5.288A4.53 4.53 0 0 0 .051 8.481a4.52 4.52 0 0 0 1.328 3.176"
      fill="#000"
    />
  </Svg>
);
export default SVGComponent;
