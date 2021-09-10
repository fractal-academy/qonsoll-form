import { Row } from '@qonsoll/react-design'
import { Divider } from 'antd'
import styled from 'styled-components'

export const PopoverSwitcherRow = styled(Row)`
  display: flex;
  cursor: pointer;
  border-radius: var(--qf-border-radius-md) 0 0;
`
export const CustomDivider = styled(Divider)`
  margin-top: 0px;
  margin-bottom: 0px;
  background: var(--qf-font-color-primary);
  height: 2px;
`
