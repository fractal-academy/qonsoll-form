import React from 'react'
import { Rate } from 'antd'
import styled from 'styled-components'
import { Container } from '@qonsoll/react-design'
import theme from '../../../styles/theme'

const StyledRate = styled(Rate)`
  &.ant-rate {
    font-size: 40px;
    color: ${theme.color.primary.default};
  }
`
function CustomRating(props) {
  const { allowClear, tooltips, questionConfigurations, onClick, id } = props

  const onChange = (value) => {
    const data = { questionId: id, answer: value }

    onClick && onClick(data)
  }
  return (
    <Container>
      <StyledRate
        autoFocus={false}
        count={questionConfigurations?.starsAmount}
        allowClear={allowClear}
        tooltips={tooltips}
        onChange={onChange}
      />
    </Container>
  )
}

CustomRating.propTypes = {}

export { CustomRating }
