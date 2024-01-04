import DragHandle from './DragHandle'
import React from 'react'
import { sortableElement } from 'react-sortable-hoc'

const SortableItem = sortableElement(({ children }) => (
  <div display="flex" alignItems="center" mb="8px">
    <div mr="8px">
      <DragHandle />
    </div>
    <div flexGrow={1}>{children}</div>
  </div>
))

export default SortableItem
