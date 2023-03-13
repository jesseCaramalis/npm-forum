import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { PostInterface } from '../../types/post'
import { CommentInterface } from '../../types/comment'
import * as SecureStore from 'expo-secure-store'

// this component is used to render all comments and replies to comments for a specific post

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

  const fetchComments = async (commentId?: number) => {
    try {
      const token = await SecureStore.getItemAsync('jwt');
      // fetches top level comments if no commentId is passed, otherwise fetches replies
      // need to abstract this function to api folder, currently causing bug with reply keys not being unique.
      const url = `http://3.26.31.47:3000/posts/${post.id}/comments${commentId ? '/' + commentId : ''}?page=1&limit=100`
      console.log('fetching comments from url', url);
      const response = await fetch(url, {
          headers: {Authorization: `Bearer ${token}`}
        }
      );
      const data = await response.json();

      // Updating comments state with fetched comments
      // callback that receives previous comments. If a commentId is passed, it means we are fetching replies for a specific comment,
      // so we find the parent comment, create a new parent comment object that has the comments property containing the reply ID's.
      // it then creates a new array of comments that includes the updated parent comment, the replies, and the remaining comments.
      
      setComments((prevComments) => {

        if (commentId) {
      //finds parent comment in state
          const parentCommentIndex = prevComments.findIndex((c) => c.id === commentId);
      //creates new parent comment object with reply ID's
          const updatedParentComment = {
            ...prevComments[parentCommentIndex],
            comments: data.data.map((d: { id: any }) => d.id),
          };
      // console.log('updated parent comment', updatedParentComment);
      // Combining updated parent comment, replies, and remaining comments
          const updatedComments = [
            ...prevComments.slice(0, parentCommentIndex),
            updatedParentComment,
            ...prevComments.slice(parentCommentIndex + 1),
            ...data.data,
          ];
          return updatedComments;
        } else {
      // if no commentId, we are fetching top level comments, so we just return the fetched comments
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
  console.log(comments)
  // This function recursively renders comments and replies, with the level parameter indicating how many levels the comment is nested/indented
  const renderComment = (comment: CommentInterface, level = 0) => {
    // replies is an array of comments that are replies to the current comment.
    const replies = comment.comments?.map((replyId) => comments.find((c) => c.id === replyId));
    return (
      // if the comment has replies, we map over them and recursively render the replies with renderComment, indenting further each time with marginLeft
      <View key={comment.id} style={{ marginLeft: level * 10 }}>
        <Comment comment={comment} level={level} />
        {replies &&
          replies.map((reply) => ( 
            <View style={{ marginLeft: 10 }} key={reply?.id}>
              {reply && renderComment(reply, level + 1)}
            </View>
          ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loadingSpinner} color="#6537FF" size="large" />
      ) : (
        <FlatList
          data={comments}
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