import React from "react";

const CopyClipboard = ({ shareSns, url }) => {
  return (
    <svg
      onClick={() => shareSns('U', null, null, null, null, url)}
      className="icon"
      aria-label="주소 복사"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle cx="20" cy="20" r="20" fill="#EAEDEF"></circle>
      <path
        d="M25.0001 20.65H15.0001V19.35H25.0001V20.65Z"
        fill="#2F3438"
      ></path>
      <path
        d="M10.3501 20C10.3501 17.4319 12.432 15.35 15.0001 15.35H18.0001V16.65H15.0001C13.1499 16.65 11.6501 18.1498 11.6501 20C11.6501 21.8501 13.1499 23.35 15.0001 23.35H18.0001V24.65H15.0001C12.432 24.65 10.3501 22.5681 10.3501 20Z"
        fill="#2F3438"
      ></path>
      <path
        d="M29.6501 20C29.6501 17.4319 27.5682 15.35 25.0001 15.35H22.0001V16.65H25.0001C26.8503 16.65 28.3501 18.1498 28.3501 20C28.3501 21.8501 26.8503 23.35 25.0001 23.35H22.0001V24.65H25.0001C27.5682 24.65 29.6501 22.5681 29.6501 20Z"
        fill="#2F3438"
      ></path>
    </svg>
  );
};

export default CopyClipboard;
