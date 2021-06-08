import React from 'react'
import { Rate } from 'antd'
import styled from 'styled-components'
import { Container } from '@qonsoll/react-design'

const StyledRate = styled(Rate)`
  &.ant-rate {
    font-size: 40px;
    color: ${({ theme }) => theme.color.primary.default};
  }
`
function CustomRating(props) {
  const { allowClear, tooltips, onClick, question } = props
  const { questionConfigurations } = question

  // [CLEAN FUNCTIONS]
  const onChange = (value) => {
    const data = { question, answer: { value } }

    onClick?.(data)
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
