import {
  DISPATCH_EVENTS,
  useCurrentQuestionContextDispatch
} from '../../../../context/CurrentQuestion'

import { CustomBox } from './MediaLibrarySimpleView.styles'
import { MediaLibraryModal } from '../../../../domains/MediaLibrary/components'
import PropTypes from 'prop-types'
import RangeSlider from '../../../../components/RangeSlider'
import React from 'react'
import { Typography } from 'antd'
import { useHover } from '@umijs/hooks'
import { useTranslations } from '@qonsoll/translation'

const { Text } = Typography

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
    <div>
      <CustomBox backgroundImage={bgImage} mb="16px" ref={hoverRef}>
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

      <Text>{t('Brightness')}</Text>

      <RangeSlider
        onBlur={onBlur}
        inputValue={brightnessValue}
        setInputValue={setBrightnessValue}
      />
    </div>
  )
}

MediaLibrarySimpleView.propTypes = {
  setIsImageEditVisible: PropTypes.func,
  bgImage: PropTypes.string,
  brightnessValue: PropTypes.number,
  setBrightnessValue: PropTypes.func
}

export default MediaLibrarySimpleView
