/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  fontFamily,
  fontSize,
  gray1,
  gray2,
  gray5,
  widthMax,
  positionFixed,
  displayFlex,
  alignItemsCenter,
  justifyContentSpaceBetween,
  borderBottomSolidGray5,
  boxShadow,
} from './assets/css/Styles';
import { UserIcon } from './Icons';
import { Link } from 'react-router-dom';

// const: Allows you to declare and initialize a variable where its reference won't change later in the program
// let: allows you to delcare a variable where its reference can change later in the program
// ------------------------------------------------------------------------------------------------------------------
// When an implicit return statement is on multiple lines it requires to have a parentheses, otherwise if it is on
// a single line then you can use the following statement below.
// export const Header = () => <div>Header<div/>

export const Header = () => {
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
  };
  return (
    <header className="App-header">
      <div
        css={css`
          position: ${positionFixed};
          box-sizing: border-box;
          top: 0;
          width: ${widthMax};
          display: ${displayFlex};
          align-items: ${alignItemsCenter};
          justify-content: ${justifyContentSpaceBetween};
          padding: 10px 20px;
          background-color: #fff;
          border-bottom: ${borderBottomSolidGray5};
          box-shadow: ${boxShadow};
        `}
      >
        <Link
          to="/"
          css={css`
            font-size: 24px;
            font-weight: bold;
            color: ${gray1};
            text-decoration: none;
          `}
        >
          Q & A
        </Link>
        <input
          type="text"
          placeholder="Search.."
          onChange={handleSearchInputChange}
          css={css`
            box-sizing: border-box;
            font-family: ${fontFamily};
            font-size: ${fontSize};
            padding: 8px 10px;
            border: 1px solid ${gray5};
            border-radius: 3px;
            color: ${gray2};
            background-color: white;
            width: 200px;
            height: 30px;
            :focus {
              outline-color: ${gray5};
            }
          `}
        />
        <Link
          to="signin"
          css={css`
            font-family: ${fontFamily};
            font-size: ${fontSize};
            padding: 5px 10px;
            background-color: transparent;
            color: ${gray2};
            text-decoration: none;
            cursor: pointer;
            :focus {
              outline-color: ${gray5};
            }
            span {
              margin-left: 7px;
            }
          `}
        >
          <UserIcon />
          <span>Sign In</span>
        </Link>
      </div>
    </header>
  );
};
