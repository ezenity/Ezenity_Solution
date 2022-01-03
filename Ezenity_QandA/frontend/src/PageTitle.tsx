import React from 'react';

// Define the children prop with a type annotation of ReactNode
interface Props {
  children: React.ReactNode;
}

// Here we are referencing the children prop inside the h2 element.
// This means that the child elements that consume components
// specify will be placed inside the h2 element.
export const PageTitle = ({ children }: Props) => <h2>{children}</h2>;
