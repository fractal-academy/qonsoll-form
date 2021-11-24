import React from 'react'
import { Recorder } from '@qonsoll/qvideo'
import QVIDEO_API_KEY from '../../constants/qvideoApiKey'

const API_KEY = process.env.REACT_APP_QVIDEO_API_KEY || QVIDEO_API_KEY

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
