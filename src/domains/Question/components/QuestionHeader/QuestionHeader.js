import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import useMedia from 'use-media'
import {
  TextEditable,
  VideoPlayer,
  VideoRecording
} from '../../../../components'
import {
  useCurrentQuestionContextDispatch,
  useCurrentQuestionContext,
  DISPATCH_EVENTS
} from '../../../../context/CurrentQuestion'
import { Container, Row, Col } from '@qonsoll/react-design'

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
    <Container>
      <Row noGutters>
        {currentQuestion?.isVideoQuestion ? (
          <Col cw={6} height={500} width={300} position="relative">
            {video ? (
              <VideoPlayer
                withDelete
                deleteVideo={deleteVideo}
                videoKey={currentQuestion?.videoApiKey}
                customOptions={{
                  autoplay: false
                }}
              />
            ) : (
              <VideoRecording onUpload={onUploadedVideoQuestion} />
            )}
          </Col>
        ) : (
          <Col cw={12}>
            <TextEditable
              isTitle
              value={titleText}
              onBlur={onTitleBlur}
              onChange={onTitleChange}
              placeholder={titlePlaceholder}
              {...props}
            />

            <TextEditable
              textSecondary
              value={subtitleText}
              onBlur={onSubtitleBlur}
              onChange={onSubtitleChange}
              placeholder={subtitlePlaceholder}
            />
          </Col>
        )}
      </Row>
    </Container>
  )
}

QuestionHeader.propTypes = {
  titlePlaceholder: PropTypes.string,
  subtitlePlaceholder: PropTypes.string
}

export default QuestionHeader
