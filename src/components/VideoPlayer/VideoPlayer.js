import React, { useState } from 'react'
import { ZiggeoPlayer } from 'react-ziggeo'

const API_KEY = 'r1aabb2782dec6629e9650b5c6197c92'

function VideoPlayer(props) {
  const {
    videoKey,
    onPlaying,
    onPaused,
    onAttached,
    onLoaded,
    onEnded,
    onError,
    onSeek
  } = props

  const [player, setPlayer] = useState(null)

  //   useEffect(() => {
  //     if (player) {
  //       // DO stuff here
  //       player.on('attached', function (embedding) {}, player)
  //     }
  //   }, [player])

  return (
    <ZiggeoPlayer
      apiKey={API_KEY}
      video={videoKey}
      theme={'modern'}
      themecolor={'red'}
      skipinitial={false}
      onPlaying={onPlaying}
      onPaused={onPaused}
      onAttached={onAttached}
      onLoaded={onLoaded}
      onEnded={onEnded}
      onError={onError}
      onSeek={onSeek}
      onRef={(ref) => setPlayer(ref)}
    />
  )
}

export default VideoPlayer
