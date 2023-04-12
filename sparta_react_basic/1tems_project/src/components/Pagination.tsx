import { useEffect, useState } from 'react';
import styled from 'styled-components';

function Pagination(props: any) {
  const { total, page, setPage } = props;
  const [currPage, setCurrPage] = useState(page);

  // 페이지 리스트의 첫번째
  let firstNum = currPage - (currPage % 5) + 1;
  // 페이지 리스트의 마지막
  let lastNum = currPage - (currPage % 5) + 5;

  // 전체 페이지
  const numPages = Math.ceil(total / 18);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Nav>
        <Button
          onClick={() => {
            setPage(page - 1);
            setCurrPage(page - 2);
          }}
          disabled={page === 1}
        >
          &lt;
        </Button>

        <Button
          onClick={() => setPage(firstNum)}
          //@ts-ignore
          border="true"
          aria-current={page === firstNum ? 'page' : null}
        >
          {firstNum}
        </Button>

        {/* 첫번째, 마지막 페이지 사이의 페이지 */}
        {Array.from({ length: 4 }, (_, i) => i + 1).map((_, i) => {
          if (i <= 2) {
            return (
              <Button
                key={i + 1}
                onClick={() => {
                  setPage(firstNum + 1 + i);
                }}
                //@ts-ignore
                border="true"
                aria-current={page === firstNum + 1 + i ? 'page' : null}
              >
                {firstNum + 1 + i}
              </Button>
            );
          } else if (i >= 3) {
            return (
              <Button
                key={i + 1}
                onClick={() => setPage(lastNum)}
                //@ts-ignore
                border="true"
                aria-current={page === lastNum ? 'page' : null}
              >
                {lastNum}
              </Button>
            );
          }
        })}

        <Button
          onClick={() => {
            setPage(page + 1);
            setCurrPage(page);
          }}
          disabled={page === numPages}
        >
          &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  & > button {
    margin: 0 4px;
  }
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: tomato;
    font-weight: bold;
    cursor: pointer;
    transform: revert;
  }
`;

export default Pagination;
