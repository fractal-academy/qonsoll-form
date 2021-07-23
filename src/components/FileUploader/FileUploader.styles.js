import { Box } from '@qonsoll/react-design'
import { Upload } from 'antd'
import styled from 'styled-components'
import typeformTheme from '../../../styles/theme'

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

export const IconLabel = styled.label`
  ${({ theme, disabled, isHovering }) => `
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    justify-content: center;
    display: flex;
    align-items: center;
    position: relative;
    color: ${
      theme?.color?.white?.default || typeformTheme?.color?.white?.default
    };
    background-color: ${
      isHovering
        ? theme?.color?.primary?.default ||
          typeformTheme?.color?.primary?.default
        : theme?.color?.primary?.t?.lighten1 ||
          typeformTheme?.color?.primary?.t?.lighten1
    };
  `}
`
