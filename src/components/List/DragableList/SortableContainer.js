import React from 'react'
import { Box } from '@qonsoll/react-design'
import { sortableContainer } from 'react-sortable-hoc'

const SortableContainer = sortableContainer(({ children }) => (
  <Box width="inherit">{children}</Box>
))

export default SortableContainer
