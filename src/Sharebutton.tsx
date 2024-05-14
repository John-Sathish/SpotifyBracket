import React, { useState } from 'react';
import './CSS/App.css';
import ShareButtonImage from './resources/Sharebutton.png';
const CopyUrlToClipboard = () => {
  // control the Prompt information
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    // get the URL to copy
    const currentUrl = window.location.href;

    // copy the URL to clipboard
    navigator.clipboard.writeText(currentUrl).then(() => {
      // show the information of seccessfull copy
      setIsCopied(true);

      // set a timer
      setTimeout(() => {
        setIsCopied(false);
      }, 2000); // 2 seconds to desappear
    }).catch(err => {
      // deal with the error
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <>
      <button className="sharebutton" onClick={copyToClipboard}>
      <img src={ShareButtonImage} alt="Share URL" />
        </button>
      {isCopied && <span className="copy-message">Link copied!</span>}
    </>
  );
};

export default CopyUrlToClipboard;