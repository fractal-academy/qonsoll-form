import React from 'react'
import DragHandle from './DragHandle'
import { Row, Col } from '@qonsoll/react-design'
import { sortableElement } from 'react-sortable-hoc'

const SortableItem = sortableElement(({ children }) => (
  <Row noGutters v="center">
    <Col cw="auto" mr={1} mb={3}>
      <DragHandle />
    </Col>
    <Col flex="auto" position="relative">
      {children}
    </Col>
  </Row>
))

export default SortableItem
