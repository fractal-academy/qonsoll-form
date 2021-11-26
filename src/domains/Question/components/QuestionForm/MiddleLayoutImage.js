import React from 'react'
import { Box } from '@qonsoll/react-design'
import {
  QuestionMediaPopover,
  QuestionImageContainer
} from '../../../../domains/Question/components'

const MiddleLayoutImage = (props) => {
  const { layoutType, url, brightness, setBrightness } = props

  return (
    <Box mb={4}>
      <QuestionImageContainer
        image={url}
        brightness={brightness}
        {...layoutType?.imgSize}>
        <Box display="flex" justifyContent="flex-end" mr={4}>
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
