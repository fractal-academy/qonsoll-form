import styled from 'styled-components'
import { Box, Col, Row } from '@qonsoll/react-design'
import typeformTheme from '../../../../styles/theme'

export const ContentRow = styled(Row)`
  height: ${(props) => props.onEdit && '100%'};
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
export const RoundedCol = styled(Col)`
  ${({ theme }) => `
  border-radius: ${theme?.borderRadius?.md || typeformTheme?.borderRadius?.md};
  background-color: ${'var(--typeform-content-bg)'};
  `}
`
