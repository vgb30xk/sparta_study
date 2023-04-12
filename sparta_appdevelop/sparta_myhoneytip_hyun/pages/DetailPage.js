import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
  Platform,
} from "react-native";
import * as Linking from "expo-linking";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";

const isIOS = Platform.OS === "ios";

export default function DetailPage({ navigation, route }) {
  const [tip, setTip] = useState({});

  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
      headerStyle: {
        backgroundColor: "#000",
        shadowColor: "#000",
      },
      headerTintColor: "#fff",
    });

    const { idx } = route.params;
    firebase_db
      .ref("/tip/" + idx)
      .once("value")
      .then((snapshot) => {
        let tip = snapshot.val();
        setTip(tip);
      });
  }, []);

  const like = async () => {
    let userUniqueId;
    if (isIOS) {
      let iosId = await Application.getIosIdForVendorAsync();
      userUniqueId = iosId;
    } else {
      userUniqueId = await Application.androidId;
    }
    firebase_db
      .ref("/like/" + userUniqueId + "/" + tip.idx)
      .set(tip, function (error) {
        console.log(error);
        Alert.alert("찜 완료!");
      });
  };

  const share = () => {
    Share.share({
      message: `${tip.title} \n\n ${tip.desc} \n\n ${tip.image}`,
    });
  };

  const link = () => {
    Linking.openURL("https://spartacodingclub.kr");
  };
  return (
    // ScrollView에서의 flex 숫자는 의미가 없습니다. 정확히 보여지는 화면을 몇등분 하지 않고
    // 화면에 넣은 컨텐츠를 모두 보여주려 스크롤 기능이 존재하기 때문입니다.
    // 여기선 내부의 컨텐츠들 영역을 결정짓기 위해서 height 값과 margin,padding 값을 적절히 잘 이용해야 합니다.
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{ uri: tip.image }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{tip.title}</Text>
        <Text style={styles.desc}>{tip.desc}</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={() => like()}>
            <Text style={styles.buttonText}>팁 찜하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => share()}>
            <Text style={styles.buttonText}>팁 공유하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => link()}>
            <Text style={styles.buttonText}>외부 링크</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },
  image: {
    height: 400,
    margin: 10,
    marginTop: 40,
    borderRadius: 20,
  },
  textContainer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#eee",
  },
  desc: {
    marginTop: 10,
    color: "#eee",
  },
  buttonGroup: {
    flexDirection: "row",
  },
  button: {
    width: 90,
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "deeppink",
    borderRadius: 7,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
