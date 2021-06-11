import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import typeformTheme from '../../../../styles/theme'

const AvatarWrapper = styled.label`
  ${({ theme }) => `
    width: 50px;
    height: 50px;
    font-size:${
      theme?.typography?.fontSize?.h4 || typeformTheme?.typography?.fontSize?.h4
    };
    border-radius: 50%;
    cursor: pointer;
    justify-content: center;
    display: flex;
    align-items: center;
    position: relative;
    color: ${
      theme?.color?.white?.default || typeformTheme?.color?.white?.default
    };
    background-color: ${
      theme?.color?.primary?.default || typeformTheme?.color?.primary?.default
    };
  `}
`

const IconLabel = (props) => {
  const { children } = props

  return <AvatarWrapper>{children}</AvatarWrapper>
}

export default IconLabel

IconLabel.propTypes = {
  children: PropTypes.node.isRequired
}
