import { PostInterface } from './post';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  Feed: undefined;
  Post: { post: PostInterface };
  CreatePost: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type FeedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Feed'>;
type FeedScreenRouteProp = RouteProp<RootStackParamList, 'Feed'>;

type PostScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Post'>;
type PostScreenRouteProp = RouteProp<RootStackParamList, 'Post'>

type CreatePostScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreatePost'>;
type CreatePostScreenRouteProp = RouteProp<RootStackParamList, 'CreatePost'>;

export type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

export type FeedScreenProps = {
  navigation: FeedScreenNavigationProp;
  route: FeedScreenRouteProp;
};

export type PostScreenProps = {
  navigation: PostScreenNavigationProp;
  route: PostScreenRouteProp;
};

export type CreatePostScreenProps = {
  navigation: CreatePostScreenNavigationProp;
  route: CreatePostScreenRouteProp;
}