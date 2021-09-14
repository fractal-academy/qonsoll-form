import { Image } from 'antd'
import styled from 'styled-components'
import { FileOutlined } from '@ant-design/icons'
import { Box, Menu, Button } from '@qonsoll/react-design'

export const ItemPreview = styled(Box)`
  display: flex;
  position: relative;
  width: -webkit-fill-available;
  height: 140px;
  align-items: center;
  justify-content: center;
  border-radius: var(--qf-border-radius-md);
  background-color: var(--qf-list-item-preview);
`
export const StyledIcon = styled(FileOutlined)`
  font-size: var(--ql-font-size-h1);
  opacity: 0.5;
`
export const StyledImage = styled(Image)`
  object-fit: cover;
  border-radius: var(--qf-border-radius-md);
`
export const StyledBadge = styled(Button)`
  border-radius: var(--qf-border-radius-full);
  position: absolute;
  height: 24px;
  z-index: 100;
  padding: 4px;
  width: 24px;
  right: -14px;
  top: -14px;
`
export const StyledMenu = styled(Menu)`
  border-radius: var(--qf-border-radius-md);
`
