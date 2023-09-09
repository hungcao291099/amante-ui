import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Slider from '@mui/material/Slider';
import { IconButton } from '@mui/material';
import { VolumeUp, VolumeDown } from '@mui/icons-material';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import screenfull from 'screenfull';
import { useEffect, useState } from 'react';

const Controls = ({
  state,
  setState,
  handlePlayPause,
  onSeek,
  onDuration,
  onSeekMouseDown,
  onSeekMouseUp,
  onFullScreen,
  onVolumeSeekDown,
  onVolumeChange,
  isMobile,
  isFullScreen
}) => {
 
  const [showVolumeBar, setShowVolumeBar] = useState(false);

  return (
    <div className="custom-playbar">
      <IconButton className="play-pause-btn" onClick={handlePlayPause}>
        {state.playing ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
      </IconButton>

      <div className="right-playbar d-flex">
        <Slider
          sx={{
            color: '#fff',
            '& .MuiSlider-thumb': {
              width: 16,
              height: 16,

              '&:hover, &.Mui-focusVisible': {
                boxShadow: `none`,
              },
            },
          }}
          size="small"
          min={0}
          max={100}
          value={state.played * 100}
          onChange={onSeek}
          onDuration={onDuration}
          onMouseDown={onSeekMouseDown}
          onChangeCommitted={onSeekMouseUp}
        />

        <div
          className="volume-wrap"
          onMouseMove={() => setShowVolumeBar(true)}
          onMouseLeave={() => setShowVolumeBar(false)}
        >
          <IconButton
            onClick={() => {
              setState({ ...state, muted: !state.muted });
            }}
          >
            {state.muted ? <VolumeOffIcon /> : state.volume > 0.5 ? <VolumeUp /> : <VolumeDown />}
          </IconButton>

          {showVolumeBar && !isMobile && (
            <div className="volume-bar">
              <Slider
                sx={{
                  '& .MuiSlider-thumb': {
                    width: 8,
                    height: 8,

                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: `none`,
                    },
                  },
                  color: '#fff',
                }}
                size="medium"
                min={0}
                max={100}
                value={state.muted ? 0 : state.volume * 100}
                onChange={onVolumeChange}
                orientation="vertical"
                onMouseDown={onSeekMouseDown}
                onChangeCommitted={onVolumeSeekDown}
              />
            </div>
          )}
        </div>

        <IconButton>
          {isFullScreen ? (
            <FullscreenExitIcon onClick={onFullScreen} />
           ) : (
            <FullscreenIcon onClick={onFullScreen} />
          )} 
        </IconButton>
      </div>
    </div>
  );
};

export default Controls;
