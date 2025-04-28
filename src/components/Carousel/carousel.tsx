"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Carousel.module.css";

const imageURLs = [
  "/images/1.jpeg",
  "/images/2.jpeg",
  "/images/3.jpeg",
  "/images/4.jpeg",
  "/images/5.jpeg",
];

const Carousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mt-10">
      <div className={styles.mainC}>
        <div className={styles.imageContainer}>
          {imageURLs.map((src, index) => (
            <Image
              key={index}
              className={styles.image}
              src={src}
              alt={`Image ${index + 1}`}
              width={150}
              height={150}
            />
          ))}
        </div>

        <div className={styles.imageContainer}>
          {imageURLs.map((src, index) => (
            <Image
              key={index}
              className={styles.image}
              src={src}
              alt={`Image ${index + 1}`}
              width={150}
              height={150}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
