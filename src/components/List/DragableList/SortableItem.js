import { Box } from '@qonsoll/react-design'
import DragHandle from './DragHandle'
import React from 'react'
import { sortableElement } from 'react-sortable-hoc'

const SortableItem = sortableElement(({ children }) => (
  <Box display="flex" alignItems="center" mb="8px">
    <Box mr="8px">
      <DragHandle />
    </Box>
    <Box flexGrow={1}>{children}</Box>
  </Box>
))

export default SortableItem
