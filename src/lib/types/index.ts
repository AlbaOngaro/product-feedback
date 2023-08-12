export type State = "Planned" | "In-Progress" | "Live";

export interface User {
  id: string;
  pass: string;
  user: string;
  avatar: string;
}

export interface Comment {
  id: string;
  parentId: string | null;
  author: User;
  contents: string;
  suggestion: Suggestion["id"];
}

export interface Category {
  id: string;
  label: string;
}

export interface Suggestion {
  id: string;
  state: State;
  title: string;
  description: string;
  category: Category["label"];
  votes: User[];
  comments: Comment[];
}

export interface Credentials {
  email: string;
  password: string;
  passwordConfirm: string;
}
