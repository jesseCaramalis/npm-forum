import { PostInterface } from '../../types/post';
import * as SecureStore from 'expo-secure-store';

//this function is called on the FeedScreen to fetch the posts to be displayed.
//it is passed the page number and limit, which are used to implement pagination with infinite scrolling. 
//the page number is incremented by 1 each time the user scrolls to the bottom of the page, and the limit is the number of posts to be returned in a single call (currently 10 by default).

//the function can also be passed an array of tags, which are used to filter the posts by tag by appending them to the url. 
//this allows us to write one fetch that will return the post list and also specific posts by tag.
//it is called every time a tag is selected, and when the page number is incremented.

export const fetchPosts = async (pageNumber: number, limit: number, tags?: string[]): Promise<{ total: number, data: PostInterface[] }> => {
    const token = await SecureStore.getItemAsync('jwt');

    const url = `${process.env.REACT_APP_BASE_URL}/posts/list?page=${pageNumber}&limit=${limit}${tags && tags.length ? `&tags=${tags.join('&tags=')}` : ''}`;
    console.log('fetching posts from url', url);
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
  
    const data = await response.json();
  
    return data;
  };