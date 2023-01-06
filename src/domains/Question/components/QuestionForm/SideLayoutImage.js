import {
  QuestionImageContainer,
  QuestionMediaPopover
} from '../../../../domains/Question/components'

import { Box } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import React from 'react'

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
        <Box right={0} position="fixed" mr="24px">
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

SideLayoutImage.propTypes = {
  layoutType: PropTypes.object,
  url: PropTypes.string,
  brightness: PropTypes.number,
  setBrightness: PropTypes.func
}

export default SideLayoutImage
