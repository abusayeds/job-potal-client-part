"use client";

import React, { useState, useEffect, useRef } from "react";

type ScrollData = {
  currentScrollY: number;
  previousScrollY: number;
  scrollDifference: number;
  scrollDirection: "up" | "down" | "none";
  scrollPercentage: number;
};

export default function ScrollTracker() {
  const [scrollData, setScrollData] = useState<ScrollData>({
    currentScrollY: 0,
    previousScrollY: 0,
    scrollDifference: 0,
    scrollDirection: "none",
    scrollPercentage: 0,
  });

  const previousScrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const previousScrollY = previousScrollRef.current;
      const scrollDifference = currentScrollY - previousScrollY;

      // Calculate scroll percentage
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage =
        (currentScrollY / (documentHeight - windowHeight)) * 100;

      // Determine scroll direction
      let scrollDirection: "up" | "down" | "none" = "none";
      if (scrollDifference > 0) {
        scrollDirection = "down";
      } else if (scrollDifference < 0) {
        scrollDirection = "up";
      }

      setScrollData({
        currentScrollY: Math.round(currentScrollY),
        previousScrollY: Math.round(previousScrollY),
        scrollDifference: Math.round(scrollDifference),
        scrollDirection,
        scrollPercentage: Math.round(scrollPercentage * 10) / 10, // Round to 1 decimal
      });

      // Update previous scroll position
      previousScrollRef.current = currentScrollY;
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial call to set initial values
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-4 min-w-64">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        📊 Scroll Tracker
      </h3>

      <div className="space-y-2 text-sm">
        {/* Current Scroll Position */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Current Position:</span>
          <span className="font-mono text-blue-600 font-semibold">
            {scrollData.currentScrollY}px
          </span>
        </div>

        {/* Previous Scroll Position */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Previous Position:</span>
          <span className="font-mono text-gray-500">
            {scrollData.previousScrollY}px
          </span>
        </div>

        {/* Scroll Difference */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Difference:</span>
          <span
            className={`font-mono font-semibold ${
              scrollData.scrollDifference > 0
                ? "text-green-600"
                : scrollData.scrollDifference < 0
                ? "text-red-600"
                : "text-gray-500"
            }`}
          >
            {scrollData.scrollDifference > 0 ? "+" : ""}
            {scrollData.scrollDifference}px
          </span>
        </div>

        {/* Scroll Direction */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Direction:</span>
          <span className="flex items-center">
            {scrollData.scrollDirection === "down" && (
              <span className="text-green-600">↓ Down</span>
            )}
            {scrollData.scrollDirection === "up" && (
              <span className="text-red-600">↑ Up</span>
            )}
            {scrollData.scrollDirection === "none" && (
              <span className="text-gray-500">— None</span>
            )}
          </span>
        </div>

        {/* Scroll Percentage */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Progress:</span>
          <span className="font-mono text-purple-600 font-semibold">
            {scrollData.scrollPercentage}%
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-150"
              style={{
                width: `${Math.min(scrollData.scrollPercentage, 100)}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Example component to demonstrate usage
export function ScrollTrackerDemo() {
  return (
    <div className="min-h-screen">
      {/* Scroll Tracker Component */}
      <ScrollTracker />

      {/* Demo Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Scroll Tracker Demo
        </h1>

        {/* Generate content to make page scrollable */}
        {Array.from({ length: 20 }, (_, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-3">Section {index + 1}</h2>
            <p className="text-gray-600 leading-relaxed">
              This is a demo section to create scrollable content. As you scroll
              up and down, you can see the scroll tracker in the top-right
              corner showing your current position, previous position, the
              difference between them, scroll direction, and overall progress
              through the page.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Try scrolling with your mouse wheel, trackpad, or arrow keys to
              see how the tracker updates in real-time with smooth animations
              and color-coded feedback.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
