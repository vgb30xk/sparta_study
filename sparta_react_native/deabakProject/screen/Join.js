import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Logo from "../assets/images/Logo_1.png";
import { Entypo } from "@expo/vector-icons";

import styled from "@emotion/native";

import { authService } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { emailRegex, pwRegex } from "../util";
const BgSafeAreaView = styled.View`
  flex: 1;
  justify-content: center;
  background-color: white;
`;

const Background = styled.View`
  /* display: flex; */
  align-items: flex-start;
  justify-content: center;
  background-color: white;
  padding: 20px;
`;

const ContainerStyle = styled.TextInput`
  width: 100%;
  background-color: white;
  border-color: #e8e8e8;
  border-width: 1px;
  border-radius: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 8px;
  padding: 13px;
`;

const CustomButton = styled.TouchableOpacity`
  background-color: #3b71f3;
  width: 100%;
  padding: 15px;
  margin: 5px 0px;
  border-radius: 5px;
  align-items: center;
  margin-top: 15px;
`;

const CustomButton2 = styled.TouchableOpacity`
  background-color: white;
  width: 100%;
  padding: 15px;
  margin: 5px 0px;
  border: #bdbdc9;
  border-radius: 5px;
  align-items: center;
  margin-top: 15px;
`;

const CustomButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const CustomButtonText2 = styled.Text`
  color: black;
  font-weight: bold;
`;

const JoinTopText = styled.Text`
  color: #3b71f3;
  font-size: 32px;
  font-weight: bold;
  margin-left: 30px;
  /* text-shadow-color: rgba(0, 0, 0, 0.3);
  text-shadow-offset: 0px 4px;
  text-shadow-radius: 8px; */
`;

const JoinTopView = styled.View`
  margin-bottom: 80px;
`;

export default function Join({ navigation: { navigate } }) {
  const emailRef = useRef(null);
  // const nicknameRef = useRef(null);
  const passwordRef = useRef(null);
  const checkPasswordRef = useRef(null);

  const [email, setEmail] = useState("");
  // const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordShortError, setPasswordShortError] = useState(false);
  const [visablePassword, setVisablePassword] = useState(true);

  // useEffect(() => {
  //   console.log("작동");
  //   if (password !== checkPassword) {
  //     setPasswordError(!passwordError);
  //   }
  // }, [checkPassword]);

  const visibleToggle = () => {
    setVisablePassword(!visablePassword);
  };

  const handleRegister = () => {
    const matchedEmail = email.match(emailRegex);
    const matchedPw = password.match(pwRegex);

    if (matchedEmail === null) {
      setEmailError(true);
      emailRef.current.focus();
      return;
    } else {
      setEmailError(false);
    }

    if (matchedPw === null) {
      setPasswordShortError(true);
      passwordRef.current.focus();
      return;
    } else {
      setPasswordShortError(false);
    }

    if (password !== checkPassword) {
      setPasswordError(true);
      checkPasswordRef.current.focus();
      return;
    } else {
      setPasswordError(false);
    }

    createUserWithEmailAndPassword(authService, email, password)
      .then(() => {
        console.log("회원가입성공");
        setEmail("");
        // setNickname("");
        setPassword("");
        setCheckPassword("");
        navigate("Login");
      })
      .catch((err) => {
        console.log("err.message:", err.message);
        if (err.message.includes("already-in-use")) {
          alert("이미 사용중인 아이디 입니다.");
        }
      });
  };

  return (
    <BgSafeAreaView>
      <Background>
        <JoinTopView>
          <JoinTopText>2023 그거알고 있니?</JoinTopText>
        </JoinTopView>
        {/* <TouchableOpacity onPress={() => idRef.current.focus()}> */}
        <Text style={{ color: "#3b71f3", marginTop: 10 }}>아이디</Text>
        {/* </TouchableOpacity> */}
        <ContainerStyle ref={emailRef} value={email} onChangeText={setEmail} />
        {emailError && (
          <Text style={{ color: "red", marginTop: 10 }}>
            이메일이 올바르지 않습니다.
          </Text>
        )}

        {/* <TouchableOpacity onPress={() => nicknameRef.current.focus()}> */}
        {/* <Text style={{ color: "#3b71f3", marginTop: 10 }}>닉네임</Text> */}
        {/* </TouchableOpacity> */}
        {/* <ContainerStyle
          ref={nicknameRef}
          value={nickname}
          onChangeText={setNickname}
        /> */}

        <View style={{ width: "100%" }}>
          <Text style={{ color: "#3b71f3", marginTop: 10 }}>비밀번호</Text>
          <ContainerStyle
            secureTextEntry={visablePassword}
            ref={passwordRef}
            value={password}
            onChangeText={setPassword}
            style={{ position: "relative" }}
          />
          <TouchableOpacity onPress={visibleToggle}>
            {visablePassword ? (
              <Entypo
                name="eye"
                size={24}
                color="gray"
                style={{
                  // color: "gray",
                  marginTop: 10,
                  position: "absolute",
                  top: -46,
                  right: 10,
                }}
              />
            ) : (
              <Entypo
                name="eye-with-line"
                size={24}
                color="gray"
                style={{
                  // color: "gray",
                  marginTop: 10,
                  position: "absolute",
                  top: -46,
                  right: 10,
                }}
              />
            )}
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity onPress={() => checkPasswordRef.current.focus()}> */}

        {passwordShortError && (
          <Text style={{ color: "red", marginTop: 10 }}>
            8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.
          </Text>
        )}
        <Text style={{ color: "#3b71f3", marginTop: 10 }}>비밀번호 확인</Text>
        {/* </TouchableOpacity> */}
        <ContainerStyle
          secureTextEntry={visablePassword}
          ref={checkPasswordRef}
          value={checkPassword}
          onChangeText={setCheckPassword}
          // setCheckPassword
        />
        {passwordError && (
          <Text style={{ color: "red", marginTop: 10 }}>
            비밀번호가 일치하지 않습니다.
          </Text>
        )}
        {/* 에러가 있으면 비밀번호 에러 에러 없으면 빈 문자열 */}
        <CustomButton onPress={handleRegister}>
          <CustomButtonText>회원가입</CustomButtonText>
        </CustomButton>
        <CustomButton2>
          <CustomButtonText2 onPress={() => navigate("Login")}>
            취소
          </CustomButtonText2>
        </CustomButton2>
      </Background>
    </BgSafeAreaView>
  );
}
