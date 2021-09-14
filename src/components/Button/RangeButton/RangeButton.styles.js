import { Button } from '@qonsoll/react-design'
import styled, { css } from 'styled-components'
import { blinkBackground } from '../../../animation'

export const StyledRangeButton = styled(Button)`
  ${({ isActive }) => `
  height: 60px;
  width: -webkit-fill-available;
  border-color: ${
    isActive ? 'var(--qf-button-color)' : 'var(--qf-active-button-color)'
  };
  background-color: ${
    isActive ? 'var(--qf-active-button-bg)' : 'var(--qf-button-bg)'
  };
  color: ${
    isActive ? 'var(--qf-button-color)' : 'var(--qf-active-button-color)'
  };

  &:hover {
    color: ${
      isActive ? 'var(--qf-active-button-color)' : 'var(--qf-button-color)'
    };
    border-color: ${isActive ? 'var(--qf-active-button-color)' : 'transparent'};
   background-color: var(--qf-active-button-bg);
  }
  ${blinkBackground}
  ${
    isActive &&
    css`
      animation: blinkBackground 0.5s ease;
    `
  }
`}
`
