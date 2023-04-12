import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Editor({setContent, content}) {


  return (
    <ReactQuill
      theme='snow'
      onChange={setContent}
      defaultValue={content}
      style={{height: 700}}
      placeholder={'내용을 입력해주세요.'}
    />
  );
}
