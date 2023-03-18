import * as SecureStore from 'expo-secure-store';

//this function fetches the tags for the filter bar on the FeedScreen.
//it fetches all tags (to a limit of 100) from the database.
//these are passed to the TagBar component, which render the tags as pressables.

//if the app were expanded and more tags were added, it would be necessary to implement a limit on what can appear in the tag bar.
//this could be done by fetching the most popular tags (sorted by how many times they appear).

export const fetchFilterBarTags = async () => {
    const token = await SecureStore.getItemAsync('jwt');
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/tags?page=1&limit=100`, {
      headers: {Authorization: `Bearer ${token}`}
    });
      const data = await response.json();
      return data;
}