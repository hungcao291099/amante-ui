import React from 'react';
import { ClipLoader } from 'react-spinners';

const LoadingBox = ({ height, color="#eb7c16" }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center loading-box"
      style={{ height: height ? height : '70vh', width: '100%' }}
    >
      <ClipLoader size={40} color={color}>
        <span className="visually-hidden">Loading...</span>
      </ClipLoader>
    </div>
  );
};

export default LoadingBox;
