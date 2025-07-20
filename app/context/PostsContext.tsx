import React, { createContext, ReactNode, useContext, useState } from 'react';

export type Post = {
  id: string;
  user: {
    name: string;
    avatar: any;
    isVerified?: boolean;
  };
  time?: string;
  timeAgo?: string;
  image: any;
  caption?: string;
  description?: string;
  likes: number;
  comments: number;
  mealType?: string;
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  tags?: string[];
  isLiked?: boolean;
  isSaved?: boolean;
};

interface PostsContextType {
  posts: Post[];
  addPost: (post: Post) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (post: Post) => {
    setPosts(prev => [post, ...prev]);
  };

  return (
    <PostsContext.Provider value={{ posts, addPost }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) throw new Error('usePosts must be used within a PostsProvider');
  return context;
} 