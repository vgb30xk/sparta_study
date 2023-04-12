import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0 auto;
  color: #212529;
  font-family: 'Noto Sans KR', sans-serif;  /* font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif; */
  overflow-y: scroll;    
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  ::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
}
}

li, p {
  margin: 0;
}
a {
  color: inherit;
  text-decoration: none;
}

textarea,
pre {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

.btn-primary {
    --bs-btn-color: #fff;
    --bs-btn-bg: #f2d589;
    --bs-btn-border-color: #f2d589;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #f2d589;
    --bs-btn-hover-border-color: none;
    --bs-btn-focus-shadow-rgb: 49,132,253;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: #e7ca82;
    --bs-btn-active-border-color: none;
    --bs-btn-active-shadow: inset 0 3px 5pxrgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #fff;
    --bs-btn-disabled-bg: none;
    --bs-btn-disabled-border-color: none;
}

.btn {
  --bs-btn-font-weight: 700;
}

.dropdown-menu {
  --bs-dropdown-link-hover-bg: #eee5ceb5;
  --bs-dropdown-link-active-bg: #eee0b9;
}

.dropdown-item {
  font-weight: 600;
}

* {
  box-sizing: border-box;
}
 
/* @media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
  body {
    color: white;
    background: black;
  }
} */
`;

export default GlobalStyle;
