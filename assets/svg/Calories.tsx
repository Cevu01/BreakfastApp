import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg width={58} height={58} viewBox="0 0 58 58" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M35.237 30.063v-3.841a4.83 4.83 0 0 0-4.112-4.771v-9.913h-2.118v9.913a4.83 4.83 0 0 0-4.111 4.77v13.036h2.118v-7.139a.997.997 0 0 1 1.993 0v7.139h2.118v-7.139a.997.997 0 0 1 1.994 0v7.139h2.118z"
        fill="#E6E6E6"
      />
      <Path
        d="M32.635 2.353v9.94a2.353 2.353 0 0 1-2.353 2.352h-.432a2.353 2.353 0 0 1-2.353-2.352v-9.94A2.353 2.353 0 0 1 29.85 0h.432a2.353 2.353 0 0 1 2.353 2.353"
        fill="#F95428"
      />
      <Path
        d="m48.194 48.288-20.593 4.2-17.794-4.2a21.6 21.6 0 0 1 4.676-6.153 21.5 21.5 0 0 1 2.423-1.92q.648-.442 1.327-.837h.002a21.3 21.3 0 0 1 5.366-2.201 21.5 21.5 0 0 1 5.4-.683 21.5 21.5 0 0 1 6.892 1.128 21.4 21.4 0 0 1 7.44 4.343 21.6 21.6 0 0 1 4.861 6.322"
        fill="#F7B239"
      />
      <Path
        d="m52.703 48.288-3.674 6.618A6.01 6.01 0 0 1 43.772 58H14.229a6.01 6.01 0 0 1-5.258-3.094l-3.674-6.618z"
        fill="#E6E6E6"
      />
      <Path
        d="m18.244 54.906-3.674-6.618H5.297l3.674 6.618A6.01 6.01 0 0 0 14.23 58h9.273a6.01 6.01 0 0 1-5.258-3.094"
        fill="#CCC"
      />
      <Path
        d="M33.66 37.001a21.6 21.6 0 0 0-4.66-.508c-8.382 0-15.646 4.797-19.193 11.795h9.32c2.87-5.662 8.174-9.882 14.534-11.287"
        fill="#E09B2D"
      />
      <Path
        d="M14.483 42.135a21 21 0 0 0-1.04 1.017l.143.087c1.231.75 3.289 2.4 3.224 5.032v.017h1.412c.031-1.417-.425-4.063-3.74-6.153m3.753-2.757h-.002q-.68.395-1.327.838c.446.25 4.92 2.865 4.651 8.035v.036h1.411c.243-4.997-3.195-7.878-4.733-8.909m21.215-.18a22 22 0 0 0-1.264-.65l-.025.07c-1.668 4.517-8.015 6.125-10.146 6.543a12.7 12.7 0 0 0-.936-3.117c4.253-.422 8.312-3.976 8.498-4.141l.316-.282q-.794-.268-1.614-.475c-1.113.893-4.606 3.473-7.902 3.527a15.6 15.6 0 0 0-2.776-3.496q-.818.211-1.61.485l.354.288c.051.041 5.016 4.166 4.347 10.26l-.009.077h1.42c.062-.589.077-1.16.053-1.713a24 24 0 0 0 4.406-1.285c3.528-1.423 5.906-3.528 6.888-6.091m2.56 1.676-.049.508a3.9 3.9 0 0 1-.46 1.518c-.859 1.552-2.834 3.354-5.307 4.776l-1.147.612h2.859c3.476-2.236 5.069-4.605 5.392-6.159l.034-.163a21 21 0 0 0-1.322-1.092"
        fill="#B27214"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h58v58H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SVGComponent;
