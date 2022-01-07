import { QuestionData } from './QuestionsData';

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
