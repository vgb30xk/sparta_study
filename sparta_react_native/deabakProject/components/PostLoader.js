import styled from '@emotion/native';
import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PostLoader({ posts, category, navigate }) {
  const goToPost = post => {
    navigate('Stacks', {
      screen: 'Post',
      params: { post: post, from: 'My' },
    });
  };
  return (
    <>
      {posts
        .filter(
          cate => cate.category === category && cate.category !== undefined
        )
        .map((post, key) => {
          return (
            <SC key={key}>
              <Container>
                <ListBox key={key}>
                  <ListButton onPress={() => goToPost(post)}>
                    <ProfileBox>
                      <Text>
                        <Ionicons
                          name="person-circle-outline"
                          size={60}
                          color="grey"
                        />
                      </Text>
                    </ProfileBox>
                    <InputContainer>
                      <ListCardTitle>
                        <TitleText numberOfLines={1} ellipsizeMode="tail">
                          {post.title}
                        </TitleText>
                      </ListCardTitle>
                      <ListCardContent>
                        <ContentText numberOfLines={2} ellipsizeMode="tail">
                          {post.contents}
                        </ContentText>
                      </ListCardContent>
                      <ListCardDate>
                        <Text>
                          &#91;{category}
                          &#93;
                          {new Date(post.createdAt).toLocaleDateString('kr')}
                        </Text>
                      </ListCardDate>
                    </InputContainer>
                  </ListButton>
                </ListBox>
              </Container>
            </SC>
          );
        })}
    </>
  );
}

export const SC = styled.ScrollView`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const ListBox = styled.View`
  background-color: white;
  border: 1px solid gray;
  border-radius: 15px;
  height: 110px;
  padding: 10px;
  width: 85%;
  margin-top: 20px;
`;

export const ListButton = styled.TouchableOpacity`
  height: 80px;
  flex-direction: row;
`;

export const ListCardTitle = styled.View`
  /* background-color: lightgray; */
  height: 28px;
  /* background-color: red; */
`;

export const ListCardContent = styled.View`
  /* background-color: blue; */
  height: 45px;
`;

export const ListCardDate = styled.View`
  /* background-color: green; */
  height: 20px;
  align-items: flex-end;
`;

export const TitleText = styled.Text`
  font-size: 20px;
  color: black;
`;

export const ContentText = styled.Text`
  font-size: 14px;
  color: black;
`;

export const ProfileBox = styled.View`
  /* background-color: gray; */
  height: 80px;
  width: 60px;
  margin-right: 5px;
`;

const InputContainer = styled.View`
  /* background-color: white; */
  height: 80px;
  width: 250px;
  flex-direction: column;
`;

const CategoryBox = styled.View`
  background-color: red;
`;
