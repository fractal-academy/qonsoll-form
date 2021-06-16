import React from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'
import { Box } from '@qonsoll/react-design'
import { EditOutlined } from '@ant-design/icons'
import RangeSlider from '../../../../components/RangeSlider'
import { MediaLibraryModal } from '../../../../domains/MediaLibrary/components'
import { CustomBox, CustomText } from './MediaLibrarySimpleView.styles'
import {
  useCurrentQuestionContextDispatch,
  DISPATCH_EVENTS
} from '../../../../context/CurrentQuestion'

function MediaLibrarySimpleView(props) {
  const {
    bgImage,
    brightnessValue,
    setBrightnessValue,
    setIsImageEditVisible
  } = props

  // [ADDITIONAL HOOKS]
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [CLEAN FUNCTIONS]
  const onMediaModalContinue = (selectedImage) => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { image: selectedImage }
    })
  }
  const onBlur = () => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { imageBrightness: brightnessValue }
    })
  }

  return (
    <Box>
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
      <Box mb={32}>
        <CustomText>Image name</CustomText>
        <Input placeholder="Enter name here..." />
      </Box>
      <CustomText>Brightness</CustomText>
      <Box>
        <RangeSlider
          onBlur={onBlur}
          inputValue={brightnessValue}
          setInputValue={setBrightnessValue}
        />
      </Box>
    </Box>
  )
}

MediaLibrarySimpleView.propTypes = {
  setIsImageEditVisible: PropTypes.func,
  bgImage: PropTypes.string
}

export default MediaLibrarySimpleView
