/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './utils/Store';
import { fontFamily, fontSize, gray2 } from './assets/css/Styles';
import { Header } from './component/Header';
import { HomePage } from './component/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchPage } from './component/SearchPage';
import { SignInPage } from './component/SignInPage';
import { NotFoundPage } from './component/NotFoundPage';
import { QuestionPage } from './component/QuestionPage';
// import { AskPage } from './component/AskPage';
const AskPage = React.lazy(() => import('./component/AskPage'));

/**
 * Instance of our store
 */
const store = configureStore();

function App() {
  //const App: React.FC = () => {
  //const unused = 'something';
  //debugger;
  return (
    <Provider store={store}>
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
            <Route
              path="ask"
              element={
                <React.Suspense
                  fallback={
                    <div
                      css={css`
                        margin-top: 100px;
                        text-align: center;
                      `}
                    >
                      Loading...
                    </div>
                  }
                >
                  <AskPage />
                </React.Suspense>
              }
            />
            <Route path="signin" element={<SignInPage />} />
            <Route path="login" element={<SignInPage />} />
            <Route path="questions/:questionId" element={<QuestionPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
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
