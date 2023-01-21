export interface PostType {
  id?: string;
  name: string;
  prompt: string;
  photo: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PostsType {
  posts: PostType[];
}
