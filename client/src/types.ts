export type User = {
  username: string;
  avatarUrl?: string;
};

export type Comment = {
  id: string;
  user: Pick<User, 'username'>;
  text: string;
};

export type Post = {
  id: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  createdAt: number;
};

