import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
//@ts-ignore
import { Fade } from 'react-reveal';
import ReviewList from '../components/ReviewList';

import { useQuery } from 'react-query';
import { readReview } from '../api';
import MapKakao from '../components/MapKakao';

const Detail = () => {
  const location = useLocation();
  console.log(location);
  const detailData = location.state;

  // 리뷰 가져오기
  const { data: reviewData, isLoading: reviewLoading } = useQuery(
    'reviews',
    readReview
  );

  const { id, title, name, long, lat, content, gene, date, position, image } =
    detailData;

  const [toggle, setToggle] = useState(false);

  // 스크롤을 0, 0으로 맞춤 (맨 위)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let itemData: reviewType[];
  if (reviewData === undefined) {
    itemData = [];
  } else {
    itemData = reviewData?.filter((data: reviewType) => data.cultureId === id);
  }

  if (reviewLoading) {
    return <div>리뷰 로딩중...</div>;
  }
  return (
    <Container>
      <Acontainer>
        <Fade duration={1000} delay={200}>
          <A1container>
            {image ? (
              <ImgBox src={image} alt="img" />
            ) : (
              <ImgBox src={'../../image/no-image.png'} alt="img" />
            )}
          </A1container>
        </Fade>

        <A2container>
          <Fade duration={1000} delay={500}>
            <Name>{name === ('' || null) ? '없음' : name}</Name>
          </Fade>
          <Fade duration={1000} delay={800}>
            <SubName>종목 : {title === ('' || null) ? '없음' : title}</SubName>
            <SubName>등록일 : {date === undefined ? '미상' : date}</SubName>
            <SubName>시대 : {gene === '' ? '미상' : gene}</SubName>
            <SubName>소재지 : {position === '' ? '없음' : position}</SubName>
          </Fade>
        </A2container>
      </Acontainer>

      <Fade duration={1000} delay={1100}>
        <Bcontainer>내용 : {content === '' ? '없음' : content}</Bcontainer>
      </Fade>

      <Fade duration={1000} delay={1400}>
        <Ccontainer>
          <MapKakao lat={lat} lng={long} title={name} />
        </Ccontainer>
      </Fade>

      <ReviewListWrap>
        <ReviewButton
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          {toggle ? '리뷰닫기' : '리뷰보기'}
        </ReviewButton>
        {toggle ? <ReviewList itemData={itemData} cultureId={id} /> : <></>}
      </ReviewListWrap>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  width: 1440px;
  margin: 30px auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Acontainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 1440px;
`;

const A1container = styled.div``;

const ImgBox = styled.img`
  height: 400px;
  width: 400px;
  border-radius: 20px;
`;

const A2container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 50px;
`;

const Name = styled.div`
  text-align: center;
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 50px;
`;
const SubName = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 5px;
  font-size: 24px;
  line-height: 30px;
`;

const Bcontainer = styled.div`
  margin-top: 50px;
  font-size: 18px;
  line-height: 28px;
`;
const Ccontainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 1440px;
`;
const ReviewListWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ReviewButton = styled.button`
  width: 100px;
  height: 30px;
  margin: 20px;
  border-radius: 15px;
  border: none;
  background-color: black;
  transition: 0.7s;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #ffffff;
    color: black;
    border: 1px solid black;
    transition: 0.7s;
  }
`;
