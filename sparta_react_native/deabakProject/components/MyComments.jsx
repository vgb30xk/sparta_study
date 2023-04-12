import React, { useState, useCallback } from 'react';
import styled from '@emotion/native';
import {
  onSnapshot,
  query,
  collection,
  orderBy,
  where,
} from 'firebase/firestore';
import { Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { authService, dbService } from '../firebase';
import CommentCards from './CommentCards';

const MyComments = ({ navigate }) => {
  const [comments, setComments] = useState([]);

  console.log('지금 아이디는?', authService.currentUser?.uid);

  useFocusEffect(
    useCallback(() => {
      // 현재 로그인 사용자의 comment만 나오도록 구현
      const q = query(
        collection(dbService, 'comment'),
        orderBy('createdAt', 'desc'),
        where(
          'userId',
          '==',
          !authService.currentUser || authService.currentUser?.uid
        )
      );

      const unsubcribe = onSnapshot(q, snapshot => {
        const newComments = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log('코멘트는? ', newComments);

        setComments(newComments);
      });

      return unsubcribe;
    }, [])
  );

  return (
    <>
      {comments.map(comment => {
        return (
          // delete 기능 구현
          // <UserCommentView key={comment.id}>
          //   <Text>{comment.title}</Text>
          //   <Text>{comment.contents}</Text>
          //   <TouchableOpacity>
          //     <Text>삭제</Text>
          //   </TouchableOpacity>
          // </UserCommentView>
          <CommentCards
            comment={comment}
            key={comment.id}
            navigate={navigate}
          />
        );
      })}
    </>
  );
};

export default MyComments;
