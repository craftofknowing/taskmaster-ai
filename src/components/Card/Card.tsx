"use client";
import React from "react";
import { CSSProperties } from "react";
import styles from "./Card.module.css";

const Card = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContent}>
        <span className="text-4xl font-semibold leading-[1.5]">
          Ready to make work more exciting?
        </span>
        <p className="leading-[1.5] text-lg">
          Sign up now and start assigning tasks with ease!
        </p>
      </div>
      <button className={styles.cardAction}> Sign Up</button>
    </div>
  );
};

export default Card;
