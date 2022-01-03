import styled from '@emotion/styled';

export const gray1 = '#383737';
export const gray2 = '#5c5a5a';
export const gray3 = '#857c81';
export const gray4 = '#b9b9b9';
export const gray5 = '#e3e2e2';
export const gray6 = '#f7f8fa';
export const primary1 = '#681c41';
export const primary2 = '#824c67';
export const accent1 = '#dbb365';
export const accent2 = '#efd197';
export const fontFamily = "'Segoe UI', 'Helvetica Neue',sans-serif";
export const fontSize = '16px';
export const boxShadow = '0 3px 7px 0 rgba(110, 112, 114, 0.21)';
export const positionFixed = 'fixed';
export const widthMax = '100%';
export const displayFlex = 'flex';
export const alignItemsCenter = 'center';
export const justifyContentSpaceBetween = 'space-between';
export const borderBottomSolidGray5 = '1px solid #e3e2e2';

/**
 * Tagged Tamplate Literal
 * ----
 * Is to be parsed with a function. The template literal is contained in
 * backticks (``) and the parsing unction is palced immediately before it
 * The function is named with the HTML element name that will be created and
 * is styled with any avaialble css elements
 */
export const PrimaryButton = styled.button`
  background-color: ${primary2};
  border-color: ${primary2};
  border-style: solid;
  border-radius: 5px;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  padding: 5px 10px;
  color: white;
  cursor: pointer;
  :hover {
    background-color: ${primary1};
  }
  :focus {
    outline-color: ${primary2};
  }
  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/**
 * Tagged Template Literal
 * ----
 * Page title Styled Component
 */
export const PageTitleStyle = styled.h2`
  font-size: 15px;
  font-weight: bold;
  margin: 10px 0px 5px;
  text-align: center;
  text-transform: uppercase;
`;
