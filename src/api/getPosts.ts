import { PostInterface } from '../../types/post';
import * as SecureStore from 'expo-secure-store';

export const fetchPosts = async (pageNumber: number, limit: number, tags?: string[]): Promise<{ total: number, data: PostInterface[] }> => {
    const url = `http://3.26.31.47:3000/posts/list?page=${pageNumber}&limit=${limit}${tags && tags.length ? `&tags=${tags.join('&tags=')}` : ''}`;
    const token = await SecureStore.getItemAsync('jwt');
    console.log('token pulled from store: ', token);
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
  
    const data = await response.json();
  
    return data;
  };