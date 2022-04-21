import { CustomBox, CustomText } from './MediaLibrarySimpleView.styles'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContextDispatch
} from '../../../../context/CurrentQuestion'

import { Box } from '@qonsoll/react-design'
import { MediaLibraryModal } from '../../../../domains/MediaLibrary/components'
import PropTypes from 'prop-types'
import RangeSlider from '../../../../components/RangeSlider'
import React from 'react'
import { useHover } from '@umijs/hooks'
import { useTranslations } from '@qonsoll/translation'

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
  const { t } = useTranslations()

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
      <CustomBox backgroundImage={bgImage} mb={2} ref={hoverRef}>
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
      <CustomText>{t('Brightness')}</CustomText>
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
