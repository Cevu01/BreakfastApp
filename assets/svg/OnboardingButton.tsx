import * as React from "react";
import Svg, { Rect, Path, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg width={36} height={36} viewBox="0 0 36 36" fill="none" {...props}>
    <Rect width={36} height={36} rx={8} fill="white" />
    <Path
      d="M12.5996 18L23.3996 18M23.3996 18L17.9996 12.6M23.3996 18L17.9996 23.4"
      stroke="#101011"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
