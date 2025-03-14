import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
    <Path
      d="M1.59961 7L12.3996 7M12.3996 7L6.99961 1.6M12.3996 7L6.99961 12.4"
      stroke="#101011"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
