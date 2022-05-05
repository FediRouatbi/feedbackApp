import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import feed from "../data";

export const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(feed);
  const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false });

  //Add feedback
  const addFeedback = (data) => {
    data.id = uuidv4();
    setFeedback((prev) => [data, ...prev]);
  };

  //Delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure u want to delete ? "))
      setFeedback(feedback.filter((item) => item.id !== id));
  };
  //Update feedback
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((el) => (el.id === id ? { ...el, ...updItem } : el))
    );
  };
  // Edit feedback
  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        addFeedback,
        deleteFeedback,
        updateFeedback,
        editFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
