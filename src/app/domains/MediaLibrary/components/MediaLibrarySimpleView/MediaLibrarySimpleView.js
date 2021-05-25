import React from 'react'
import { Box, Col, Row } from '@qonsoll/react-design'
import { EditOutlined } from '@ant-design/icons'
import { CustomBox, CustomText, styles } from './MediaLibrarySimpleView.styles'
import { MediaLibraryModal } from 'domains/MediaLibrary/components'
import { Input } from 'antd'
import RangeSlider from 'components/RangeSlider'
import {
  useCurrentQuestionContextDispatch,
  DISPATCH_EVENTS
} from 'app/context/CurrentQuestion'
import PropTypes from 'prop-types'

function MediaLibrarySimpleView(props) {
  const { setIsImageEditVisible, bgImage } = props

  // [CUSTOM HOOKS]
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [CLEAN FUNCTIONS]
  const onMediaModalContinue = (selectedImage) => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { image: selectedImage }
    })
  }

  return (
    <Row noGutters>
      <Col>
        <Row noGutters mb={4}>
          <Col>
            <CustomBox backgroundImage={bgImage}>
              <MediaLibraryModal
                onClick={() => {
                  setIsImageEditVisible(false)
                }}
                onContinue={onMediaModalContinue}
                btnProps={{
                  type: 'primary',
                  icon: <EditOutlined />
                }}
              />
            </CustomBox>
          </Col>
        </Row>
        <Row noGutters mb={4}>
          <Col>
            <CustomText>Alt text</CustomText>
            <Input placeholder="Enter alt here..." />
          </Col>
        </Row>
        <Row noGutters>
          <Col>
            <Row noGutters>
              <Col>
                <CustomText>Brightness</CustomText>
              </Col>
            </Row>
            <Row noGutters>
              <Col>
                <RangeSlider />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

MediaLibrarySimpleView.propTypes = {
  setIsImageEditVisible: PropTypes.bool,
  bgImage: PropTypes.string
}

export default MediaLibrarySimpleView
