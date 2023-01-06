import { Box, Col, Row } from '@qonsoll/react-design'

import styled from 'styled-components'

export const ContentRow = styled(Row)`
  height: ${(props) => props.onEdit && '100%'};
`

export const ImageBackground = styled(Box)`
  ${({ image, brightnessValue }) => `
  padding:0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${image});
  filter: brightness(${brightnessValue + 100}%);
  border-radius: var(--qf-border-radius-lg);
  `}
`
export const RoundedCol = styled(Col)`
  border-radius: var(--qf-border-radius-lg);
  background-color: var(--qf-content-card-bg);
`
