import React from "react";
import styles from "./page.module.css";
import Carousel from "@/components/Carousel/carousel";
import Features from "@/components/Features/Features";
import Card from "@/components/Card/Card";
import Link from "next/link";
const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeHero}>
        <div className={styles.homeHeader}>
          <div className={styles.heroColumn}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroText1}>Welcome to TaskMaster</h1>
              <p className={styles.heroText2}>
                Empower your team with AI-driven task assignments to boost
                productivity and engagement.
              </p>
            </div>
            <div className={styles.heroActions}>
              <Link href={"/login"}>
                <button className={styles.heroButton}>
                  <span className={styles.buttonText}>Login</span>
                </button>
              </Link>
              <Link href={"/signup"}>
                <button className={styles.heroButton1}>
                  <span className={styles.buttonText}>Sign Up</span>
                </button>
              </Link>
            </div>
          </div>
          <Features />
          <Carousel />
          <Card />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
