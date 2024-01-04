import {
  DISPATCH_EVENTS,
  useCurrentQuestionContextDispatch
} from '../../context/CurrentQuestion'
import React, { useMemo, useState } from 'react'
import { VideoPlayer, VideoRecording } from '../../components'

import PropTypes from 'prop-types'
import QVIDEO_API_KEY from '../../constants/qvideoApiKey'
import { useKeyPress } from '@umijs/hooks'
import { v4 as uuid } from 'uuid'

const API_KEY = process.env.REACT_APP_QVIDEO_API_KEY || QVIDEO_API_KEY

const VideoAnswer = (props) => {
  const { onClick, question, currentSlide } = props

  // [COMPONENT STATES]
  const [video, setVideo] = useState('')

  // [ ADDITIONAL HOOKS]
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  useKeyPress(
    (event) => event.keyCode === 13 && currentSlide === question?.order,
    (event) => {
      if (event.type === 'keyup') {
        onClick()
      }
    },
    {
      events: ['keydown', 'keyup']
    }
  )

  // [COMPUTED PROPERTIES]
  const showRecorder = useMemo(
    () => currentSlide === question?.order,
    [currentSlide, question]
  )

  // [CLEAN FUNCTIONS]
  const onUpload = (videoId) => {
    videoId && setVideo(videoId)
    const data = {
      question,
      answer: { value: videoId || '' },
      answerId: uuid(),
      answerScore: 0
    }

    if (videoId) {
      onClick && setTimeout(onClick, 700, data)
    } else {
      onClick?.(data)
    }
  }
  const handleRemoveVideo = () => {
    setVideo('')
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { videoApiKey: '' }
    })
  }

  return (
    <div height={350} borderRadius="var(--card-radius)" overflow="hidden">
      {video ? (
        <VideoPlayer
          withDelete
          videoKey={video}
          onVideoRemove={handleRemoveVideo}
        />
      ) : (
        showRecorder && (
          <VideoRecording
            disabledChapters
            apiKey={API_KEY}
            onUpload={onUpload}
          />
        )
      )}
    </div>
  )
}

VideoAnswer.propTypes = {
  onClick: PropTypes.func,
  question: PropTypes.object,
  currentSlide: PropTypes.number
}

export default VideoAnswer
