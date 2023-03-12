export interface CommentInterface {
    id: number;
    text: string;
    userId: number;
    postId: number;
    createdAt: string;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        telephone: string;
      };
    comments: []
  }

export interface CommentComponentProps {
    comment: CommentInterface;
    level: number;
}

