import { createContext, useState, useEffect } from "react";

import feed from "../data";

export const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false });
  useEffect(() => {
    //fetch data
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await fetch("/feedback?_sort=id&_order=desc");
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };

  //Add feedback
  const addFeedback = async (data) => {
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const serverData = await response.json();
    setFeedback((prev) => [serverData, ...prev]);
  };

  //Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure u want to delete ? "))
      await fetch(`/feedback/${id}`, { method: "DELETE" });
    setFeedback(feedback.filter((item) => item.id !== id));
  };
  //Update feedback
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updItem),
    });
    const data = await response.json();
    setFeedback(feedback.map((el) => (el.id === id ? { ...el, ...data } : el)));
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
        isLoading,
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
