import React, { useState } from 'react'

import { Icon } from '@qonsoll/icons'
import { MediaLibrarySimpleView } from '../../../../domains/MediaLibrary/components'
import { Popover } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledBookmarkButton = styled.div`
  height: 48px;
  width: 48px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ql-color-accent1);
  border-radius: 0 0 var(--btn-border-radius-base) var(--btn-border-radius-base);

  &:hover {
    background: var(--ql-color-accent1-t-lighten1);
  }
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
        <div width="190px">
          <MediaLibrarySimpleView
            brightnessValue={brightnessValue}
            setBrightnessValue={setBrightnessValue}
            setIsImageEditVisible={setIsImageEditVisible}
            bgImage={MediaModalButtonBackground}
          />
        </div>
      }
    >
      <StyledBookmarkButton
        onClick={changeImageEditVisibleState}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Icon size={22} name="ImageFilled" fill="var(--ql-color-white)" />
      </StyledBookmarkButton>
    </Popover>
  )
}

QuestionMediaPopover.propTypes = {
  MediaModalButtonBackground: PropTypes.string,
  brightnessValue: PropTypes.number,
  setBrightnessValue: PropTypes.func
}

export default QuestionMediaPopover
