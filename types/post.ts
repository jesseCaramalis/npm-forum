export interface PostInterface {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      telephone: string;
    };
    likes: number;
    comments: number;
    tags: { name: string }[];
  }
export interface PostComponentProps {
    post: PostInterface;
    onPress?: () => void;
    selectedTags?: string[];
  }