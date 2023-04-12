import styled from "@emotion/native";
import React from "react";

import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  useColorScheme,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { authService, dbService } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { GREEN_COLOR, YELLOW_COLOR } from "../color";
import { signOut } from "firebase/auth";
import Vote from "../components/Vote";
import CommentModal from "../components/CommentModal";

function TestComment({ navigation: { navigate, reset, setOptions } }) {
  const [comments, setComments] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleAdding = async () => {
    setIsOpenModal(true);
  };

  const goToComment = (theComment) => {
    navigate("Stacks", {
      screen: "Comment",
      params: { comment: theComment, from: "My" },
    });
  };

  useFocusEffect(
    useCallback(() => {
      const q = query(
        collection(dbService, "comment"),
        orderBy("createdAt", "desc")
      );
      const unsubcribe = onSnapshot(q, (snapshot) => {
        const newComments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(newComments);
      });
      return unsubcribe;
    }, [])
  );

  return (
    <>
      <FlatList
        contentContainerStyle={{ padding: 20 }}
        data={comments}
        ItemSeparatorComponent={VSeperator}
        ListHeaderComponent={<ListTitle>My Comments</ListTitle>}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CommentWrapper onPress={() => goToComment(item)}>
            <Title>{item.title}</Title>
            <Contents numberOfLines={2}>{item.contents}</Contents>
            <Row>
              <Vote vote_average={item.rating} />
              <CommentAt>
                {new Date(item.createdAt).toLocaleDateString("kr")}
              </CommentAt>
            </Row>
          </CommentWrapper>
        )}
      />

      <AddComment onPress={handleAdding}>
        <TempText>Add Comment</TempText>
      </AddComment>

      <CommentModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </>
  );
}

export default TestComment;

const AddComment = styled.TouchableOpacity`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${(props) => props.theme.color.title};
  align-self: center;
  width: 40%;
`;

const TempText = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.color.title};
  text-align: center;
`;

const Container = styled.ScrollView`
  padding: 20px;
`;

const ListTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.color.listTitle};
  margin-bottom: 20px;
`;
const CommentWrapper = styled.TouchableOpacity`
  padding: 10px 15px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${(props) => props.theme.color.title};
`;
const Title = styled.Text`
  color: ${(props) => props.theme.color.title};
  font-size: 25px;
`;

const Contents = styled(Title)`
  margin: 10px 0;
  height: 50px;
  font-size: 20px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const CommentAt = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.color.title};
`;
const VSeperator = styled.View`
  height: 10px;
`;
