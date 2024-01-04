import { Menu } from 'antd'
import styled from 'styled-components'

const { Item } = Menu

export const StyledMenu = styled(Menu)`
  background-color: var(--ql-body-bg);
  border-radius: var(--qf-border-radius-md);
  height: fit-content;
  border: none;
`
export const StyledItem = styled(Item)`
  display: flex;
  align-items: center;
  margin: 0 !important;
  &:last-child {
    border-bottom-left-radius: var(--qf-border-radius-md);
    border-bottom-right-radius: var(--qf-border-radius-md);
  }
  &:first-child {
    border-top-left-radius: var(--qf-border-radius-md);
    border-top-right-radius: var(--qf-border-radius-md);
  }
`
