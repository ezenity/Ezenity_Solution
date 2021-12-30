import React from 'react';
import './App.css';
import { Header } from './Header';

function App() {
  //const App: React.FC = () => {
    //const unused = 'something';
    //debugger;
    return (
        <div className="App">
            <Header />
        </div>
    );
  //};
}

export default App;

// Add inside the <header> ... <header/> dic
// // <ProblemComponent />
// to see error message example in the 'browser console'

// This is an old API usage
// // Refs is short for references but is more often
// // referred to as refs within the React community.
// // It is not recommended to implement this type of
// // usage.
// this React ref feature allows us to access the DOM node. 
// // More Info here: https://reactjs.org/docs/refs-and-the-dom.html
//class ProblemComponent extends React.Component {
//    render() {
//        return <div ref="div" />;
//    }
//}
