import { FastForward, FastRewind } from '@mui/icons-material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { IconButton } from '@mui/material';
import { useRef, useState } from 'react';
import screenfull from 'screenfull';
import Controls from '../../../../video/Controls';
import VideoView from '../../VideoView';
import { useEffect } from 'react';
import { useConceptRoomContext } from '@contexts/ConceptRoomContext'

let count = 0;

const VideoArea = ({ device }) => {
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlRef = useRef(null);
  const [showControls, setShowControls] = useState(false)
  const [isFullscreen, setIsFullScreen] = useState(false)
  const [state, setState] = useState({
    playing: true,
    muted: true,
    played: 0,
    duration: 0,
    volume: 1,
    loop: false,
    seeking: false,
  });
  const { isMobile } = useConceptRoomContext()

   useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        setIsFullScreen(screenfull.isFullscreen)
      });
    }
  }, [isFullscreen]);

  useEffect(() => {
    if (count > 4 && isMobile) {
      setShowControls(false)
      count = 0
    }
  }, [count]);

  const handleMouseMove = () => {
    setShowControls(true)
  };

  const handleMouseLeave = () => {
    setShowControls(false)
  };

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleProgress = (changeState) => {
    if (controlRef.current.style.visibility === 'visible') {
      count += 1;
    }
    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const handleSeekChange = (e, newValue) => {
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const handleDuration = (duration) => {
    setState({ ...state, duration });
  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    setState({ ...state, seeking: false });

    playerRef.current.seekTo(newValue / 100, 'fraction');
  };

  const toggleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current);
  };

  const handleVolumeSeekDown = (e, newValue) => {
    setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
  };

  const handleVolumeChange = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  return (
    <div
      className={`player-wrapper ${device} ${state.fullscreen ? 'fullscreen' : ''}`}
      ref={playerContainerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <VideoView
        device={device}
        playerRef={playerRef}
        state={state}
        handleProgress={handleProgress}
      />

      <div className="overlay-player">
        <div
          className={`controls ${showControls ? '' : 'hidden'}`}
          ref={controlRef}
          style={{ visibility: showControls ? 'visible' : 'hidden' }}
        >
          <div className="main-controls">
            <IconButton onClick={handleRewind}>
              <FastRewind fontSize="large" />
            </IconButton>

            <IconButton onClick={handlePlayPause}>
              {state.playing ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
            </IconButton>

            <IconButton onClick={handleFastForward}>
              <FastForward fontSize="large" />
            </IconButton>
          </div>

          <Controls
            state={state}
            setState={setState}
            handlePlayPause={handlePlayPause}
            onSeek={handleSeekChange}
            onDuration={handleDuration}
            onSeekMouseDown={handleSeekMouseDown}
            onSeekMouseUp={handleSeekMouseUp}
            onFullScreen={toggleFullScreen}
            onVolumeSeekDown={handleVolumeSeekDown}
            onVolumeChange={handleVolumeChange}
            isMobile={isMobile}
            isFullscreen={isFullscreen}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoArea;
