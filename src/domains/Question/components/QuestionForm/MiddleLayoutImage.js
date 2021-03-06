import {
  QuestionImageContainer,
  QuestionMediaPopover
} from '../../../../domains/Question/components'

import { Box } from '@qonsoll/react-design'
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

export default MiddleLayoutImage
