import { Box } from '@qonsoll/react-design'
import { PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import React from 'react'
import { StyledItem } from '../../../components'
import { Upload } from 'antd'
import styled from 'styled-components'

const StyledDragger = styled(Upload.Dragger)`
  display: block;
  border: none !important;
  background-color: transparent !important;
`

function NewListItem(props) {
  const { size, onClick, hasMedia, customRequest, beforeUpload } = props

  return (
    <>
      {hasMedia ? (
        <StyledItem size={size} onMouseDown={(e) => e.preventDefault()}>
          <StyledDragger
            multiple
            name="file"
            showUploadList={false}
            beforeUpload={beforeUpload}
            customRequest={customRequest}>
            <Box
              height="120px"
              width="200px"
              display="flex"
              alignItems="center"
              justifyContent="center">
              <PlusOutlined />
            </Box>
          </StyledDragger>
        </StyledItem>
      ) : (
        <StyledItem
          size={size}
          onClick={onClick}
          onMouseDown={(e) => e.preventDefault()}>
          <PlusOutlined />
        </StyledItem>
      )}
    </>
  )
}

NewListItem.propTypes = {
  size: PropTypes.array,
  onClick: PropTypes.func
}

export default NewListItem
