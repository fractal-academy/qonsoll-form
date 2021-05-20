import styled from 'styled-components'
import { Input, Typography } from 'antd'
import theme from 'app/styles/theme'
import { Box } from '@qonsoll/react-design'
const { Text } = Typography

export const styles = {
  textSecondary: {
    color: '#5d626a'
  },
  borderRadius: {
    borderRadius: '8px'
  },
  dividerStyles: { height: '100%', padding: '0' },
  footerButtonStyle: {
    borderRadius: '6px'
  },
  modalBodyStyle: {
    height: '768px',
    padding: 0,
    zIndex: 10000
  },
  btnFont: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#fff'
  },
  btnStyle: {
    width: '129px',
    height: '40px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#133342',
    // borderColor: ' 133342',
    border: '#133342',
    borderRadius: '8px'
  }
}
export const CustomBox = styled(Box)`
  border-radius: ${theme.borderRadius.md};
  border: none;
  display: flex;
  padding: 6px 16px;
  cursor: pointer;
  //flex-direction: row;
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
