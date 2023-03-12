import * as SecureStore from 'expo-secure-store';

export const fetchFilterBarTags = async () => {
      const token = await SecureStore.getItemAsync('jwt');
      const response = await fetch(
        'http://3.26.31.47:3000/tags?page=1&limit=100', {
        headers: {Authorization: `Bearer ${token}`}
      });
        const data = await response.json();
        return data;
  }