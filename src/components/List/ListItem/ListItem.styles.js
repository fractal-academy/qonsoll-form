import { FileOutlined } from '@ant-design/icons'
import { Box } from '@qonsoll/react-design'
import { Button, Image } from 'antd'
import styled from 'styled-components'
import typeformTheme from '../../../../styles/theme'

export const ItemPreview = styled(Box)`
  display: flex;
  position: relative;
  width: -webkit-fill-available;
  height: 140px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme?.color?.white?.default || typeformTheme?.color?.white?.default};
`
export const StyledIcon = styled(FileOutlined)`
  font-size: 40px;
  opacity: 0.5;
`
export const StyledImage = styled(Image)`
  object-fit: cover;
  border-radius: 8px;
`
export const StyledBadge = styled(Button)`
  position: absolute;
  border-radius: 50%;
  height: 24px;
  z-index: 100;
  padding: 3px;
  width: 24px;
  right: -14px;
  top: -14px;
`
