import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  //const App: React.FC = () => {
    //const unused = 'something';
    //debugger;
    return (
        <div className="App">
            <header className="App-header">
                <ProblemComponent />
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
        </div>
    );
  //};
}

export default App;


// This is an old API usage
// // Refs is short for references but is more often
// // referred to as refs within the React community.
// // It is not recommended to implement this type of
// // usage.
// this React ref feature allows us to access the DOM node. 
// // More Info here: https://reactjs.org/docs/refs-and-the-dom.html
class ProblemComponent extends React.Component {
    render() {
        return <div ref="div" />;
    }
}
