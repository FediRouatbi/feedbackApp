import { FaTimes, FaEdit } from "react-icons/fa";
import Card from "./shared/Card";

import React, { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

function FeedbackItem({ id, rating, text }) {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext);
  return (
    <Card>
      <div className="num-display">{rating}</div>
      <button className="close" onClick={deleteFeedback.bind(this, id)}>
        <FaTimes color="purple" />
      </button>
      <button
        className="edit"
        onClick={() => editFeedback({ id, rating, text })}
      >
        <FaEdit color="purple" />
      </button>
      <div className="text-display">{text}</div>
    </Card>
  );
}

export default FeedbackItem;
