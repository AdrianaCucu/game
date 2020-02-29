import { useState } from "react";

export const useTweets = () => {
  const [tweets, setTweets] = useState([]);

  return [tweets, setTweets];
};
