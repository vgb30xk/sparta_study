import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import * as Application from "expo-application";
import Loading from "../components/Loading";
import { StatusBar } from "expo-status-bar";
import LikeCard from "../components/LikeCard";
import { firebase_db } from "../firebaseConfig";

const isIOS = Platform.OS === "ios";
export default function MainPage({ navigation, route }) {
  //useState 사용법
  //[state,setState] 에서 state는 이 컴포넌트에서 관리될 상태 데이터를 담고 있는 변수
  //setState는 state를 변경시킬때 사용해야하는 함수

  //모두 다 useState가 선물해줌
  //useState()안에 전달되는 값은 state 초기값
  const [tip, setTip] = useState({});
  //하단의 return 문이 실행되어 화면이 그려진다음 실행되는 useEffect 함수
  //내부에서 data.json으로 부터 가져온 데이터를 state 상태에 담고 있음
  const [ready, setReady] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: "꿀팁 찜",
    });
    getLike();
  }, []);

  const getLike = async () => {
    let userUniqueId;
    if (isIOS) {
      let iosId = await Application.getIosIdForVendorAsync();
      userUniqueId = iosId;
    } else {
      userUniqueId = await Application.androidId;
    }

    await firebase_db
      .ref("/like/" + userUniqueId)
      .once("value")
      .then((snapshot) => {
        let tip = snapshot.val();
        let tip_list = Object.values(tip);
        if (tip_list && tip_list.length > 0) {
          console.log(tip_list);
          setTip(tip_list);
          setReady(false);
        }
      });
  };

  //data.json 데이터는 state에 담기므로 상태에서 꺼내옴
  // let tip = state.tip;
  //return 구문 밖에서는 슬래시 두개 방식으로 주석
  return ready ? (
    <Loading />
  ) : (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      {/* <Text style={styles.title}>나만의 꿀팁</Text> */}

      <View style={styles.cardContainer}>
        {/* 하나의 카드 영역을 나타내는 View */}
        {tip.map((content, i) => {
          return (
            <LikeCard
              content={content}
              key={i}
              navigation={navigation}
              tip={tip}
              setTip={setTip}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    //앱의 배경 색
    backgroundColor: "#fff",
  },
  title: {
    //폰트 사이즈
    fontSize: 20,
    //폰트 두께
    fontWeight: "700",
    //위 공간으로 부터 이격
    marginTop: 50,
    //왼쪽 공간으로 부터 이격
    marginLeft: 20,
  },
  weather: {
    alignSelf: "flex-end",
    paddingRight: 20,
  },
  mainImage: {
    //컨텐츠의 넓이 값
    width: "90%",
    //컨텐츠의 높이 값
    height: 200,
    //컨텐츠의 모서리 구부리기
    borderRadius: 10,
    marginTop: 20,
    //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
    //각 속성의 값들은 공식문서에 고대로~ 나와 있음
    alignSelf: "center",
  },
  middleContainer: {
    marginTop: 20,
    marginLeft: 10,
    height: 60,
  },
  middleButtonAll: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#20b2aa",
    borderColor: "deeppink",
    borderRadius: 15,
    margin: 7,
  },
  middleButton01: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#fdc453",
    borderColor: "deeppink",
    borderRadius: 15,
    margin: 7,
  },
  middleButton02: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#fe8d6f",
    borderRadius: 15,
    margin: 7,
  },
  middleButton03: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#9adbc5",
    borderRadius: 15,
    margin: 7,
  },
  middleButton04: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#f886a8",
    borderRadius: 15,
    margin: 7,
  },
  middleButtonx: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#FC98FD",
    borderRadius: 15,
    margin: 7,
    color: "white",
    alignSelf: "flex-end",
  },
  middleButtonText: {
    color: "#fff",
    fontWeight: "700",
    //텍스트의 현재 위치에서의 정렬
    textAlign: "center",
  },
  middleButtonTextAll: {
    color: "#fff",
    fontWeight: "700",
    //텍스트의 현재 위치에서의 정렬
    textAlign: "center",
  },
  cardContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
});
