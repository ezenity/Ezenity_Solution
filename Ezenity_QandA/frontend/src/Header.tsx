import React from 'react';
import logo from './logo.svg';

// const: Allows you to declare and initialize a variable where its reference won't change later in the program
// let: allows you to delcare a variable where its reference can change later in the program
// export const Header = () => <div>Header<div/>
export const Header = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Edit <code>src/App.tsx</code> and save to reload. Here is a edit.
    </p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </header>
);
