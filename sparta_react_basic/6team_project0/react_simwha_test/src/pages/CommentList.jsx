import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import { __getCommnetsByTodoId } from "../redux/modules/commentsSlice";
import { useParams } from "react-router-dom";
function CommentList() {
  const { data } = useSelector((state) => state.comments.comments);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(__getCommnetsByTodoId(id));
  }, [id]);
  return (
    <>
      {data.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
}

export default CommentList;
