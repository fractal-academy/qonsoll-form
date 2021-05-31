import theme from 'app/styles/theme'
import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'
import { Input, Typography, Button, Divider } from 'antd'

const { Text } = Typography

export const styles = {
  textSecondary: {
    color: theme.color.text.dark.secondary
  },

  modalBodyStyle: {
    height: '768px',
    padding: 0,
    zIndex: 10000
    // display: 'flex',
    // flexDirection: 'row'
  },
  addButton: {
    cursor: 'pointer'
  }
}
export const CustomBox = styled(Box)`
  border-radius: ${theme.borderRadius.md};
  display: flex;
  padding: 6px 16px;
  cursor: pointer;
  font-weight: 600;
  color: ${({ switchState }) =>
    switchState
      ? theme.color.primary.default
      : theme.color.text.dark.secondary};
  background-color: ${({ switchState }) =>
    switchState ? `${theme.color.white.default}` : 'none'};
`

export const CustomText = styled(Text)`
  color: ${theme.color.dark.t.lighten1};
`
export const CustomInput = styled(Input)`
  border-radius: ${theme.borderRadius.md};
`
export const CustomButton = styled(Button)`
  width: 129px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${theme.color.dark.t.lighten1};
  border-color: ${theme.color.dark.t.lighten8};
  border-radius: 8px;
  :hover {
    background-color: ${theme.color.dark.t.lighten2};
    border-color: ${theme.color.dark.t.lighten8};
  }
`
export const CustomDivider = styled(Divider)`
  height: 100%;
  padding: 0;
`
export const CustomChangeButtonText = styled(Text)`
  font-size: ${theme.typography.fontSize.body1};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.color.white.default};
`
