import { Dimensions } from "react-native";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
// 이메일 정규식
export const pwRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
// 비밀번호 정규식, 특수문자 영문자 최소 8자리부터 포함
