import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { CommentComponentProps } from '../../types/comment';
import parseDate from '../utils/parseDate';

//this is a component that renders a single comment, used in the CommentComponent which renders all comments.
//it accepts a comment and level prop. The level prop is used to determine if the comment is a reply or not.
//if the comment is a reply, it will be indented and have a line to the left of it.

//TO TEST: replies can only be made to a level of 3, so shouldn't have issue with marginLeft increasing to the point comments are no longer visible/break the layout.

const Comment: React.FC<CommentComponentProps> = ({ comment, level }) => {
  const [day, month, year] = parseDate(comment.createdAt);

  return (
    <View style={[styles.container, level > 0 && styles.replyContainer]}>
      {level > 0 && <View style={styles.line} />}
      <View style={styles.comment}>
        <View style={styles.nameAndDate}>
          <Text style={styles.userName}>
            {comment.user.firstName + ' ' + comment.user.lastName + ' • '}
          </Text>
          <Text style={styles.datePosted}>
            {`${day}-${month}-${year}`}
          </Text>
        </View>
        <Text style={styles.content}>{comment.text}</Text>
        <TextInput style={styles.commentForm} placeholder="Write a reply ..." />
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 5,
    borderTopColor: '#E8E8E8',
    marginBottom: 15,
    padding: 15,
  },
  replyContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#E8E8E8',
    marginLeft: 20,
    paddingLeft: 10,

  },
  line: {
    position: 'absolute',
    top: -16,
    bottom: 0,
    borderLeftWidth: 2,
    borderColor: '#E8E8E8',
  },
  comment: {
    marginLeft: 5,
    gap: 5
  },
  nameAndDate: {
    flexDirection: 'row',
  },
  userName: {
    fontFamily: 'Syne-Bold',
  },
  datePosted: {
    fontFamily: 'Syne-Regular',
    opacity: 0.5,
    fontSize: 14,
  },
  content: {
    fontFamily: 'Syne-Regular',
  },
  commentForm: {
    height: 35,
    paddingLeft: 10,
    backgroundColor: '#E8E8E8',
  },
  titleText: {
    fontSize: 25,
  },
  postTags: {
    flexDirection: 'row',
  },
});
