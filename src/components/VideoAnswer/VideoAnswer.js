import React from 'react'
import { v4 as uuid } from 'uuid'
import { Box } from '@qonsoll/react-design'
import VideoRecording from '../VideoRecording'
import QVIDEO_API_KEY from '../../constants/qvideoApiKey'

const API_KEY = process.env.REACT_APP_QVIDEO_API_KEY || QVIDEO_API_KEY

const VideoAnswer = ({ onClick, isFormQuiz, question }) => {
  const onUpload = (videoId) => {
    const data = {
      question,
      answer: { value: videoId || '' },
      answerId: uuid(),
      answerScore: isFormQuiz ? 0 : ''
    }

    if (!!videoId) {
      onClick && setTimeout(onClick, 700, data)
    } else {
      onClick?.(data)
    }
  }
  return (
    <Box height={350}>
      <VideoRecording apiKey={API_KEY} onUpload={onUpload} />
    </Box>
  )
}
export default VideoAnswer
