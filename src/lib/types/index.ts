export type State = "Planned" | "In-Progress" | "Live";

export interface User {
  id: string;
  pass: string;
  user: string;
}

export interface Comment {
  id: string;
  parentId: string | null;
  author: User;
  contents: string;
}

export interface Suggestion {
  id: string;
  state: State;
  title: string;
  description: string;
  category: string;
  votes: User[];
  comments: Comment[];
}

export interface Credentials {
  email: string;
  password: string;
  passwordConfirm: string;
}
