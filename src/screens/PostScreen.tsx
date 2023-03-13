import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { ReactComponentElement, useLayoutEffect } from 'react'
import { PostScreenProps } from '../../types/navigation'
import PostComponent from '../components/PostComponent'
import CommentComponent from '../components/CommentComponent'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Pressable } from 'react-native'


const PostScreen: React.FC<PostScreenProps> = ({ navigation, route }) => {
  const { post } = route.params
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Post`,
    })
  });
  return (
    <View style={styles.container}>
      <PostComponent post={post} />
      <CommentComponent post={post} />
      <View style={styles.footer}>
        <TextInput
          style={styles.commentForm}
          placeholder='Make A Comment'>
        </TextInput>
        <Pressable style={styles.submitButton} onPress={() => console.log('write a post comment function here')}>
          <MaterialCommunityIcons name="arrow-up-box" size={55} color="#6537FF" />
        </Pressable>
        
      </View>
    </View>
  )
}

export default PostScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    bottom: 0,
    height: 60,
    width: '100%',
    borderTopColor: '#BFBFBF',
    borderTopWidth: 2,
  },
  commentForm: {
    backgroundColor: '#E8E8E8',
    width: '85%',
    height: 40,
    paddingHorizontal: 10,
    fontFamily: 'Syne-Bold',
  },
  submitButton: {
    
  },
})