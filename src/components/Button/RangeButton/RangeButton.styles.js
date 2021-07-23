import { Button } from 'antd'
import styled, { css } from 'styled-components'
import typeformTheme from '../../../../styles/theme'
import { blinkBackground } from '../../../animation'

export const StyledRangeButton = styled(Button)`
  ${({ theme, isActive }) => `
  width: -webkit-fill-available;
  height: 60px;
  border-color: ${
    theme?.color?.primary?.default || typeformTheme?.color?.primary?.default
  };
  background-color: ${
    isActive
      ? theme?.color?.primary?.default || typeformTheme?.color?.primary?.default
      : theme?.color?.primary?.t?.lighten5 ||
        typeformTheme?.color?.primary?.t?.lighten5
  };
  color: ${
    isActive
      ? theme?.color?.white?.default || typeformTheme?.color?.white?.default
      : theme?.color?.primary?.t?.lighten1 ||
        typeformTheme?.color?.primary?.t?.lighten1
  };

  &:hover {
    color: ${
      isActive
        ? theme?.color?.white?.default || typeformTheme?.color?.white?.default
        : theme?.color?.primary?.t?.lighten1 ||
          typeformTheme?.color?.primary?.t?.lighten1
    };
    border-color: ${
      isActive &&
      (theme?.color?.primary?.default || typeformTheme?.color?.primary?.default)
    };
    background-color: ${
      isActive
        ? theme?.color?.primary?.t?.lighten2 ||
          typeformTheme?.color?.primary?.t?.lighten2
        : theme?.color?.primary?.t?.lighten3 ||
          typeformTheme?.color?.primary?.t?.lighten3
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
