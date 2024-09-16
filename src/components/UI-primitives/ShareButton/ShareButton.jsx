import { useState, useEffect } from "react";
import "./ShareButton.css";
import shareIcon from "/images/share-icon.svg";

const ShareButton = () => {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: currentUrl,
        });
      } else {
        await navigator.clipboard.writeText(currentUrl);
        alert("URL copied to clipboard!");
      }
    } catch (error) {
      alert("Unable to share. Please try again.");
    }
  };

  return (
    <button onClick={handleShare} className="share-button interactive">
      <img src={shareIcon} alt="Share" className="share-icon" />
    </button>
  );
};

export default ShareButton;
