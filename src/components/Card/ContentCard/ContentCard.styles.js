import { Box, Col, Row } from '@qonsoll/react-design'
import styled from 'styled-components'
import typeformTheme from '../../../../styles/theme'

export const ContentRow = styled(Row)`
  height: ${(props) => props.onEdit && '100%'};
`

export const ContentColumn = styled(Col)`
  ${({ theme, image }) => `
  flex: 1;
  position: relative;
  background: ${
    !image &&
    (theme?.color?.white.default || typeformTheme?.color.white.default)
  };
  border-radius: ${theme?.borderRadius?.md || typeformTheme?.borderRadius?.md};
  `}
`
export const ImageBackground = styled(Box)`
  ${({ theme, image, brightnessValue }) => `
  padding:0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${image});
  filter: brightness(${brightnessValue + 100}%);
  border-radius: ${theme?.borderRadius?.md || typeformTheme?.borderRadius?.md};
  `}
`
export const RoundedRow = styled(Row)`
  ${({ theme }) => `
  border-radius: ${
    theme?.borderRadius?.md || typeformTheme?.borderRadius?.md
  };`}
`
