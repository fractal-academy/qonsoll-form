import { Box } from '@qonsoll/react-design'
import { Upload } from 'antd'
import styled from 'styled-components'
import typeformTheme from '../../../../styles/theme'

const { Dragger } = Upload

export const UploadItem = styled(Box)`
  ${({ theme }) => `
  background-color: ${
    theme?.color?.dark?.lighten8 || typeformTheme?.color?.dark?.lighten8
  };
  border-radius: ${theme?.borderRadius?.md || typeformTheme?.borderRadius?.md}
`}
`

export const CustomDragger = styled(Dragger)`
  margin: 200px !important;

  & .ant-upload-list .ant-upload-list-text {
    margin: 200px !important;
  }
`
