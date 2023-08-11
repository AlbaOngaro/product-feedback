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
  title: string;
  description: string;
  category: string;
  votes: number;
  comments: Comment[];
}
