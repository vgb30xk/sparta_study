import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getOneData } from '../api';

interface ItemTopWrapProps {
  image: string;
}

const ListItem = ({ item }: { item: ItemType }) => {
  // 하나의 데이터를 가져오는 부분
  const { data, isLoading } = useQuery(
    ['getOneData', item.titleNum, item.careNum, item.cityNum],
    getOneData
  );
  if (isLoading)
    return (
      <ItemContainer>
        <ItemTopWrapUI></ItemTopWrapUI>
      </ItemContainer>
    );
  return (
    <ItemContainer>
      {/* 디테일 페이지로 이동하는데, state에 데이터를 담아서 이동 */}
      <Link
        style={{ textDecoration: 'none' }}
        to={`/Detail/${item.id}`}
        state={{
          id: item.id,
          title: item.title,
          name: item.name,
          image: data[0][0].image,
          date: data[0][0].date,
          gene: data[0][0].gene,
          position: data[0][0].position,
          long: item.long,
          lat: item.lat,
          content: data[0][0].content,
        }}
      >
        <ItemTopWrap image={data[0][0].image}>
          <NameGeneWarp>
            <TopGene>{data[0][0].gene}</TopGene>
            <TopName>{item.name}</TopName>
          </NameGeneWarp>
          <ContentBody>
            <ContentText>
              {data[0][0].content !== '' ? data[0][0].content : '내용없음'}
            </ContentText>
          </ContentBody>
        </ItemTopWrap>
      </Link>
      <div style={{ backgroundColor: '#000' }}></div>
    </ItemContainer>
  );
};

export default ListItem;

const ItemContainer = styled.div`
  display: flex;
  width: 460px;
  height: 700px;
  margin: 20px 0;
`;
const ItemTopWrap = styled.div<ItemTopWrapProps>`
  border-radius: 20px 20px 0 0;
  background-position: center;
  background-size: cover;
  height: 500px;
  width: 460px;
  background-image: ${(props) =>
    props.image !== ''
      ? `linear-gradient(#000000d1, #0000008b), url(${props.image})`
      : `linear-gradient(#000000d1, #0000008b), url("./image/no-image.png")`};
`;
const ItemTopWrapUI = styled.div`
  border-radius: 20px;
  background-position: center;
  background-size: cover;
  height: 700px;
  width: 700px;
  background-color: #ddd;
`;

const NameGeneWarp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  color: white;
  height: 100%;
`;

const TopName = styled.div`
  writing-mode: vertical-rl;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  font-size: 48px;
  font-weight: 600;
  letter-spacing: 4px;
  margin: 40px 40px 40px 0;
`;
const TopGene = styled.div`
  writing-mode: vertical-rl;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  font-size: 32px;
  letter-spacing: 2px;

  margin-top: 40px;
  margin-right: 16px;
`;

const ContentBody = styled.div`
  border-radius: 0 0 20px 20px;
  background-color: gray;
  height: 160px;
  padding: 20px 40px;
`;
const ContentText = styled.span`
  font-size: 20px;
  font-weight: 100;
  line-height: 30px;
  color: white;
  text-align: justify;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;
