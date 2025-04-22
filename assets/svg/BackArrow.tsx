import * as React from "react";
import Svg, { Rect, Path, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg width={44} height={44} viewBox="0 0 44 44" fill="none" {...props}>
    <Rect width={44} height={44} rx={14} fill="#51B6F6" />
    <Path
      d="m13.814 25.048 4.613 4.585a1.91 1.91 0 0 0 2.712-.018 1.936 1.936 0 0 0-.017-2.73l-3.138-3.118 11.241-.07c.509-.004.995-.21 1.353-.575a1.937 1.937 0 0 0-.017-2.729c-.362-.36-.85-.56-1.36-.556l-11.24.07 3.098-3.157a1.937 1.937 0 0 0-.016-2.73 1.91 1.91 0 0 0-2.712.017l-4.556 4.643a4.53 4.53 0 0 0-1.289 3.192 4.52 4.52 0 0 0 1.328 3.176"
      fill="#fff"
    />
  </Svg>
);
export default SVGComponent;
