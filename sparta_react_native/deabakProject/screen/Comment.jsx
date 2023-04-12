import { useEffect } from 'react';
import styled from '@emotion/native';
import { useColorScheme, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { GREEN_COLOR, YELLOW_COLOR, BLUE_COLOR } from '../color';
import { authService } from '../firebase';
import { useFocusEffect } from '@react-navigation/native';

export default function Comment({
  navigation,
  route: {
    params: { comment, from },
  },
}) {
  const isDark = useColorScheme() === 'dark';

  const onEdit = () => {
    navigation.navigate('Commentedit', { comment, from });
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: null,
      headerRight: () => {
        return (
          <TouchableOpacity onPress={onEdit}>
            <AntDesign
              name="edit"
              size={24}
              color={isDark ? YELLOW_COLOR : BLUE_COLOR}
            />
          </TouchableOpacity>
        );
      },
    });
  }, []);

  return (
    <Container>
      <SectionTitle>평점</SectionTitle>

      <Ratings>⭐️{comment.rating}</Ratings>

      <SectionTitle>제목</SectionTitle>

      <Title>{comment.title}</Title>

      <SectionTitle>내용</SectionTitle>

      <Content>{comment.contents}</Content>
    </Container>
  );
}

export const Container = styled.ScrollView`
  padding: 20px;
`;

export const SectionTitle = styled.Text`
  font-size: 30px;
  font-weight: 600;
  color: ${props => props.theme.color.title};
  margin-bottom: 15px;
`;

export const Ratings = styled.Text`
  color: ${props => props.theme.color.overview};
  font-size: 20px;
  margin-bottom: 20px;
`;
export const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.theme.color.overview};
  margin-bottom: 20px;
`;
export const Content = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.theme.color.overview};
  line-height: 30px;
`;
