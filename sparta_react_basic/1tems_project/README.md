# 프로젝트 명 : Culture.map()

전국의 문화재를 소개하고, 문화재의 위치를 지도로 표기하며 문화재의 리뷰를 작성할 수 있는 웹 페이지.

# 팀원

- 강창순 (팀장)
- 정서연
- 박재현
- 손강익
- 김인섭

# 기능소개

- 문화재 API - 카테고리 검색
    
    ```jsx
    // Main.tsx
    
    const { data: selectData, isLoading: selectLoading } = useQuery<any>(
        ['searchData', submitCity, submitTitle, pageNumber],
        getSearchData 
      );
    ```
    
    검색 버튼을 누르면 카테고리에 선택된 정보를 가지고 getSearchData 실행
    
    ```jsx
    // api.tsx
    
    export const getSearchData = async ({ queryKey }: any) => {
      const [_, cityValue, titleValue, pageNumber] = queryKey;
      let data;
      await axios
        .get(
          `${BASE_URL}ccbaCtcd=${cityValue}&ccbaKdcd=${titleValue}&pageIndex=${pageNumber}&pageUnit=16`
        )
        .then((response) => {
          const responseData = new XMLParser().parseFromString(
            response.data
          ).children;
    	    const itemData = responseData.slice(3); // 문화재 관련 데이터
    	    const pageData = responseData[0].value; // 페이지 관련 데이터
    
          const mappedItemData = itemData?.map((item: ItemType) => [
            {
              total: item.children[0].value,
              id: item.children[1].value,
              title: item.children[2].value.replaceAll('>', '').trim(),
              name: item.children[4].value.replaceAll('>', '').trim(),
              city: item.children[6].value.replaceAll('>', '').trim(),
              titleNum: item.children[9].value,
              cityNum: item.children[10].value,
              careNum: item.children[11].value,
              long: item.children[14].value,
              lat: item.children[15].value,
            },
          ]);
          data = { pageData, mappedItemData };
        });
      return data;
    };
    ```
    
    - 익명 함수를 통해 변수를 넘기고 싶었지만, 데이터를 가져오기만 하고 query로 받아오지 못함.
    - json 형식이 아니라, xml 형식이라 변환이 필요.
    - 변환을 위해 react-xml-parser 라이브러리를 사용. import 윗줄에 @ts-ignore 작성.
- 슬라이드
    
    react-slick 라이브러리 사용.
    
    ```jsx
    // MainCarousel.tsx
    
    const MainCarousel = () => {
      const mainImg01 = './image/mainVisual/mainVisual01.jpg';
      const mainImg02 = './image/mainVisual/mainVisual02.jpg';
      const mainImg03 = './image/mainVisual/mainVisual03.jpg';
    
      return (
        <Wrapper>
          <StyledSlider {...settings}>
            <CarouselBox>
              <Img src={mainImg01} />
            </CarouselBox>
            <CarouselBox>
              <Img src={mainImg02} />
            </CarouselBox>
            <CarouselBox>
              <Img src={mainImg03} />
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
    ```
    
- 맵 API
    
    react-kakao-maps-sdk 라는 카카오에서 제공하는 라이브러리 사용
    
    ```jsx
    // MapKakao.tsx
    
    export default function MapKakao({ lat, lng }: { lat: number; lng: number }) {
      return (
        <Map center={{ lat, lng }} style={{ width: '100%', height: '360px' }}>
          <MapMarker position={{ lat, lng }}>
          </MapMarker>
        </Map>
      );
    }
    ```
    
