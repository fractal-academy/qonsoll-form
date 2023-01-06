import {
  QuestionImageContainer,
  QuestionMediaPopover
} from '../../../../domains/Question/components'

import { Box } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import React from 'react'

const MiddleLayoutImage = (props) => {
  const { layoutType, url, brightness, setBrightness, tabletSupport } = props

  return (
    <Box mb="24px">
      <QuestionImageContainer
        image={url}
        brightness={brightness}
        {...layoutType?.imgSize}
        tabletSupport={tabletSupport}>
        <Box display="flex" justifyContent="flex-end" mr="24px">
          <QuestionMediaPopover
            brightnessValue={brightness}
            MediaModalButtonBackground={url}
            setBrightnessValue={setBrightness}
          />
        </Box>
      </QuestionImageContainer>
    </Box>
  )
}

MiddleLayoutImage.propTypes = {
  layoutType: PropTypes.object,
  url: PropTypes.string,
  brightness: PropTypes.number,
  setBrightness: PropTypes.func,
  tabletSupport: PropTypes.bool
}

export default MiddleLayoutImage
