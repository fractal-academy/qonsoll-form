import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Box } from '@qonsoll/react-design'
import QVIDEO_API_KEY from '../../constants/qvideoApiKey'
import { VideoPlayer, VideoRecording } from '../../components'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContextDispatch
} from '../../context/CurrentQuestion'

const API_KEY = process.env.REACT_APP_QVIDEO_API_KEY || QVIDEO_API_KEY

const VideoAnswer = ({ onClick, question }) => {
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  const [video, setVideo] = useState('')

  const onUpload = (videoId) => {
    videoId && setVideo(videoId)
    const data = {
      question,
      answer: { value: videoId || '' },
      answerId: uuid(),
      answerScore: 0
    }

    if (!!videoId) {
      onClick && setTimeout(onClick, 700, data)
    } else {
      onClick?.(data)
    }
  }
  const deleteVideo = () => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { videoApiKey: '' }
    })
  }

  return (
    <Box height={350} borderRadius="var(--ql-border-radius-lg)">
      {video ? (
        <VideoPlayer withDelete videoKey={video} deleteVideo={deleteVideo} />
      ) : (
        <VideoRecording apiKey={API_KEY} onUpload={onUpload} />
      )}
    </Box>
  )
}
export default VideoAnswer
