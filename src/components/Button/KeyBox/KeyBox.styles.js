import { Box } from '@qonsoll/react-design'
import Text from 'antd/lib/typography/Text'
import styled, { css } from 'styled-components'
import typeformTheme from '../../../../styles/theme'
import { blinkBackground } from '../../../animation'

export const StyledKeybox = styled(Box)`
  position: absolute;
  top: ${({ hasImages }) => (hasImages ? '15px' : '8px')};
  border-width: 1px;
  text-align: center;
  border-style: solid;
  border-color: ${({ theme }) =>
    theme?.color?.primary?.default || typeformTheme?.color?.primary?.default};
  color: ${({ isActive, theme }) =>
    isActive &&
    (theme?.color?.white?.default || typeformTheme?.color?.white?.default)};
  margin-left: ${({ isHovering, phoneSmall }) =>
    isHovering && phoneSmall ? '' : isHovering && '-40px'};
  background-color: ${({ isActive, theme }) =>
    isActive
      ? theme?.color?.primary?.default || typeformTheme?.color?.white?.default
      : theme?.color?.white?.default || typeformTheme?.color?.white?.default};
  width: ${({ isHovering, phoneSmall }) =>
    isHovering && !phoneSmall ? '66px !important' : '26px !important'};
`
export const ImageContainer = styled(Box)`
  width: 100%;
  height: ${({ phoneSmall }) => (phoneSmall ? '200px' : '100px')};
  border-radius: 8px;
  margin-bottom: 8px;
  background-size: cover;
  background-image: url(${({ image }) => image});
`
export const StyledButton = styled(Box)`
  position: relative;
  width: 100%;
  border-radius: 8px;
  padding: 8px;
  height: 100%;
  color: ${({ theme }) =>
    theme?.color?.primary?.default || typeformTheme?.color?.primary?.default};
  background-color: ${({ theme, isActive }) =>
    isActive
      ? theme?.color?.primary?.t?.lighten2 ||
        typeformTheme?.color?.primary?.t?.lighten2
      : theme?.color?.primary?.t?.lighten5 ||
        typeformTheme?.color?.primary?.t?.lighten5};
  &:hover {
    background-color: ${({ theme }) =>
      theme?.color?.primary?.t?.lighten3 ||
      typeformTheme?.color?.primary?.t?.lighten3};
  }
  ${blinkBackground}
  ${({ isActive }) =>
    isActive &&
    css`
      animation: blinkBackground 0.5s ease;
    `}
`
export const StyledText = styled(Text)`
  width: ${({ hasImages, phoneSmall }) =>
    hasImages ? (phoneSmall ? '100%' : '15ch') : '100%'};
  padding-left: ${({ hasImages }) => (hasImages ? '0' : '30px')};
  word-break: break-word;
`
