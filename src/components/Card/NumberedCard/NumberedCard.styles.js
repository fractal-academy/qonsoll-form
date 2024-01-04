import styled from 'styled-components'

export const HiddenBox = styled.div`
  position: absolute;
  left: -4px;
  top: ${({ top }) => `${top ? `${top}px` : '50%'}`};
  transform: ${({ top }) => !top && 'translate(0, -50%);'};
  width: 4px;
  height: 32px;
  z-index: 600;
  border-top-left-radius: var(--qf-border-radius-sm);
  border-bottom-left-radius: var(--qf-border-radius-sm);
  background-color: var(--qf-dnd-item-badge-bg);
`
export const ContentBox = styled.div`
  ${({ current }) => `
  cursor: pointer;
  z-index: 400;
  padding: 16px 24px;
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
export const NumberBox = styled.div`
  position: absolute;
  left: -4px;
  top: ${({ top }) => `${top ? `calc(${top} + 5px)` : '50%'}`};
  transform: ${({ top }) => !top && 'translate(0, -50%);'};
  width: 24px;
  height: 22px;
  z-index: 600;
  border-top-right-radius: var(--qf-border-radius-sm);
  border-bottom-right-radius: var(--qf-border-radius-sm);
  text-align: center;
  color: var(--qf-dnd-item-badge-color);
  background-color: var(--qf-dnd-item-badge-bg);
`
