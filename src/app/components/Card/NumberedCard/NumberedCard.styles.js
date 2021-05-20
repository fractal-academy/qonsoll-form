import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'

export const HiddenBox = styled(Box)`
  ${({ theme }) => `
  position: absolute;
  top: 20px;
  width: 24px;
  height: 32px;
  border-radius: 5px;
  background-color: ${theme.color.dark.t.lighten1} ;
`}
`
export const ContentBox = styled(Box)`
  ${({ theme }) => `
  position: inherit;
  z-index: 400;
  left: 4px;
  padding: 16px;
  border-radius: 16px;
  background-color: ${theme.color.dark.t.lighten9};
  &:hover {
    background-color: ${theme.color.dark.t.lighten8};
    transition: background-color 1s;
  }
`}
`
export const NumberBox = styled(Box)`
  ${({ theme }) => `
  position: absolute;
  top: 25px;
  width: 24px;
  height: 22px;
  z-index: 600;
  border-radius: 5px;
  text-align: center;
  color: ${theme.color.white.t.lighten1};
  background-color: ${theme.color.dark.t.lighten1};
`}
`
