//@ts-ignore
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

interface ImgBoxProps {
  mainImg: string;
}

const MainCarousel = () => {
  const mainImg01 = './image/mainVisual/mainVisual01.jpg';
  const mainImg02 = './image/mainVisual/mainVisual02.jpg';
  const mainImg03 = './image/mainVisual/mainVisual03.jpg';

  return (
    <Wrapper>
      {/* 라이브러리 컴포넌트를 사용 */}
      <StyledSlider {...settings}>
        <CarouselBox>
          <ImgBox mainImg={mainImg01}>
            <Script>
              <Title>천정문</Title>
              <Generation>백제시대</Generation>
              <Contents>사비성을 재현해놓은 사비궁의 중남문</Contents>
            </Script>
          </ImgBox>
        </CarouselBox>
        <CarouselBox>
          <ImgBox mainImg={mainImg02}>
            <Script>
              <Title>경복궁 경회루</Title>
              <Generation>조선시대</Generation>
              <Contents>
                1985년 국보로 지정되었다.정면 7칸, 측면 5칸의 중층(重層)
                팔작지붕건물.
                <br />
                근정전 서북쪽에 있는 방형 연못 안에 세운 이 건물은 나라의 경사가
                있을 때 연회를 베풀기 위한 곳이었다.
              </Contents>
            </Script>
          </ImgBox>
        </CarouselBox>
        <CarouselBox>
          <ImgBox mainImg={mainImg03}>
            <Script>
              <Title>사물놀이</Title>
              <Generation>1978 년 ~</Generation>
              <Contents>
                사물놀이는 사물(四物), 꽹과리 · 장구 · 북 · 징의 네 가지 악기
                놀이[연주]라는 의미이다.
                <br />
                사물놀이는 야외에서 이루어지는 대규모 구성의 풍물놀이를 1978년
                무대예술로 각색한 것이다.
              </Contents>
            </Script>
          </ImgBox>
        </CarouselBox>
      </StyledSlider>
    </Wrapper>
  );
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2500,
  slideToShow: 1,
  slidesToScroll: 1,
  centerPadding: '0px',
  centerMode: true,
  arrows: false,
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 1920px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  max-width: 1920px;
  height: 550px;
  .slick-dots {
    bottom: 20px;
  }
  .slick-dots li button::before {
    color: white;
  }
`;

const CarouselBox = styled.div`
  width: 100%;
  display: flex;
`;

const ImgBox = styled.div<ImgBoxProps>`
  width: 100%;
  height: 550px;
  margin: 0 auto;
  background-image: ${(props) => `url(${props.mainImg})`};
`;

const Script = styled.div`
  width: 1440px;
  margin: 0 auto;
  padding-top: 120px;
`;

const Title = styled.p`
  font-size: 48px;
  color: white;
  margin-bottom: 16px;
  font-weight: 600;
`;

const Generation = styled.p`
  color: #eee;
  font-size: 32px;
  margin-bottom: 40px;
`;

const Contents = styled.p`
  color: #ddd;
  font-size: 24px;
  line-height: 32px;
`;

export default MainCarousel;
