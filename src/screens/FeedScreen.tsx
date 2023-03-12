import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PostInterface } from '../../types/post';
import PostComponent from '../components/PostComponent';
import { FeedScreenProps } from '../../types/navigation';
import SearchBar from '../components/SearchBar';
import TagBar from '../components/TagBar';
import { fetchPosts } from '../api/getPosts';
import { fetchFilterBarTags } from '../api/getTags';

const FeedScreen: React.FC<FeedScreenProps> = ({ navigation }) => {
  const [loadedPosts, setLoadedPosts] = useState<Array<PostInterface>>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<{ name: string }[]>([]);
  const [selectedTags, setSelectedTags]= useState<string[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Forum',
    })
  })

  useEffect(() => {
    setLoading(true);
    loadPosts()
    loadFilterBarTags();
  }, []);

  useEffect(() => {
    setPageNumber(1);
    loadPosts();
  }, [selectedTags]);

  
  const loadFilterBarTags = async () => {
    try {
    const data = await fetchFilterBarTags();
      setTags(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  //call fetchPosts with the selectedTags being passed, function will append the tags to the url and fetch only those posts
  //instead of fetching all posts and filtering them
  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await fetchPosts(pageNumber, 10, selectedTags);
      setTotalPosts(data.total);
      setLoadedPosts(pageNumber === 1 ? data.data : (prevPosts) => [...prevPosts, ...data.data]);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderPost = ({ item }: { item: PostInterface }) => {
    if (selectedTags.length > 0) {
      const hasAllSelectedTags = selectedTags.every((selectedTag) =>
        item.tags.some((tag) => tag.name === selectedTag)
      );
      if (!hasAllSelectedTags) {
        return null;
      }
    }
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Post", {post: item})}>
        <PostComponent post={item} selectedTags={selectedTags} />
      </TouchableOpacity>
    );
  };

  const handleTagSelect = (tags: string[]) => {
    console.log(tags)
    setSelectedTags(tags);
    setPageNumber(1);
  };

  
  // handles loading more posts when user scrolls to bottom of list
  // checks the total number of posts returned in data, increments page number and loads next <=10 posts
  const handleLoadMore = () => {
    const totalPages = (totalPosts / 10);
    console.log('Page:', pageNumber, 'Total Pages:', totalPages);
    if (pageNumber < totalPages) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

    useEffect(() => {
    if (pageNumber > 1) {
      loadPosts();
    }
  }, [pageNumber]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar onSearch={()=>{}} />
        <TagBar tags={tags} onTagSelect={handleTagSelect} selectedTags={selectedTags}/>
      </View>
      <SafeAreaView style={styles.postContainer}>
      {loading ? (
        <ActivityIndicator style={styles.loadingSpinner} size="large" />
      ) : (
        <FlatList
          data={loadedPosts}
          renderItem={renderPost}
          keyExtractor={(post) => String(post.id)}
          ListEmptyComponent={() => (
            <View>
              <Text>{'No posts found.'}</Text>
            </View>
          )}
          key={selectedTags.join()}
          onEndReached={handleLoadMore}
        />
  )}
      </SafeAreaView>
    </View>
    
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postContainer: {
    flex: 1,
  },
  loadingSpinner: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FeedScreen;