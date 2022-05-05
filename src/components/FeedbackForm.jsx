import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import React, { useContext, useState, useEffect } from "react";
import { FeedbackContext } from "../context/FeedbackContext";
function FeedbackForm() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);
  useEffect(() => {
    if (!feedbackEdit.edit) return;

    setBtnDisabled(false);
    setText(feedbackEdit.item.text);
    setRating(feedbackEdit.item.rating);
  }, [feedbackEdit]);
  const handelTextChange = (e) => {
    const input = e.target.value;
    if (input === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (input !== "" && input.trim().length < 10) {
      setMessage("Text must be at least 10 characters");
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
    setText(input);
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length < 10) return;
    const newFeedback = {
      text,
      rating,
    };
    if (feedbackEdit.edit === true) {
      updateFeedback(feedbackEdit.item.id, newFeedback);
    } else addFeedback(newFeedback);
    setMessage(null);
    setBtnDisabled(true);
    setText("");
    setRating(10);
  };
  return (
    <Card>
      <form onSubmit={handelSubmit}>
        <h2>How would u rate your services with us ?</h2>
        <RatingSelect select={(val) => setRating(val)} />
        <div className="input-group">
          <input
            type="text"
            placeholder="write a review"
            onChange={handelTextChange}
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
