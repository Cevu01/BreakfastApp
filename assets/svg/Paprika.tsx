import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg width={46} height={46} viewBox="0 0 46 46" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M17.255 1.305c.01-.954 1.01-1.594 1.867-1.173a4.6 4.6 0 0 1 1.264.92 4.52 4.52 0 0 1 1.288 3.164v4.029h-2.622v-4.03a1.93 1.93 0 0 0-1.089-1.733 1.29 1.29 0 0 1-.708-1.177"
        fill="#5FD2DB"
      />
      <Path
        d="M27.035 29.793v-19.43c.004-2.043-1.63-3.709-3.672-3.709h-5.488a3.673 3.673 0 0 0-3.674 3.673v14.73c0 9.662 6.323 17.918 15.036 20.837 1.794.6 3.303-1.476 2.17-2.99a21.82 21.82 0 0 1-4.372-13.111"
        fill="#FF5959"
      />
      <Path
        d="M27.035 12.417H14.202v-2.22a3.673 3.673 0 0 1 3.673-3.672h5.488c2.044 0 3.676 1.669 3.672 3.713z"
        fill="#5FD2DB"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h46v46H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SVGComponent;
