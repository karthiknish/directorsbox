"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";

const VideoReel = ({ videos, posters }) => {
  const [playingStates, setPlayingStates] = useState(
    Object.fromEntries(videos.map((_, i) => [`video${i + 1}`, false]))
  );

  const [bufferingStates, setBufferingStates] = useState(
    Object.fromEntries(videos.map((_, i) => [`video${i + 1}`, false]))
  );

  const handlePlayPause = (videoId) => {
    setPlayingStates((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, staggerChildren: 0.2 }}
      viewport={{ once: true }}
    >
      {videos.map((videoUrl, index) => {
        const videoId = `video${index + 1}`;
        return (
          <motion.div
            key={videoId}
            className="relative aspect-[9/16]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-full h-full">
              <ReactPlayer
                url={videoUrl}
                width="100%"
                height="100%"
                playing={playingStates[videoId]}
                controls={false}
                playsinline={true}
                onEnded={() => {
                  setPlayingStates((prev) => ({
                    ...prev,
                    [videoId]: false,
                  }));
                }}
                onBuffer={() => {
                  setBufferingStates((prev) => ({
                    ...prev,
                    [videoId]: true,
                  }));
                }}
                onBufferEnd={() => {
                  setBufferingStates((prev) => ({
                    ...prev,
                    [videoId]: false,
                  }));
                }}
                config={{
                  file: {
                    attributes: {
                      playsInline: true,
                      webkitPlaysinline: "true",
                      preload: "auto",
                    },
                    forceVideo: true,
                    quality: {
                      default: 720,
                      options: [1080, 720, 480],
                    },
                    hlsQualitySelector: true,
                    hlsOptions: {
                      maxLoadingDelay: 4,
                      minAutoBitrate: 0,
                      lowLatencyMode: true,
                      enableWorker: true,
                      startLevel: 1,
                    },
                  },
                }}
              />
              <motion.button
                className={`absolute inset-0 flex items-center z-10 justify-center ${
                  playingStates[videoId] ? "bg-transparent" : "bg-black/10"
                } hover:bg-black/40 transition-colors`}
                onClick={() => handlePlayPause(videoId)}
                whileTap={{ scale: 0.95 }}
              >
                {playingStates[videoId] ? (
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-12 h-12"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                    />
                  </motion.svg>
                ) : (
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-12 h-12"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z"
                    />
                  </motion.svg>
                )}
              </motion.button>
              {bufferingStates[videoId] && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="w-12 h-12 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
              {!playingStates[videoId] && (
                <img
                  src={posters[index]}
                  alt="Video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default VideoReel;
