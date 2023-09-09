import { useConceptRoomContext } from '@contexts/ConceptRoomContext';
import ReactPlayer from 'react-player';

const VideoView = ({ playerRef, state, handleProgress }) => {
  const { room } = useConceptRoomContext();

  return (
    <ReactPlayer
      key={room.concept_room_seq}
      ref={playerRef}
      className={`video-img react-player`}
      url={room.bg_url}
      width="100%"
      height="100%"
      playing={state?.playing}
      muted={state?.muted}
      volume={state?.volume}
      loop
      playsinline
      onProgress={handleProgress}
      config={{
        file: {
          attributes: {
            crossorigin: 'anonymous',
          },
        },
      }}
    />
  );
};

export default VideoView;
