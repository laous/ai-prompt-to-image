export interface PostType {
  id?: string;
  userId?: string;
  name: string;
  prompt: string;
  photo: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PostsType {
  posts: PostType[];
}
