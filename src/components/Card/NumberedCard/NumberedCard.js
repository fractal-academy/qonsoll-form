import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@qonsoll/react-design'
import { HiddenBox, ContentBox, NumberBox } from './NumberedCard.styles'

function NumberedCard(props) {
  const { top, number, current, children, ...args } = props

  return (
    <Box position="relative">
      <HiddenBox top={top} />
      <ContentBox current={current} {...args}>
        {children}
      </ContentBox>
      <NumberBox top={top}>{number}</NumberBox>
    </Box>
  )
}

NumberedCard.propTypes = {
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node
}

export default NumberedCard
