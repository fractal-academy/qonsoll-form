import { Box } from '@qonsoll/react-design'
import styled from 'styled-components'
import theme from 'app/styles/theme'

export const DescriptionContainer = styled(Box)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: ${theme.typography.lineHeight.body2};
`
