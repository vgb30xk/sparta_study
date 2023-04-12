import styled from "@emotion/native";
import React from "react";
import { TouchableOpacity, Text, Alert, View } from "react-native";
import { useMutation } from "react-query";
import { deleteComment } from "../api";

const CommentCards = ({ comment, navigate }) => {
  const { isLoading: isLoadingDeleting, mutate: removeComment } = useMutation(
    ["deleteComment", comment.id],
    (body) => deleteComment(body),
    {
      onSuccess: () => {
        console.log("삭제성공");
      },
      onError: (err) => {
        console.log("err in delete:", err);
      },
    }
  );

  const onDeleteComment = async (id) => {
    Alert.alert("댓글 삭제", "정말 현재 댓글을 삭제하시겠습니까?", [
      { text: "cancel", style: "destructive" },
      {
        text: "OK. Delete it.",
        onPress: async () => {
          try {
            // await deleteDoc(doc(dbService, "reviews", review.id));
            await removeComment(id);
            alert("삭제가 완료되었습니다.");
          } catch (err) {
            console.log("err:", err);
          }
        },
      },
    ]);
  };

  // const goToDetail = (comment) => {
  //   navigate("Stacks", {
  //     screen: "CommentEdit",
  //     params: { comment: comment, from: "My" },
  //   });
  // };

  if (isLoadingDeleting) {
    return <Text>조금만 기다려주세요!</Text>;
  }

  return (
    <>
      <UserCommentsView key={comment.id}>
        {/* TouchableOpacity에 onPress로 oToDetail  */}
        <TouchableOpacity>
          <View>
            <TextContainer>
              <StaticText>제목</StaticText>
              <VariableText numberOfLines={1} ellipsizeMode="tail">
                {comment.title}
              </VariableText>
            </TextContainer>
            <TextContainer>
              <StaticText>내용</StaticText>
              <VariableText numberOfLines={1} ellipsizeMode="tail">
                {comment.contents}
              </VariableText>
            </TextContainer>
            <TextContainer>
              <StaticText>작성일</StaticText>
              <VariableText numberOfLines={1} ellipsizeMode="tail">
                {new Date(comment.createdAt).toLocaleDateString("kr")}
              </VariableText>
            </TextContainer>
            <DeleteButtonBoxView>
              <TouchableOpacity onPress={() => onDeleteComment(comment.id)}>
                <Text style={{ fontSize: 18, color: "white" }}>삭제</Text>
              </TouchableOpacity>
            </DeleteButtonBoxView>
          </View>
        </TouchableOpacity>
      </UserCommentsView>
    </>
  );
};

export default CommentCards;

const UserCommentsView = styled.View`
  flex: 1;
  flex-direction: column;
  border-radius: 10px;
  border-width: 1px;
  border-color: #3b71f3;
  background-color: #dbe7ff;

  height: 130px;
  width: 300px;
  padding: 10px;
  margin-bottom: 10px;
`;

const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 240px;
`;

const DeleteButtonBoxView = styled.View`
  align-items: center;
  border-width: 1px;
  border-radius: 5px;
  border-color: #dbe7ff;
  background-color: #3b71f3;

  width: 25%;
  height: 25%;

  margin-top: 7px;
`;

const StaticText = styled.Text`
  font-size: 18px;
  margin-right: 7px;
`;

const VariableText = styled.Text`
  font-size: 14px;
`;
