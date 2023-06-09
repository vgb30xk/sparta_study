import { useState } from "react";
import styled from "@emotion/native";
import { addDoc, collection } from "firebase/firestore";
import { Modal } from "react-native";
import { AirbnbRating, Rating } from "react-native-ratings";
import { authService, dbService } from "../firebase";

export default function CommentModal({ postId, isOpenModal, setIsOpenModal }) {
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [ratings, setRatings] = useState(0);
  const getRatings = (rating) => {
    setRatings(rating);
  };
  const addComment = async () => {
    await addDoc(collection(dbService, "comment"), {
      title: modalTitle,
      contents: modalContent,
      createdAt: Date.now(),
      rating: ratings,
      userId: authService.currentUser?.uid,
      postId: postId,
    });
    setIsOpenModal(false);
    setModalTitle("");
    setModalContent("");
    setRatings(0);
  };

  return (
    <Modal visible={isOpenModal} transparent animationType="fade">
      <Backdrop>
        <Dialog>
          <InputWrapper>
            <ModalTitle>평가</ModalTitle>
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
          </InputWrapper>
          <Row style={{ justifyContent: "space-between" }}>
            <ModalBtn onPress={() => setIsOpenModal(false)} title="Cancel" />
            <ModalBtn
              disabled={!ratings || !modalContent}
              onPress={addComment}
              title="Add Comment"
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
const ModalBtn = styled.Button``;
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
  font-size: 20px;
  font-weight: 600;
  color: black;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const Row = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 10px;
`;
