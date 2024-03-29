import { ContentBox, HiddenBox, NumberBox } from './NumberedCard.styles'

import { Box } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import React from 'react'

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
  children: PropTypes.node,
  top: PropTypes.string,
  current: PropTypes.bool
}

export default NumberedCard
