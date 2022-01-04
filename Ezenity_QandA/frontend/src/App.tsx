/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { fontFamily, fontSize, gray2 } from './assets/css/Styles';
import { Header } from './component/Header';
import { HomePage } from './component/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AskPage } from './component/AskPage';
import { SearchPage } from './component/SearchPage';
import { SignInPage } from './component/SignInPage';
import { NotFoundPage } from './component/NotFoundPage';
import { QuestionPage } from './component/QuestionPage';

function App() {
  //const App: React.FC = () => {
  //const unused = 'something';
  //debugger;
  return (
    <BrowserRouter>
      <div
        css={css`
          font-family: ${fontFamily};
          font-size: ${fontSize};
          color: ${gray2};
        `}
      >
        <Header />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="ask" element={<AskPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="questions/:questionId" element={<QuestionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
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
