import { QuestionData } from './QuestionsData';
import { Store, createStore, combineReducers } from 'redux';

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

/**
 * ************************************************************
 * Reducers
 * ************************************************************
 */

/**
 * Union type containing all the action types that will represent the redcuer action parameter
 */
type QuestionsActions =
  | ReturnType<typeof gettingUnansweredQuestionsAction>
  | ReturnType<typeof gotUnansweredQuestionsAction>
  | ReturnType<typeof gettingQuestionAction>
  | ReturnType<typeof gotQuestionAction>
  | ReturnType<typeof searchingQuestionsAction>
  | ReturnType<typeof searchedQuestionsAction>;

/**
 * Skeleton reducer function
 * ----
 * This will handle the actions defined above with a strongly typed set in the action parameter
 */
const questionsReducer = (
  state = initialQuestionState,
  action: QuestionsActions,
) => {
  switch (action.type) {
    // Copy previous state into a new object and loading properties
    case GETTINGUNANSWEREDQUESTIONS: {
      return {
        ...state,
        loading: true,
      };
    }
    // Copy previous state into a new object, set the unanswered and loading properties
    case GOTANSWEREDQUESTIONS: {
      return {
        ...state,
        unanswered: action.questions,
        loading: false,
      };
    }
    // Copy previous state into a new object, question being viewed is reset to null and
    // the loading state is set to true while the server request is being made
    case GETTINGQUESTION: {
      return {
        ...state,
        viewing: null,
        loading: true,
      };
    }
    // Copy previous state into a new object, the question being viewed is set to the question
    // from the action and the loading state is reset to false.
    case GOTQUESTION: {
      return {
        ...state,
        viewing: action.question,
        loading: false,
      };
    }
    // Copy previous state into a new object, the search results are initialized to an empty array
    // and the loading state is set to true while the server request is being made
    case SEARCHINGQUESTIONS: {
      return {
        ...state,
        searched: [],
        loading: true,
      };
    }
    // Copy previous state into a new object, the searched results are being matched against questions
    // from the search and the loading state is reset to false.
    case SEARCHEDQUESTIONS: {
      return {
        ...state,
        searched: action.questions,
        loading: false,
      };
    }
  }
  return state;
};

/**
 * ************************************************************
 * Redux Store
 * ************************************************************
 */

/**
 * Root Reducer
 * ----
 * An object literal is passed into 'combineReducers' which contains the properties in our app state,
 * along with the reducer that is responsible for that state. We only create one property in our ap
 * state called 'quetions' which is being managed by a single reducer called 'questionsReducer for
 * when changes are made to that state.
 */
const rootReducer = combineReducers<AppState>({
  questions: questionsReducer,
});

/**
 * Function to create the store
 *
 * @returns a generic 'Store' type for  passing in the interface for our app state
 */
export function configureStore(): Store<AppState> {
  const store = createStore(rootReducer, undefined);
  return store;
}
