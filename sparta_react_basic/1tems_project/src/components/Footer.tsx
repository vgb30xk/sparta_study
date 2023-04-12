import { useQuery } from 'react-query';
import styled from 'styled-components';
import { totalVisit } from '../api';

export default function Footer() {
  // 총 방문자 수
  const { data: visitData } = useQuery('visitData', totalVisit);
  return (
    <FooterBox>
      <ContentBox>
        <div>Culture.map() | Soon`s Children | 내일배움캠프</div>
        <div>총 방문자 수 : {visitData?.data()?.count}명</div>
      </ContentBox>
    </FooterBox>
  );
}

const FooterBox = styled.div`
  font-family: 'Gugi', cursive;
  background-color: #242c44;
  color: white;
  height: 90px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ContentBox = styled.div`
  width: 1440px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
