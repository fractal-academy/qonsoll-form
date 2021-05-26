import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'
import theme from '../../../../../styles/theme'

export const DescriptionContainer = styled(Box)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: ${theme.typography.lineHeight.body2};
`
