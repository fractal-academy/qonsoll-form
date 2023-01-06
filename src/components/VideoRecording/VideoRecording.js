import PropTypes from 'prop-types'
import QVIDEO_API_KEY from '../../constants/qvideoApiKey'
import React from 'react'
import { Recorder } from '@qonsoll/qvideo'

const API_KEY = process.env.REACT_APP_QVIDEO_API_KEY || QVIDEO_API_KEY

function VideoRecording(props) {
  const { customOptions, onUpload, disabledChapters } = props

  return (
    <Recorder
      spinnerSize="md"
      apiKey={API_KEY}
      autoStart
      isCameraConfig
      isMicroConfig
      isScreenRecord
      isNotes
      isLink
      isChapters={disabledChapters ? false : true}
      onUpload={onUpload}
      customOptions={customOptions}
    />
  )
}

VideoRecording.propTypes = {
  customOptions: PropTypes.array,
  onUpload: PropTypes.func,
  disabledChapters: PropTypes.bool
}

export default VideoRecording
