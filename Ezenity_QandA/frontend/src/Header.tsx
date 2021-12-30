import React from 'react';
import logo from './logo.svg';
import { UserIcon } from './Icons';

// const: Allows you to declare and initialize a variable where its reference won't change later in the program
// let: allows you to delcare a variable where its reference can change later in the program
// ------------------------------------------------------------------------------------------------------------------
// When an implicit return statement is on multiple lines it requires to have a parentheses, otherwise if it is on
// a single line then you can use the following statement below.
// export const Header = () => <div>Header<div/>

export const Header = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <div>
      <a href="./">Q & A</a>
      <input type="text" placeholder="Search.." />
      <a href="./signin">
        <UserIcon />
        <span>Sign In</span>
      </a>
    </div>
  </header>
);
