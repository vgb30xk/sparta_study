declare interface ItemType {
  children: { [key: string]: string }[];
  id: string;
  [key: string]: string | number;
}

declare interface reviewType {
  [key: string]: string | number;
  cultureId?: string;
}

declare interface Window {
  kakao: any;
}
declare module  "react-reveal";