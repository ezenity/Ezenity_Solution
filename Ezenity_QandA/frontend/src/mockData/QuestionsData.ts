// Defines the structure of the questions we expect to be working with
export interface QuestionData {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  created: Date;
  answers: AnswerData[];
}

// Interface for the structure of the answers we're expceting
export interface AnswerData {
  answerId: number;
  content: string;
  userName: string;
  created: Date;
}