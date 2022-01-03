/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// Define the children prop with a type annotation of ReactNode
interface Props {
  children: React.ReactNode;
}

// Here we are referencing the children prop inside the h2 element.
// This means that the child elements that consume components
// specify will be placed inside the h2 element.
export const PageTitle = ({ children }: Props) => {
  return (
    <h2
      css={css`
        font-size: 15px;
        font-weight: bold;
        margin: 10px 0 5px;
        text-transform: uppercase;
      `}
    >
      {children}
    </h2>
  );
};
