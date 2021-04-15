import React, { useState } from 'react'
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from 'react-sortable-hoc'
import arrayMove from 'array-move'
import { List } from 'antd'
import { Box, Col, Row } from '@qonsoll/react-design'

const SortableItem = sortableElement(
  sortableHandle(({ children }) => (
    <Row noGutters mb={3}>
      <Col
        style={{
          cursor: 'pointer',
          pointerIvents: 'none',
          position: 'relative'
        }}>
        <Box
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 1
          }}
        />
        {children}
      </Col>
    </Row>
  ))
)

const SortableContainer = sortableContainer(({ children }) => {
  return <Box>{children}</Box>
})

function DragableList({ dataSource, onUpdate, renderItem, ...args }) {
  const [sortableItems, setSortableItems] = useState(Object.keys(dataSource))

  function defaultOnSortEnd({ oldIndex, newIndex }) {
    const updatedItems = [...arrayMove(sortableItems, oldIndex, newIndex)]
    setSortableItems(updatedItems)

    onUpdate &&
      onUpdate(
        updatedItems.map((i, index) => ({
          ...dataSource[i],
          order: index
        }))
      )
  }

  return (
    <SortableContainer onSortEnd={defaultOnSortEnd} useDragHandle>
      <List
        {...args}
        dataSource={sortableItems}
        renderItem={(item, index) => (
          <SortableItem key={`item-${index}`} index={index}>
            {renderItem ? renderItem(dataSource[item], index) : item}
          </SortableItem>
        )}
      />
    </SortableContainer>
  )
}

export default DragableList
