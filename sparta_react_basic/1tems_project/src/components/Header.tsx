import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Header() {
  // 메인 페이지로 이동
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <HeaderContents>
        <ProjectName
          onClick={() => {
            navigate('/');
          }}
        >
          Culture.map()
        </ProjectName>
        <TeamName>순이와 아이들</TeamName>
      </HeaderContents>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  font-family: 'Gugi', cursive;
  background-color: #242c44;
  color: white;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const HeaderContents = styled.div`
  width: 1440px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ProjectName = styled.div`
  font-size: 25px;
  cursor: pointer;
`;
const TeamName = styled.div`
  font-size: 15px;
`;