- 리뷰
    
    파이어 베이스를 사용.
    
    ```jsx
    // api.tsx
    
    export const createReview = async (item: reviewType) => {
      await addDoc(collection(dbService, 'reviews'), {
        cultureId: item.cultureId,
        createAt: Date.now(),
        name: item.name,
        password: item.password,
        body: item.body,
      });
    };
    export const readReview = async () => {
      let getReviewsData: reviewType[] = [];
      const q = query(
        collection(dbService, `reviews`),
        orderBy('createAt', 'desc')
      );
      const docs = await getDocs(q);
      docs.forEach((doc) => {
        const Data = {
          id: doc.id,
          ...doc.data(),
        };
        getReviewsData.push(Data);
      });
      return getReviewsData;
    };
    
    export const deleteReview = async (item: reviewType) => {
      deleteDoc(doc(dbService, `reviews/${item.id}`));
    };
    ```
    
    ```jsx
    	// ReviewList.tsx	
    
    	const [name, setName] = useState('');
      const [password, setPassword] = useState('');
      const [body, setBody] = useState('');
    
      // 리뷰 작성 mutation
      const { isLoading: createLoading, mutate: createMutate } =
        useMutation(createReview);
    
      // 닉네임 감지
      const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
      };
    
      // 비밀번호 감지
      const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
      };
    
      // 내용 감지
      const onChangeBody = (event: ChangeEvent<HTMLInputElement>) => {
        setBody(event.target.value);
      };
    
      // 작성
      const submitReview = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createMutate(
          { cultureId, name, password, body },
          {
            onSuccess: () => {
              queryClient.invalidateQueries('reviews');
            },
          }
        );
        setName('');
        setPassword('');
        setBody('');
      };
    ```
    
    ```jsx
    // Modal.tsx
    
    	const [password, setPassword] = useState('');
      const queryClient = useQueryClient();
      const { mutate: deleteMutate } = useMutation(deleteReview);
    
      // 비밀번호 입력 감지
      const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
      };
    	// 삭제 기능
      const removeReview = () => {
        if (password === item.password) {
          deleteMutate(item, {
            onSuccess: () => {
              queryClient.invalidateQueries('reviews');
              setDeleteToggle(false);
            },
          });
        } else if (password === '') {
          alert('비밀번호를 입력하지 않으셨습니다.');
          setDeleteToggle(false);
        } else {
          alert('비밀번호가 맞지 않습니다.');
          setDeleteToggle(false);
        }
      };
    ```
    
- 페이지네이션
    
    ```jsx
    	const { total, page, setPage } = props;
      const [currPage, setCurrPage] = useState(page);
    
    	// 페이지 리스트의 첫번째
      let firstNum = currPage - (currPage % 5) + 1;
    
    	// 페이지 리스트의 마지막
      let lastNum = currPage - (currPage % 5) + 5;
    
    	// 전체 페이지
      const numPages = Math.ceil(total / 16);
    
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
      return (
        <>
          <Nav>
            <Button
              onClick={() => {
                setPage(Number(page) - 1);
                setCurrPage(Number(page) - 2);
              }}
              disabled={page == 1}
            >
              &lt;
            </Button>
            <Button
              onClick={() => setPage(firstNum)}
              aria-current={'page'}
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
                    aria-current={'page'}
                  >
                    {firstNum + 1 + i}
                  </Button>
                );
              } else if (i >= 3) {
                return (
                  <Button
                    key={i + 1}
                    onClick={() => setPage(lastNum)}
                    aria-current={'page'}
                  >
                    {lastNum}
                  </Button>
                );
              }
            })}
            <Button
              onClick={() => {
                setPage(Number(page) + 1);
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
    ```
    
- 총 방문자 수
    
    ```jsx
    // api.tsx
    
    export const totalVisit = async () => {
      return await getDoc(doc(dbService, 'counter', 'visit'));
    };
    
    export const todayCounter = async () => {
      await updateDoc(doc(dbService, 'counter/visit'), {
        count: increment(1),
      });
    };
    ```
    
    ```jsx
    // Main.tsx
    
    useEffect(() => {
        countMutate();
      }, []);
    ```
    
    ```jsx
    const { data: visitData, isLoading: visitLoading } = useQuery(
        'visitData',
        totalVisit
      );
    ```
