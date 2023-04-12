import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { authService, dbService } from '../firebase';
import { AntDesign } from '@expo/vector-icons';
import { GREEN_COLOR, YELLOW_COLOR, BLUE_COLOR } from '../color';
import Loader from '../components/Loader';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  getDoc,
  doc,
} from 'firebase/firestore';
import styled from '@emotion/native';
import PostLoader from '../components/PostLoader';
import { Ionicons } from '@expo/vector-icons';

export default function PostList({
  navigation: { goBack, navigate, setOptions },
  route: {
    params: { category },
  },
}) {
  const [posts, setPosts] = useState([]);

  const isDark = useColorScheme() === 'dark';

  // ------------- 상단 header --------------

  useEffect(() => {
    // console.log(category);
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
        >
          <Text style={{ color: isDark ? YELLOW_COLOR : BLUE_COLOR }}>
            <Ionicons name="arrow-back" size={30} color="#3B71F3" />
          </Text>
        </TouchableOpacity>
      ),
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => {
              if (authService.currentUser) {
                navigate('Stacks', { screen: 'PostInput' });
              } else {
                alert('로그인을 먼저 해주세요');
                navigate('Stacks', { screen: 'Login' });
              }
            }}
          >
            <Ionicons name="create" size={30} color="#3B71F3" />
            <Text style={{ color: isDark ? YELLOW_COLOR : BLUE_COLOR }}></Text>
          </TouchableOpacity>
        );
      },
    });
  }, []);

  // ------------- 상단 header --------------

  // ------------- query로 snapshot 이용해서 실시간 read부분 --------------

  useEffect(() => {
    const q = query(
      collection(dbService, 'posts'),
      orderBy('createdAt', 'desc')
    );

    onSnapshot(q, snapshot => {
      const newPosts = snapshot.docs.map(doc => {
        const newPost = {
          id: doc.id,
          ...doc.data(),
        };
        return newPost;
      });
      setPosts(newPosts);
    });

    // ------------- Category 불러오는 부분 ------------

    // const getCategory = async () => {
    //   const snapshot = await getDoc(
    //     doc(dbService, 'category', 'currentCategory')
    //   );
    //   console.log('snapshot.id:', snapshot.id);
    //   console.log('snapshot.data():', snapshot.data());
    //   // setCategory(snapshot.data().category);
    // };
    // getCategory();
  }, []);

  return (
    <Container>
      <PostLoader
        key={posts.id}
        posts={posts}
        navigate={navigate}
        category={category}
      />
    </Container>
  );
}

export const Container = styled.ScrollView`
  flex: 1;
`;
