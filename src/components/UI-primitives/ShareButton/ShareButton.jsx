import { useState, useEffect } from "react";
import "./ShareButton.css";
import shareIcon from "./share-icon.svg";

const ShareButton = () => {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: currentUrl,
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.log("Error sharing content:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(currentUrl);
        alert("URL copied to clipboard!");
      } catch (error) {
        console.log("Error copying to clipboard:", error);
      }
    }
  };

  return (
    <button onClick={handleShare} className="share-button">
      <img src={shareIcon} alt="Share" className="share-icon" />
    </button>
  );
};

export default ShareButton;
