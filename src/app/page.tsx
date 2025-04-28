import React from "react";
import styles from "./page.module.css";
import Carousel from "@/components/Carousel/carousel";
import Features from "@/components/Features/Features";
import Card from "@/components/Card/Card";
const HomePage = () => {
  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
    //   <h1 className="text-4xl font-bold mb-8">Welcome to TaskMaster</h1>
    //   <p className="text-lg mb-8">
    //     Empower your team with AI-driven task assignments to boost productivity
    //     and engagement.
    //   </p>
    //   <div className="flex space-x-4">
    //     <a
    //       href="#"
    //       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    //     >
    //       Sign Up
    //     </a>
    //     <a
    //       href="#"
    //       className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    //     >
    //       Login
    //     </a>
    //   </div>
    // </div>
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
              <button className={styles.heroButton}>
                <span className={styles.buttonText}>Login</span>
              </button>
              <button className={styles.heroButton1}>
                <span className={styles.buttonText}>Sign Up</span>
              </button>
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
