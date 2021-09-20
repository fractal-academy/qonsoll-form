import styled from 'styled-components'
import { Popover, Button } from 'antd'
import React, { useState } from 'react'
import { Box } from '@qonsoll/react-design'
import { PictureOutlined } from '@ant-design/icons'
import { MediaLibrarySimpleView } from '../../../../domains/MediaLibrary/components'

const StyledBookmarkButton = styled(Button)`
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`

function QuestionMediaPopover(props) {
  const { MediaModalButtonBackground, brightnessValue, setBrightnessValue } =
    props

  // [COMPONENT STATE HOOKS]
  const [isImageEditVisible, setIsImageEditVisible] = useState(false)

  // [CLEAN FUNCTIONS]
  const changeImageEditVisibleState = () => {
    setIsImageEditVisible(!isImageEditVisible)
  }

  return (
    <Popover
      visible={isImageEditVisible}
      onVisibleChange={changeImageEditVisibleState}
      trigger="click"
      placement="rightTop"
      content={
        <Box width="190px">
          <MediaLibrarySimpleView
            brightnessValue={brightnessValue}
            setBrightnessValue={setBrightnessValue}
            setIsImageEditVisible={setIsImageEditVisible}
            bgImage={MediaModalButtonBackground}
          />
        </Box>
      }>
      <StyledBookmarkButton
        type="primary"
        icon={<PictureOutlined />}
        onClick={changeImageEditVisibleState}
        onMouseDown={(e) => e.preventDefault()}
      />
    </Popover>
  )
}

QuestionMediaPopover.propTypes = {}

export default QuestionMediaPopover
