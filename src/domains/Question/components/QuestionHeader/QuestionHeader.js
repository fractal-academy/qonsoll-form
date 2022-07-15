import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from '../../../../context/CurrentQuestion'
import React, { useEffect, useState } from 'react'
import {
  TextEditable,
  VideoPlayer,
  VideoRecording
} from '../../../../components'

import { Box } from '@qonsoll/react-design'
import PropTypes from 'prop-types'

function QuestionHeader(props) {
  const { titlePlaceholder, subtitlePlaceholder } = props

  // [CUSTOM HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPONENT STATE HOOKS]
  const [titleText, setTitleText] = useState()
  const [subtitleText, setSubtitleText] = useState(
    currentQuestion?.subtitle || ''
  )
  const [video, setVideo] = useState(currentQuestion?.videoApiKey || '')

  // [CLEAN FUNCTIONS]
  const onTitleBlur = async () => {
    if (currentQuestion?.title === titleText) return

    const title = titleText || ''
    await currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { title }
    })
  }
  const onSubtitleBlur = async () => {
    if (currentQuestion?.subtitle === subtitleText) return

    const subtitle = subtitleText || ''
    await currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { ...currentQuestion, subtitle }
    })
  }
  const onTitleChange = ({ target }) => {
    setTitleText(target.value)
  }
  const onSubtitleChange = ({ target }) => {
    setSubtitleText(target.value)
  }
  const onUploadedVideoQuestion = (videoToken) => {
    setVideo(videoToken)
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { videoApiKey: videoToken }
    })
  }

  const deleteVideo = () => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { videoApiKey: '' }
    })
  }

  // [USE_EFFECTS]
  useEffect(() => {
    setTitleText(currentQuestion?.title || '')
    setSubtitleText(currentQuestion?.subtitle || '')
    setVideo(currentQuestion?.videoApiKey || '')
  }, [currentQuestion])

  return (
    <>
      {currentQuestion?.isVideoQuestion ? (
        <Box
          height={350}
          position="relative"
          borderRadius="var(--ql-border-radius-lg)">
          {video ? (
            <VideoPlayer
              withDelete
              videoKey={currentQuestion?.videoApiKey}
              deleteVideo={deleteVideo}
              customOptions={{
                autoplay: false
              }}
            />
          ) : (
            <VideoRecording onUpload={onUploadedVideoQuestion} />
          )}
        </Box>
      ) : (
        <>
          <TextEditable
            isTitle
            onBlur={onTitleBlur}
            value={titleText}
            onChange={onTitleChange}
            placeholder={titlePlaceholder}
            {...props}
          />
          <TextEditable
            textSecondary
            onBlur={onSubtitleBlur}
            value={subtitleText}
            onChange={onSubtitleChange}
            placeholder={subtitlePlaceholder}
          />
        </>
      )}
    </>
  )
}

QuestionHeader.propTypes = {
  titlePlaceholder: PropTypes.string,
  subtitlePlaceholder: PropTypes.string
}

export default QuestionHeader
