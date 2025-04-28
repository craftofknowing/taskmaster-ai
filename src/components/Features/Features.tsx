"use client";

import React from "react";

const features = [
  {
    title: "AI-Powered Task Assignment",
    description: "Smartly assign tasks using AI algorithms",
  },
  {
    title: "Personalized Task Allocation",
    description: "Accept tasks as you wish",
  },
  {
    title: "Task Automation",
    description: "Efficient task management",
  },
];

const Features = () => {
  return (
    <div className="flex justify-center items-center text-white py-16">
      <div className="flex gap-12 w-full max-w-6xl justify-center items-center">
        {features.map((feature, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center flex-1 text-center">
              <div
                className="text-2xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {feature.title}
              </div>
              <div
                className="text-base font-normal"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {feature.description}
              </div>
            </div>
            {index !== features.length - 1 && (
              <div className="w-px bg-white h-24"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Features;
