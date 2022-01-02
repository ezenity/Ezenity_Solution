import React from 'react';

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
  <div>
    {title && <PageTitle>{title}</PageTitle>}
    {children}
  </div>
);