import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg width={46} height={46} viewBox="0 0 46 46" fill="none" {...props}>
    <Path
      d="M39.25 31.283c0-8.975-7.275-16.25-16.25-16.25S6.75 22.307 6.75 31.282"
      fill="#B096ED"
    />
    <Path
      d="M25.03 15.158a16 16 0 0 0-2.03-.126c-8.975 0-16.25 7.276-16.25 16.25h4.058c0-8.287 6.204-15.125 14.221-16.124"
      fill="#9673E7"
    />
    <Path
      d="M40.685 31.283v2.072c0 1.188-.961 2.15-2.149 2.15H7.463a2.15 2.15 0 0 1-2.149-2.15v-2.072z"
      fill="#7C51E1"
    />
    <Path
      d="M8.723 33.355v-2.072H5.315v2.072a2.15 2.15 0 0 0 2.149 2.15h3.408a2.15 2.15 0 0 1-2.149-2.15"
      fill="#622EDC"
    />
    <Path d="M40.685 31.284H5.314v1.404h35.371z" fill="#622EDC" />
    <Path d="M46 30.503H0v1.56h46z" fill="#7C51E1" />
    <Path d="M6.75 30.503H0v1.56h6.75z" fill="#622EDC" />
    <Path
      d="M24.887 12.382A1.89 1.89 0 0 1 23 14.27a1.888 1.888 0 1 1 1.887-1.888"
      fill="#9673E7"
    />
    <Path
      d="M24.887 12.382a1.89 1.89 0 0 1-1.262 1.782 1.887 1.887 0 0 1 0-3.562 1.89 1.89 0 0 1 1.262 1.78"
      fill="#B096ED"
    />
  </Svg>
);
export default SVGComponent;
