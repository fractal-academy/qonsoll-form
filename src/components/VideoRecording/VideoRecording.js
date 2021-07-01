import React, { useState, useEffect } from 'react'
import { ZiggeoRecorder } from 'react-ziggeo'

const API_KEY = 'r1aabb2782dec6629e9650b5c6197c92'

function VideoRecording() {
  const [recorder, setRecorder] = useState(null)

  const handleUploaded = (embedding) => {
    console.log('video uploaded:', embedding.video)
  }

  return (
    <ZiggeoRecorder
      apiKey={API_KEY}
      height={180}
      width={320}
      onUploaded={handleUploaded}
      onRef={(ref) => setRecorder(ref)}
    />
  )
}

export default VideoRecording
