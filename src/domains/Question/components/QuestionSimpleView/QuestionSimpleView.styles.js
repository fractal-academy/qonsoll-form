import styled from 'styled-components'
import { Box, Button } from '@qonsoll/react-design'

export const DescriptionContainer = styled(Box)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  word-break: break-all;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: var(--ql-line-height-body2);
`
export const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
`
