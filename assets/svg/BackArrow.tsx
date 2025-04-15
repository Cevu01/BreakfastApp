import * as React from "react";
import Svg, { Ellipse, Path, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg width={49} height={47} viewBox="0 0 49 47" fill="none" {...props}>
    <Ellipse cx={24.5} cy={23.5} rx={24.5} ry={23.5} fill="#51B6F6" />
    <Path
      d="m16.587 26.932 4.823 4.793a2 2 0 0 0 2.835-.019 2.025 2.025 0 0 0-.018-2.853l-3.28-3.26 11.752-.074a2 2 0 0 0 1.414-.6 2.024 2.024 0 0 0-.017-2.854 2 2 0 0 0-1.422-.582l-11.752.075 3.24-3.302a2.024 2.024 0 0 0-.017-2.853 2 2 0 0 0-2.835.017l-4.764 4.854A4.73 4.73 0 0 0 15.2 23.61a4.73 4.73 0 0 0 1.388 3.32"
      fill="#fff"
    />
  </Svg>
);
export default SVGComponent;
