import { useState } from "react";
import styled from "@emotion/native";
import { collection, doc, updateDoc } from "firebase/firestore";
import { Modal, Alert, Text } from "react-native";
import { authService, dbService } from "../firebase";
import { AirbnbRating, Rating } from "react-native-ratings";
import { useMutation } from "react-query";
import { editPost } from "../api";

export default function PostModifyModal({
  id,
  isOpenModifyModal,
  setIsOpenModifyModal,
  navigation,
}) {
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalUrl, setModalUrl] = useState("");
  const [ratings, setRatings] = useState(0);
  const getRatings = (rating) => {
    setRatings(rating);
  };
  const { isLoading: isLoadingEditing, mutate: revisePost } = useMutation(
    ["editPost", id],
    (body) => editPost(body),
    {
      onSuccess: () => {
        console.log("수정성공");
      },
      onError: (err) => {
        console.log("err in edit:", err);
      },
    }
  );
  const onEditPost = async (id) => {
    if (!ratings && !modalTitle && !modalContent && !modalUrl) {
      // 입력값 3개 중 아무것도 입력없으면 그대로 원상복구
      alert("수정한 부분이 없습니다.");
      return;
    }
    // 입력값이 3개 중 하나라도 있으면 해당값만 patch할 수 있도록 객체 구성
    let editingObj = {};
    if (ratings) {
      Object.assign(editingObj, { rating: ratings });
    }
    if (modalTitle) {
      Object.assign(editingObj, { title: modalTitle });
    }
    if (modalContent) {
      Object.assign(editingObj, { contents: modalContent });
    }
    if (modalUrl) {
      Object.assign(editingObj, { contents: modalUrl });
    }
    Alert.alert(
      "게시글 수정",
      "이대로 게시글 수정하시겠습니까? 입력한 부분만 수정됩니다.",
      [
        { text: "Cancel", style: "destructive" },
        {
          text: "OK. Edit it",
          onPress: async () => {
            try {
              // await updateDoc(doc(dbService, "reviews", review.id), editingObj);
              console.log("성공");
              await revisePost({ postId: id, editingObj });
              setModalContent("");
              setModalTitle("");
              setModalUrl("");
              setRatings(0);
              setIsOpenModifyModal(false);

              navigation.reset({
                routes: [
                  {
                    name: "Post",
                    params: {
                      post: {
                        title: modalTitle,
                        contents: modalContent,
                        url: modalUrl,
                        ratings: ratings,
                      },
                    },
                  },
                ],
              });
            } catch (err) {
              console.log("err:", err);
            }
          },
        },
      ]
    );
  };

  if (isLoadingEditing) {
    return <Text>로딩 중입니다.</Text>;
  }

  return (
    <Modal visible={isOpenModifyModal} transparent animationType="fade">
      <Backdrop>
        <Dialog>
          <ModalTitle>별점</ModalTitle>
          <InputWrapper>
            <AirbnbRating
              onFinishRating={getRatings}
              ratingCount={5}
              size={20}
            />
            <ModalTitle>제목</ModalTitle>
            <TitleInput
              value={modalTitle}
              onChangeText={(text) => setModalTitle(text)}
            />
            <ModalTitle>내용</ModalTitle>
            <ContentInput
              textAlignVertical="top"
              value={modalContent}
              onChangeText={(text) => setModalContent(text)}
              multiline
              maxLength={300}
            />
            <ModalTitle>Url</ModalTitle>
            <UrlInput
              value={modalUrl}
              onChangeText={(text) => setModalUrl(text)}
            />
          </InputWrapper>
          <Row style={{ justifyContent: "space-between" }}>
            <ModalBtn
              onPress={() => setIsOpenModifyModal(false)}
              title="취소"
            />
            <ModalBtn
              // disabled={!ratings || !modalUrl || !modalContent}
              onPress={() => {
                onEditPost(id);
              }}
              title="수정 완료"
            />
          </Row>
        </Dialog>
      </Backdrop>
    </Modal>
  );
}

const TitleInput = styled.TextInput`
  padding: 10px;
  background-color: white;
  border-radius: 5px;
`;
const ContentInput = styled(TitleInput)`
  min-height: 100px;
`;
const UrlInput = styled.TextInput`
  padding: 10px;
  background-color: white;
  border-radius: 5px;
`;
const ModalBtn = styled.Button`
  color: black;
`;
const InputWrapper = styled.View``;
const AddButton = styled.Button``;

const Backdrop = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Dialog = styled.KeyboardAvoidingView`
  background-color: ${(props) => props.theme.color.modalBg};
  width: 80%;
  height: 70%;
  padding: 20px;
  justify-content: space-between;
  border-radius: 5px;
`;
const ModalTitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: black;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const Row = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 10px;
`;
