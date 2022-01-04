/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { QuestionList } from './/QuestionList';
import { searchQuestions, QuestionData } from '../utils/QuestionsData';
import { Page } from './Page';

/**
 * Searchs for a question based off of the title or content
 * ----
 * With the hook from React Router (useSearchParams), we are destructing this
 * to an object that contains the search parameters. This hook returns an
 * array with two elements. However, for our scanerio we only need the first
 * element which will contain the search parameters. the second element is
 * a function to update the query parameters, which we are not using.
 * ----
 * Create a state to hold the matched questions in the search
 * ----
 * Once the state is completed we are going to get the 'criteria' query parameter
 * value or returns and empty string.
 * ----
 * Implmenting the 'useEffect()' hook, we aregoing to invoke the search when the
 * component first renders and when the search variable changes using that hook
 * ----
 *
 * @returns
 */
export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [questions, setQuestions] = React.useState<QuestionData[]>([]);
  const search = searchParams.get('criteria') || '';
  React.useEffect(() => {
    const doSearch = async (criteria: string) => {
      const foundResults = await searchQuestions(criteria);
      setQuestions(foundResults);
    };
    doSearch(search);
  }, [search]);
  return (
    <Page title="Search Results">
      {search && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        >
          for "{search}"
        </p>
      )}
      <QuestionList data={questions} />
    </Page>
  );
};
