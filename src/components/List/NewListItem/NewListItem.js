import React from 'react'
import { Upload } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'
import { StyledItem } from '../../../components'
import { PlusOutlined } from '@ant-design/icons'

const StyledDragger = styled(Upload.Dragger)`
  display: block;
  border: none !important;
  background-color: transparent !important;
`

function NewListItem(props) {
  const { size, onClick, hasMedia, itemHeight, customRequest, beforeUpload } =
    props

  return (
    <>
      {hasMedia ? (
        <StyledItem
          size={size}
          itemHeight={itemHeight}
          onMouseDown={(e) => e.preventDefault()}>
          <StyledDragger
            multiple
            name="file"
            showUploadList={false}
            customRequest={customRequest}
            beforeUpload={beforeUpload}>
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
          itemHeight={itemHeight}
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
