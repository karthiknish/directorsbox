"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";

const VideoReel = ({ videos, posters }) => {
  const [playingStates, setPlayingStates] = useState(
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
              />
              <motion.button
                className={`absolute inset-0 flex items-center z-10 justify-center ${
                  playingStates[videoId] ? "bg-transparent" : "bg-black/30"
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
              <img
                src={posters[index]}
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ display: playingStates[videoId] ? "none" : "block" }}
              />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default VideoReel;
