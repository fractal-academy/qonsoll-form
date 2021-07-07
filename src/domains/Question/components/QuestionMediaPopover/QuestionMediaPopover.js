import { Popover, Button } from 'antd'
import React, { useState } from 'react'
import { Box } from '@qonsoll/react-design'
import { EditOutlined } from '@ant-design/icons'
import { MediaLibrarySimpleView } from '../../../../domains/MediaLibrary/components'
import { PopoverNegativeMarin } from '../../../../../styles/NegativeMargin'

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
        <Box width="192px" mx={PopoverNegativeMarin.h / 2}>
          <MediaLibrarySimpleView
            brightnessValue={brightnessValue}
            setBrightnessValue={setBrightnessValue}
            setIsImageEditVisible={setIsImageEditVisible}
            bgImage={MediaModalButtonBackground}
          />
        </Box>
      }>
      <Button
        type="primary"
        icon={<EditOutlined />}
        onClick={changeImageEditVisibleState}
        onMouseDown={(e) => e.preventDefault()}
      />
    </Popover>
  )
}

QuestionMediaPopover.propTypes = {}

export default QuestionMediaPopover
