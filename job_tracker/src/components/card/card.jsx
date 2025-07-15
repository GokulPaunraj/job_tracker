import React from "react";
import "./card.css";

const card = ({count, text}) => {
  return (
      <section className="card">
        <h2>{count}</h2>
        <p>{text}</p>
      </section>
  );
};

export default card;
