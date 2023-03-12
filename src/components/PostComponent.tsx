import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { PostComponentProps } from '../../types/post';
import TagBar from './TagBar';
import parseDate from '../utils/parseDate';

const PostComponent: React.FC<PostComponentProps> = ({ post, onPress, selectedTags }) => {
  const { id, createdAt, title, tags, content, comments } = post;
  const { firstName, lastName, email } = post.user;

  const [day, month, year] = parseDate(post.createdAt);

  return (
    <TouchableOpacity delayPressIn={2500} style={styles.container} onPress={onPress}>
      <View style={styles.nameAndDateContainer}>
        <Text style={styles.userName}>{firstName + ' ' + lastName + ' • '}</Text>
        <Text style={styles.datePosted}>{`${day}-${month}-${year}`}</Text>
      </View>
      <Text style={styles.titleText}>{title}</Text>
      <View>
        <TagBar tags={tags} selectedTags={selectedTags} />
      </View>
      <Text style={styles.content}>
        {content.length > 100 ? content.slice(0, 100) + '...' : content}
      </Text>
      <View style={styles.commentCount}>
        <Octicons name="comment" size={24} color="darkgray" />
        <Text>{comments}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderTopColor: '#E8E8E8',
    borderTopWidth: 5,
    gap: 8, 
  },
  nameAndDateContainer: {
    flexDirection: 'row',
  },
  userName: {
    fontFamily: 'Syne-Bold',
    fontSize: 14,
  },
  datePosted: {
    fontFamily: 'Syne-Regular',
    opacity: 0.5,
    fontSize: 14,
  },
  titleText: {
    fontFamily: 'Syne-SemiBold',
    fontSize: 25,
  },
  content: {
    fontFamily: 'Syne-Regular',
    fontSize: 14,
  },
  commentCount: {
    flexDirection: 'row',
    gap: 5,

  }

});

export default PostComponent;