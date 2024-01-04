import React from 'react'
import { sortableContainer } from 'react-sortable-hoc'

const SortableContainer = sortableContainer(({ children }) => (
  <div>{children}</div>
))

export default SortableContainer
