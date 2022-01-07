import { QuestionData } from './QuestionsData';

/**
 * ************************************************************
 * Actions
 * ************************************************************
 */
/**
 * The type for the state object in our store
 * ----
 * loading: Whether a server request is being made
 * unaswered: An array containng unanswered questions
 * viewing: The question the user is viewing
 * searched: An array containing questions matched in the search
 */
interface QuestionState {
  readonly loading: boolean;
  readonly unanswered: QuestionData[];
  readonly viewing: QuestionData | null;
  readonly searched: QuestionData[];
}

/**
 * Component to our store that has a question property that contains
 * the properties in 'QuestionState'
 */
export interface AppState {
  readonly questions: QuestionState;
}

/**
 * Define the initial state for the store
 * ----
 * This ensures that an empty array of unaswereed questions present
 */
const initialQuestionState: QuestionState = {
  loading: false,
  unanswered: [],
  viewing: null,
  searched: [],
};

/**
 * Constant to the hold the action type for our First action
 * ----
 * This is indicating that the data is being fetched from the server
 */
export const GETTINGUNANSWEREDQUESTIONS = 'GettingUnansweredQuestions';

/**
 * Function which returns an immutable type
 * ----
 * This will result in string properties having a narrow string literal type rather
 * than the wider string type.
 *
 * @returns unanswered questions being fetched from the server
 */
export const gettingUnansweredQuestionsAction = () =>
  ({
    type: GETTINGUNANSWEREDQUESTIONS,
  } as const);

/**
 * Constant to hold the action type for our second action
 * ----
 * This is indicating that the data being retrieved from a server
 */
export const GOTANSWEREDQUESTIONS = 'gotUnansweredQuestions';

/**
 * Function returning the action when data is being retrieved from a server
 *
 * @param questions the unanswered questions that were retrieved from the server
 * @returns the action for when the unanswered questions being retrieved from the server
 */
export const gotUnansweredQuestionsAction = (questions: QuestionData[]) =>
  ({
    type: GOTANSWEREDQUESTIONS,
    questions: questions,
  } as const);

/**
 * Constant for getting the question
 */
export const GETTINGQUESTION = 'GettingQuestion';

/**
 * Function returning the question that it is getting fetched from the server
 *
 * @returns the question being fetched from the server
 */
export const gettingQuestionAction = () =>
  ({
    type: GETTINGQUESTION,
  } as const);

/**
 * Constant for when the question was received
 */
export const GOTQUESTION = 'gotQuestion';

/**
 * Function returning the action when the question was received from the server
 *
 * @param question thatis being viewed
 * @returns the action for when the question being retrieved from the server
 */
export const gotQuestionAction = (question: QuestionData | null) =>
  ({
    type: GOTQUESTION,
    question: question,
  } as const);

/**
 * Constant for when searching for the questions
 */
export const SEARCHINGQUESTIONS = 'SearchingQuestions';

/**
 * Function returning the searched question which is being fetched from the server
 *
 * @returns the searched questions which are being fetched from the server
 */
export const searchingQuestionsAction = () =>
  ({
    type: SEARCHINGQUESTIONS,
  } as const);

/**
 * Constant for when the searched questions are received
 */
export const SEARCHEDQUESTIONS = 'SearchedQuestions';

/**
 * Function returning the action when the searched questions was received from the server
 *
 * @param questions which were searched and received fro mthe server
 * @returns the action for when the searched questions being retrieved from the server
 */
export const searchedQuestionsAction = (questions: QuestionData[]) =>
  ({
    type: SEARCHEDQUESTIONS,
    questions,
  } as const);
