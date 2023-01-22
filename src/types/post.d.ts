export interface PostType {
  id?: string;
  prompt: string;
  photo: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  User: UserInPostType | null;
}

interface UserInPostType {
  id: string;
  name: string | null;
  image: string | null;
}
export interface PostsType {
  posts: PostType[];
}
