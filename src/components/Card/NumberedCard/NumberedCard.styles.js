import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'

export const HiddenBox = styled(Box)`
  position: absolute;
  top: 20px;
  width: 4px;
  height: 32px;
  z-index: 600;
  border-top-left-radius: var(--qf-border-radius-sm);
  border-bottom-left-radius: var(--qf-border-radius-sm);
  background-color: var(--qf-dnd-item-badge-bg);
`
export const ContentBox = styled(Box)`
  ${({ current }) => `
  position: inherit;
  z-index: 400;
  left: 4px;
  cursor: pointer;
  padding: 16px;
  border-radius: 16px;
  background-color: ${
    (current && 'var(--qf-dnd-active-item-bg)') || 'var(--qf-dnd-item-bg)'
  };
  &:hover {
  background-color:  ${
    (current && 'var(--qf-dnd-active-item-hover)') || 'var(--qf-dnd-item-hover)'
  };
  }
`}
`
export const NumberBox = styled(Box)`
  position: absolute;
  top: 25px;
  width: 24px;
  height: 22px;
  z-index: 600;
  border-top-right-radius: var(--qf-border-radius-sm);
  border-bottom-right-radius: var(--qf-border-radius-sm);
  text-align: center;
  color: var(--qf-dnd-item-badge-color);
  background-color: var(--qf-dnd-item-badge-bg);
`
