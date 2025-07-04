import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg width={46} height={46} viewBox="0 0 46 46" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M7.087 0C5.632 0 4.423 1.2 4.423 2.654v3.539c0 1.234.873 2.27 2.025 2.56-2.825 2.03-4.679 5.7-4.679 9.835v15.92C1.77 40.782 6.03 46 11.5 46h23c5.47 0 9.73-5.217 9.73-11.493v-15.92c0-4.13-1.853-7.799-4.674-9.83 1.154-.287 2.02-1.327 2.02-2.565V2.654A2.665 2.665 0 0 0 38.927 0H14.282v3.51H9.157V0z"
        fill="#5A3392"
      />
      <Path
        d="M7.089 1.778h31.84c.505 0 .887.372.887.877v3.539a.87.87 0 0 1-.888.888H7.09a.87.87 0 0 1-.888-.888V2.655c0-.505.382-.877.888-.877"
        fill="#fff"
      />
      <Path
        d="M11.502 8.844h23c3.592 0 6.672 2.95 7.63 7.08H3.882c.954-4.13 4.026-7.08 7.62-7.08"
        fill="#EE746C"
      />
      <Path
        d="M3.62 17.7h38.774c.02.298.072.583.072.889v15.92c0 .3-.053.581-.072.874H3.62c-.02-.293-.073-.574-.073-.874v-15.92c0-.306.053-.59.072-.888"
        fill="#29A3EC"
      />
      <Path
        d="M3.879 37.159h38.256c-.954 4.133-4.037 7.08-7.633 7.08h-23c-3.597 0-6.673-2.946-7.623-7.08"
        fill="#EE746C"
      />
      <Path
        d="M6.256 37.73h33.502c-.835 3.467-3.535 5.938-6.685 5.938H12.931c-3.15 0-5.843-2.471-6.675-5.938"
        fill="#FB9761"
      />
      <Path
        d="M36.682 39.047a.9.9 0 0 0-.458.17 7.5 7.5 0 0 1-3.526 1.306.885.885 0 0 0 .054 1.763h.04q.045.003.091 0a9.2 9.2 0 0 0 4.35-1.62.885.885 0 0 0-.549-1.62zm-5.721 2.747a.885.885 0 1 1-1.77 0 .885.885 0 0 1 1.77 0"
        fill="#fff"
      />
      <Path
        d="M5.38 19.023h35.253c.02.252.066.495.066.755v13.54c0 .255-.046.494-.066.743H5.38c-.02-.25-.067-.488-.067-.744v-13.54c0-.26.047-.502.067-.755"
        fill="#3CDEF6"
      />
      <Path
        d="M24.758 20.35a.9.9 0 0 0-.614.262l-5.302 5.303a.885.885 0 0 0 .626 1.515h4.937l-3.8 3.787a.887.887 0 0 0 1.253 1.254l5.316-5.302a.885.885 0 0 0-.627-1.515H21.61l3.788-3.788a.885.885 0 0 0-.64-1.515"
        fill="#fff"
      />
      <Path
        d="M8.765 2.44h28.487c.453 0 .795.279.795.658v2.656c0 .38-.342.666-.794.666H8.765c-.452 0-.795-.287-.795-.666V3.098c0-.38.342-.659.795-.659"
        fill="#EBFEFF"
      />
      <Path
        d="M12.93 9.284h20.145c3.147 0 5.845 2.583 6.683 6.201H6.255c.836-3.618 3.527-6.201 6.674-6.201"
        fill="#FB9761"
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
