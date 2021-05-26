import React from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'
import RangeSlider from 'components/RangeSlider'
import { EditOutlined } from '@ant-design/icons'
import { Col, Row } from '@qonsoll/react-design'
import { MediaLibraryModal } from 'domains/MediaLibrary/components'
import { CustomBox, CustomText } from './MediaLibrarySimpleView.styles'
import {
  useCurrentQuestionContextDispatch,
  DISPATCH_EVENTS
} from 'app/context/CurrentQuestion'

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
