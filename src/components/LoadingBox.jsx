import React from 'react';
import { PuffLoader } from 'react-spinners';

const LoadingBox = ({ height, color="#eb7c16" }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center loading-box"
      style={{ height: height ? height : '70vh', width: '100%' }}
    >
      <PuffLoader size={60} color={color}>
        <span className="visually-hidden">Loading...</span>
      </PuffLoader>
    </div>
  );
};

export default LoadingBox;
