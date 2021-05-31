import React from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'
import { Box } from '@qonsoll/react-design'
import RangeSlider from 'components/RangeSlider'
import { EditOutlined } from '@ant-design/icons'
import { MediaLibraryModal } from 'domains/MediaLibrary/components'
import { CustomBox, CustomText } from './MediaLibrarySimpleView.styles'
import {
  useCurrentQuestionContextDispatch,
  DISPATCH_EVENTS
} from 'app/context/CurrentQuestion'
import { PopoverNegativeMarin } from 'app/styles/NegativeMargin'

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
    <Box
    // my={PopoverNegativeMarin.v} mx={PopoverNegativeMarin.h}
    >
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
        <CustomText>Alt text</CustomText>
        <Input placeholder="Enter alt here..." />
      </Box>
      <CustomText>Brightness</CustomText>
      <Box>
        <RangeSlider />
      </Box>
    </Box>
  )
}

MediaLibrarySimpleView.propTypes = {
  setIsImageEditVisible: PropTypes.func,
  bgImage: PropTypes.string
}

export default MediaLibrarySimpleView
