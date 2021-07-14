import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@qonsoll/react-design'
import RangeSlider from '../../../../components/RangeSlider'
import { useTranslation } from '../../../../context/Translation'
import { CustomBox, CustomText } from './MediaLibrarySimpleView.styles'
import { MediaLibraryModal } from '../../../../domains/MediaLibrary/components'
import {
  useCurrentQuestionContextDispatch,
  DISPATCH_EVENTS
} from '../../../../context/CurrentQuestion'
import { useHover } from '@umijs/hooks'

function MediaLibrarySimpleView(props) {
  const {
    bgImage,
    brightnessValue,
    setBrightnessValue,
    setIsImageEditVisible
  } = props

  // [ADDITIONAL HOOKS]
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()
  const [isHovering, hoverRef] = useHover()
  const { brightness } = useTranslation()

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
      <CustomBox backgroundImage={bgImage} ref={hoverRef}>
        <MediaLibraryModal
          onClick={() => {
            setIsImageEditVisible(false)
          }}
          onContinue={onMediaModalContinue}
          isHovering={isHovering}
          btnProps={{
            type: 'primary'
          }}
        />
      </CustomBox>
      <CustomText>{brightness || 'Brightness'}</CustomText>
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
