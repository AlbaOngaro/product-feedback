export type State = "Planned" | "In-Progress" | "Live";

export interface Comment {
  id: string;
  parentId: string | null;
  author: {
    fullName: string;
    handle: string;
    avatar: string;
  };
  contents: string;
}

export interface Suggestion {
  id: string;
  state: State;
  title: string;
  description: string;
  category: string;
  votes: number;
  comments: Comment[];
}

export interface Credentials {
  email: string;
  password: string;
  passwordConfirm: string;
}
