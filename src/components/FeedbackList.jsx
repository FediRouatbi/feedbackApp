import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FeedbackItem from "./FeedbackItem";
import { FeedbackContext } from "../context/FeedbackContext";
function FeedbackList({ handelDelete }) {
  const { feedback } = useContext(FeedbackContext);

  if (!feedback || feedback.lenght === 0) return <p>No Feedback Yet</p>;

  // return (
  //   <div className="feeedback-list">
  //     {data.map((elem) => (
  //       <div key={elem.id}>
  //         <FeedbackItem
  //           rating={elem.rating}
  //           text={elem.text}
  //           handelDelete={handelDelete}
  //           id={elem.id}
  //         />
  //       </div>
  //     ))}
  //   </div>
  // );
  return (
    <div className="feeedback-list">
      <AnimatePresence>
        {feedback.map((elem) => (
          <motion.div
            key={elem.id}
            initial={{ opacity: 0, transform: "translateY(-30px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(-30px)" }}
          >
            <FeedbackItem
              rating={elem.rating}
              text={elem.text}
              id={elem.id}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default FeedbackList;
