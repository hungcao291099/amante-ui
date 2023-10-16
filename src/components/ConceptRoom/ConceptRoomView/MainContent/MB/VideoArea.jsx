import { useRef } from 'react';

import { useConceptRoomContext } from '@contexts/ConceptRoomContext';
import { isValidUrl } from '../../../../../utils/functions';
// import VideoView from '../../VideoView';

const VideoArea = ({ device }) => {
  const { room } = useConceptRoomContext();
  const playerRef = useRef(null);

  if (!isValidUrl(room.bg_url)) {
    return null;
  }

  return (
    <div className={`player-wrapper ${device}`}>
      {/* <VideoView
        playerRef={playerRef}
      /> */}
    </div>
  );
};

export default VideoArea;
