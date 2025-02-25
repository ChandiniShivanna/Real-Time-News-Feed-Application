import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribeCategory, unsubscribeCategory } from "../slices/userSlice";

const categories = ["Tech", "Business", "Sports", "Entertainment", "Health"];

const Categories = () => {
  const dispatch = useDispatch();
  const { subscriptions } = useSelector((state) => state.user);

  const handleToggle = (category) => {
    if (subscriptions.includes(category)) {
      dispatch(unsubscribeCategory(category));
    } else {
      dispatch(subscribeCategory(category));
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Subscribe to Categories</h2>
      <div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleToggle(category)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: subscriptions.includes(category)
                ? "#4caf50"
                : "#f0f0f0",
              color: subscriptions.includes(category) ? "#fff" : "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
