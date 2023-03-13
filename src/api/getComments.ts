import * as SecureStore from 'expo-secure-store';

//this function is called in the CommentComponent, which renders all comments for a post.
//it is passed postId of the comments that it will render, and potentially a commentId to append to the url query.
//if commentId is passed, it will fetch the comments for that commentId, which are the replies to the comment.
//the function is called recursively to fetch all replies to a comment.

//currently it calls the api with a limit of 100, which is the max number of comments that can be returned in a single call.
//this is fine for a small scale app, but if the app were to grow, it would be necessary implement pagination with infinite scrolling.

export const fetchComments = async (postId: number, commentId?: number) => {
    const token = await SecureStore.getItemAsync('jwt');
    
    const url = `http://3.26.31.47:3000/posts/${postId}/comments${commentId ? '/' + commentId : ''}?page=1&limit=100`
    console.log('fetching comments from url', url);
    const response = await fetch(url, {
        headers: {Authorization: `Bearer ${token}`}
      }
    );
    const data = await response.json();

    return data
  }