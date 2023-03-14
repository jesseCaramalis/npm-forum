import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { PostInterface } from '../../types/post'
import { CommentInterface } from '../../types/comment'
import * as SecureStore from 'expo-secure-store'

// this component is used to render all comments and replies to comments for a specific post
// this one works
interface CommentComponentProps {
  post: PostInterface
}
const CommentComponent: React.FC<CommentComponentProps> = ({ post }) => {
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchComments();
  }, []);

    // fetchComments gets top level comments if no commentId is passed, otherwise recursively fetches replies.
    // update comments state with fetched comments, checking for replies and adding them to state.
    // the output of fetchComments should set the comments state to be an array of all comments and replies for a post.

    const fetchComments = async (commentId?: number) => {
      try {
        const token = await SecureStore.getItemAsync('jwt');
        const url = `http://3.26.31.47:3000/posts/${post.id}/comments${commentId ? '/' + commentId : ''}?page=1&limit=100`;
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
    
        setComments((prevComments) => {
          if (commentId) {
            return [...prevComments, ...data.data];
          } else {
            // If commentId is not provided, we are fetching top-level comments
            return data.data;
          }
        });
    
        // This code recursively fetches replies for each comment
        for (const comment of data.data) {
          await fetchComments(comment.id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  // This function recursively renders comments and their replies.

  const renderComment = (comment: CommentInterface, level = 0) => {

    const replies = comment.comments?.map((replyId) => comments.find((c) => c.id === replyId));

    return (
      <View key={comment.id} style={{ marginLeft: level * 10 }}>
        <Comment comment={comment} level={level} />
        {replies &&
          replies.map((reply) => (
            <View key={reply?.id}>
              {reply && renderComment(reply, level + 1)}
            </View>
          ))}
      </View>
    );
  };

  // This code allows flatlist to only pass root comments to renderComment, which handles rendering replies
  const rootComments = comments.filter((comment) => !comments.some((c) => c.comments?.includes(comment.id)));

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loadingSpinner} color="#6537FF" size="large" />
      ) : (
        <FlatList
          data={rootComments}
          renderItem={({ item }) => (
            <View>  
              {renderComment(item)}
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
};

export default CommentComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: '#E8E8E8',
    borderTopWidth: 8,
  },
  loadingSpinner: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }

});