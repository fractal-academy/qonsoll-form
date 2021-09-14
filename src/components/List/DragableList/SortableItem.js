import React from 'react'
import DragHandle from './DragHandle'
import { Box } from '@qonsoll/react-design'
import { sortableElement } from 'react-sortable-hoc'

const SortableItem = sortableElement(({ children }) => (
  <Box display="flex" alignItems="center" mb={2}>
    <Box mr={2}>
      <DragHandle />
    </Box>
    <Box flexGrow={1}>{children}</Box>
  </Box>
))

export default SortableItem
