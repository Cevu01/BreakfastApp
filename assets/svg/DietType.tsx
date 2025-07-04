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
        d="M40 20q0-.11-.003-.22l-8.886-8.887L18.94 22.784l-8.092 8.897 8.3 8.3q.424.018.853.019c11.046 0 20-8.954 20-20"
        fill="#F9B54C"
      />
      <Path d="M31.111 10.893H15.556v20H31.11z" fill="#fff" />
      <Path d="M31.111 10.893h-7.654v20h7.654z" fill="#D0D1D3" />
      <Path d="M28.889 15.135H17.778v.405h11.11z" fill="#B8C9D9" />
      <Path d="M17.778 15.136v.404h5.679v-.404" fill="#B8C9D9" />
      <Path
        d="M28.889 15.135h-5.432v.405h5.432zm0 2.223h-5.432v.404h5.432z"
        fill="#99ACBC"
      />
      <Path
        d="M23.457 17.358h-5.68v.404h5.68zm0 2.222h-5.68v.404h5.68z"
        fill="#B8C9D9"
      />
      <Path d="M28.889 19.58h-5.432v.404h5.432z" fill="#99ACBC" />
      <Path d="M23.457 21.802h-5.68v.404h5.68z" fill="#B8C9D9" />
      <Path
        d="M28.889 21.802h-5.432v.404h5.432zm0 2.222h-5.432v.404h5.432z"
        fill="#99ACBC"
      />
      <Path
        d="M23.457 24.024h-5.68v.404h5.68zm0 2.223h-5.68v.404h5.68z"
        fill="#B8C9D9"
      />
      <Path d="M28.889 26.247h-5.432v.404h5.432z" fill="#99ACBC" />
      <Path
        d="M14.658 21.674c-3.186 0-5.77 1.14-5.77 4.327 0 2.192 1.224 5.627 3.024 6.603.604.327 1.336.247 1.887-.163a1.43 1.43 0 0 1 1.718 0c.55.41 1.282.49 1.886.163 1.8-.976 3.023-4.411 3.023-6.603 0-3.186-2.582-4.327-5.768-4.327"
        fill="#C1321F"
      />
      <Path
        d="M14.658 21.674h-.03v10.483h.03c.322 0 .619.105.859.284.55.41 1.283.49 1.886.163 1.8-.976 3.023-4.411 3.023-6.603 0-3.186-2.582-4.327-5.768-4.327"
        fill="#A82116"
      />
      <Path
        d="M18.104 19.796s-2.99-.373-3.446 2.749c0 0 2.66.71 3.446-2.75"
        fill="#2C9984"
      />
      <Path d="M14.666 22.547c.162.04 2.666.593 3.432-2.729z" fill="#268472" />
      <Path
        d="M14.658 23.553h-.019a.437.437 0 0 1-.418-.455c.063-1.5-1.255-2.506-1.268-2.516a.437.437 0 0 1 .525-.7c.069.052 1.698 1.297 1.616 3.252a.437.437 0 0 1-.436.42"
        fill="#935635"
      />
      <Path
        d="M14.629 21.245v2.306l.01.002h.019a.437.437 0 0 0 .436-.419 3.6 3.6 0 0 0-.465-1.889"
        fill="#804000"
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
