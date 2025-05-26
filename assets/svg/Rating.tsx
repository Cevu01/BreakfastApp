import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.686 18 9 15.568 8.314 18zM8.682.206a.35.35 0 0 1 .636 0l2.458 5.443 5.913.666a.35.35 0 0 1 .197.608l-4.394 4.03 1.197 5.853a.35.35 0 0 1-.137.355.35.35 0 0 1-.379.021L9 14.23l-5.173 2.952a.35.35 0 0 1-.379-.02.35.35 0 0 1-.137-.356l1.198-5.854-4.395-4.03a.352.352 0 0 1 .197-.607l5.913-.666zM1.154 12.781l2.09-1.41-2.515.1zm16.125-1.34-2.516-.09 2.095 1.402zM3.42 3.041l1.99 1.55-.885-2.368zm10.038-.828-.878 2.37 1.985-1.555z"
      fill="#FFD900"
    />
  </Svg>
);
export default SVGComponent;
