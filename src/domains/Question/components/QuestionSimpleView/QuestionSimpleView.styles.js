import { Button } from 'antd'
import styled from 'styled-components'

export const DescriptionContainer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  word-break: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: var(--ql-line-height-body2);
`
export const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
`
