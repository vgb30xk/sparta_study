import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import iconimg from "../img/iconimg.png";
import moveimg from "../img/excited.gif";

export default function Weather() {
  const [location, setLocation] = useState("");
  const [weatherResult, setWeatherResult] = useState("");

  const API_KEY = "30ccac4351c9964310cd3cce7aceb7d3";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  const searchWeather = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await axios({
          method: "get",
          url,
        });
        setWeatherResult(data);
      } catch (err) {
        alert("잘못된 지역이름입니다");
      }
    }
  };

  // const weatherTemp = Math.abs(
  //   Math.round((weatherResult.data.main.temp - 273.15) * 10) / 10
  // );
  // console.log(weatherTemp);

  // const checkWeatherTemp=()=>{
  //   if()
  // }

  return (
    <HeaderContianer>
      <Text>당신이 살고 있는 곳은?</Text>
      <CityInputBox
        placeholder="영어로 적어주세요"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        type="text"
        onKeyDown={searchWeather}
      />
      {Object.keys(weatherResult).length !== 0 && (
        <>
          <TextBox>
            <ImgBox src={moveimg} />
            &nbsp;&nbsp;
            <Texts>
              {Math.floor((weatherResult.data.main.temp - 273.15) * 10) / 10 >=
              0
                ? "더운 날에 황금 잉어빵 안 (못) 팝니다."
                : `${Math.abs(
                    Math.floor((weatherResult.data.main.temp - 273.15) * 10) /
                      10
                  ).toFixed(0)} 개 먹는 것을 추천합니다~춥습니다!`}
            </Texts>
            &nbsp;&nbsp;
            <ImgBox src={moveimg} />
          </TextBox>

          <ResultWrap>
            <City>🌏&nbsp;{weatherResult.data.name}&nbsp;&nbsp;&nbsp;</City>

            <Temp>
              {Math.round((weatherResult.data.main.temp - 273.15) * 10) / 10}
              °C &nbsp;&nbsp;&nbsp;
            </Temp>
            <TodayWeather>
              현재날씨
              <SkyStatus>{weatherResult.data.weather[0].main}</SkyStatus>
            </TodayWeather>
          </ResultWrap>
        </>
      )}
    </HeaderContianer>
  );
}

const Text = styled.text`
  font-size: 20px;
  color: #6d6d00;
  cursor: context-menu;
`;
const Texts = styled.span`
  color: white;
  position: relative;
`;
const HeaderContianer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 650px;
  flex-wrap: wrap;
  margin: auto;
`;
const TextBox = styled.div`
  height: 40px;
  border: 3px solid #ffcd00;
  display: inline-block;
  /* position: absolute;
  top: 63px; */
  font-size: 20px;
  background-color: black;
`;

const ImgBox = styled.img`
  width: 30px;
  height: 30px;
`;

const ResultWrap = styled.div`
  display: flex;
  /* float: right; */
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  border: 1px solid #ffcd00;
  border-radius: 5px;
  background-color: #ffcd00;
  flex-wrap: wrap;
  padding: 2px 32px;
`;
const CityInputBox = styled.input`
  width: 188px;
  height: 40px;
  background-color: #ffcd00;
  padding: 5px;
  border: 2px solid #ffcd00;
  color: black;
  font-weight: 700;
  &:focus {
    outline: none;
  }
  margin: 0 0 0 10px;
  position: relative;
  font-size: 20px;
  text-align: center;
`;

const City = styled.div`
  margin-left: auto;
  font-size: 23px;
`;

const TodayWeather = styled.div`
  margin-left: auto;
  font-size: 20px;
`;

const SkyStatus = styled.div`
  font-weight: bolder;
  font-size: 25px;
`;

const Temp = styled.div`
  font-weight: bolder;
  margin-left: 5px;
  font-size: 30px;
`;
