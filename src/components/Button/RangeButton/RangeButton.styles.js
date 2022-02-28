import styled, { css } from 'styled-components'

import { Button } from '@qonsoll/react-design'
import { blinkBackground } from '../../../animation'

export const StyledRangeButton = styled(Button)`
  ${({ isActive }) => `
  height: 60px;
  border-color: transparent;
  background-color: ${
    isActive ? 'var(--qf-button-bg-active)' : 'var(--qf-button-bg)'
  };
  color: ${
    isActive ? 'var(--qf-button-color-active)' : 'var(--qf-button-color)'
  };

  &:hover {
    transform: translate(0, -4px);
    translate: all 0.3s ease-in-out;
    border-color: transparent;
    background-color: ${
      isActive ? 'var(--qf-button-bg-active)' : 'var(--qf-button-bg-hover)'
    };
    color: ${
      isActive ? 'var(--qf-button-color-active)' : 'var(--qf-button-color)'
    };
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
