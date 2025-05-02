import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20"
        fill="#FFD15D"
      />
      <Path
        d="m39.957 21.299-9.413-9.413-10.51 9.55-10.406 9.076 9.467 9.467q.45.02.905.021c10.61 0 19.287-8.26 19.957-18.701"
        fill="#F9B54C"
      />
      <Path
        d="M28.833 31.111H11.167a2.28 2.28 0 0 1-2.278-2.278V13.39a2.28 2.28 0 0 1 2.278-2.279h17.666a2.28 2.28 0 0 1 2.278 2.278v15.444a2.28 2.28 0 0 1-2.278 2.278"
        fill="#324A5E"
      />
      <Path
        d="M28.833 11.111h-8.878v20h8.878a2.28 2.28 0 0 0 2.278-2.278V13.39a2.28 2.28 0 0 0-2.278-2.279"
        fill="#2B3B4E"
      />
      <Path d="M24.444 13.333h-8.888v4.445h8.888z" fill="#B5F1F4" />
      <Path d="M24.444 13.333h-4.488v4.445h4.488z" fill="#84DBFF" />
      <Path
        d="M19.764 17.61a.27.27 0 0 1-.19-.08l-2.222-2.222a.27.27 0 0 1 .38-.38l2.223 2.222a.27.27 0 0 1-.19.46"
        fill="#2C9984"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h40v40H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SVGComponent;
