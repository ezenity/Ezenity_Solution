/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PageTitle } from './PageTitle';

// This component is taking an optional title prop and
// renders this inside the PageTitle component. The
// component also takes in a children prop.
interface Props {
  title?: string;
  children: React.ReactNode;
}

// In the consuming component, the content nested within the page component
// will be rendered where we have just placed the children prop.
export const Page = ({ title, children }: Props) => (
  <div
    css={css`
      margin: 50px auto 20px auto;
      padding: 30px 20px;
      max-width: 600px;
    `}
  >
    {title && <PageTitle>{title}</PageTitle>}
    {children}
  </div>
);
