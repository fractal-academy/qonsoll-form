import PropTypes from 'prop-types'
import styled from 'styled-components'
import typeformTheme from '../../../../styles/theme'

const IconLabel = styled.label`
  ${({ theme, disabled, isHovering }) => `
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    justify-content: center;
    display: flex;
    align-items: center;
    position: relative;
    color: ${
      theme?.color?.white?.default || typeformTheme?.color?.white?.default
    };
    background-color: ${
      isHovering
        ? theme?.color?.primary?.default ||
          typeformTheme?.color?.primary?.default
        : theme?.color?.primary?.t?.lighten1 ||
          typeformTheme?.color?.primary?.t?.lighten1
    };
   
  }
  `}
`

export default IconLabel

IconLabel.propTypes = {
  children: PropTypes.node.isRequired
}
