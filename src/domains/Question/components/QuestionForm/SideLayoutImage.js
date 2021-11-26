import React from 'react'
import { Box } from '@qonsoll/react-design'
import {
  QuestionMediaPopover,
  QuestionImageContainer
} from '../../../../domains/Question/components'

const SideLayoutImage = (props) => {
  const { layoutType, url, brightness, setBrightness } = props

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      position="relative"
      alignItems="center"
      justifyContent="center">
      <QuestionImageContainer
        image={url}
        brightness={brightness}
        {...layoutType?.imgSize}
        layoutType={layoutType?.type}>
        <Box right={0} position="fixed" mr={4}>
          <QuestionMediaPopover
            brightnessValue={brightness}
            setBrightnessValue={setBrightness}
            MediaModalButtonBackground={url}
          />
        </Box>
      </QuestionImageContainer>
    </Box>
  )
}

export default SideLayoutImage
