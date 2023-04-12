import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styled from '@emotion/native';
import { StyleSheet } from 'react-native';

export default function Main({ navigation: { navigate } }) {
  return (
    <Container>
      <MainLeftContainer>
        <MainButton
          onPress={() => {
            // setCategory('기술');
            navigate('Stacks', {
              screen: 'PostList',
              params: { category: '기술' },
            });
          }}
        >
          <Image
            source={require('../assets/images/technology.png')}
            style={styles.image}
          />
          <Titleposition>기술</Titleposition>
        </MainButton>
        <MainButton
          onPress={() => {
            // setCategory('교육');
            navigate('Stacks', {
              screen: 'PostList',
              params: { category: '교육' },
            });
          }}
        >
          <Image
            source={require('../assets/images/education.png')}
            style={styles.image}
          />
          <Titleposition>교육</Titleposition>
        </MainButton>
        <MainButton
          onPress={() => {
            // setCategory('보건');
            navigate('Stacks', {
              screen: 'PostList',
              params: { category: '보건' },
            });
          }}
        >
          <Image
            source={require('../assets/images/health.png')}
            style={styles.image}
          />
          <Titleposition>보건</Titleposition>
        </MainButton>
        <MainButton
          onPress={() => {
            // setCategory('문화');
            navigate('Stacks', {
              screen: 'PostList',
              params: { category: '문화' },
            });
          }}
        >
          <Image
            source={require('../assets/images/culture.png')}
            style={styles.image}
          />
          <Titleposition>문화</Titleposition>
        </MainButton>
      </MainLeftContainer>
      <MainRightContainer>
        <MainButton
          onPress={() => {
            // setCategory('환경');
            navigate('Stacks', {
              screen: 'PostList',
              params: { category: '환경' },
            });
          }}
        >
          <Image
            source={require('../assets/images/environment.png')}
            style={styles.image}
          />
          <Titleposition>환경</Titleposition>
        </MainButton>
        <MainButton
          onPress={() => {
            // setCategory('교통');
            navigate('Stacks', {
              screen: 'PostList',
              params: { category: '교통' },
            });
          }}
        >
          <Image
            source={require('../assets/images/traffic.png')}
            style={styles.image}
          />
          <Titleposition>교통</Titleposition>
        </MainButton>
        <MainButton
          onPress={() => {
            // setCategory('정치');
            navigate('Stacks', {
              screen: 'PostList',
              params: { category: '정치' },
            });
          }}
        >
          <Image
            source={require('../assets/images/politics.png')}
            style={styles.image}
          />
          <Titleposition>정치</Titleposition>
        </MainButton>
        {/* <MainButton
          onPress={() => {
            // setCategory('경제');
            navigate('Stacks', {
              screen: 'PostList',
              params: { category: '경제' },
            });
          }}
        >
          <Title>경제</Title>
        </MainButton> */}
        <MainButton
          onPress={() => {
            // setCategory('경제');
            navigate('Stacks', {
              screen: 'PostList',
              params: { category: 'etc' },
            });
          }}
        >
          <Image
            source={require('../assets/images/etc.png')}
            style={styles.image}
          />
          <Titleposition>etc</Titleposition>
        </MainButton>
      </MainRightContainer>
    </Container>
  );
}

export const Title = styled.Text`
  font-size: 30px;
`;

export const Container = styled.View`
  flex: 1;
  /* background-color: lightgray; */
  align-content: space-between;
  flex-direction: row;
  /* background-color: white; */
`;

export const MainButton = styled.TouchableOpacity`
  background-color: lightgray;
  width: 90px;
  height: 90px;
  align-items: center;
  justify-content: center;
  border-radius: 35px;
`;

export const MainLeftContainer = styled.View`
  display: flex;

  align-items: center;
  padding: 70px;
  width: 50%;
  height: 100%;
  /* background-color: red; */
  justify-content: space-between;
`;

export const MainRightContainer = styled.View`
  justify-content: space-between;
  /* background-color: green; */
  align-items: center;
  flex: 1;
  width: 50%;
  height: 100%;
  padding: 70px;
`;

export const Titleposition = styled.Text`
  position: absolute;
  top: 90px;
  font-size: 18px;
`;

const styles = StyleSheet.create({
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 90,
    // resizeMode: 'contain',
    resizeMode: 'cover',
    borderRadius: 30,
  },
});
