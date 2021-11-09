import React from 'react'
import { Recorder } from '@qonsoll/qvideo'

const API_KEY = '6da3bb20-8bfb-44b6-b96a-94be93941aa0'

function VideoRecording(props) {
  const { customOptions, onUpload } = props

  return (
    <Recorder
      spinnerText="loading"
      spinnerSize="md"
      apiKey={API_KEY}
      autoStart
      isCameraConfig
      isMicroConfig
      isScreenRecord
      isNotes
      onUpload={onUpload}
      customOptions={customOptions}
    />
  )
}

export default VideoRecording
