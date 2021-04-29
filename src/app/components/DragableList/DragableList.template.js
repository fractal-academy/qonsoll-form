import React, { useEffect, useMemo, useState } from 'react'
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from 'react-sortable-hoc'
import arrayMove from 'array-move'
import { List } from 'antd'
import { Box, Col, Row } from '@qonsoll/react-design'
import styles from './DragableList.styles'
import { DragOutlined } from '@ant-design/icons'

const DragHandle = sortableHandle(() => <DragOutlined />)

const SortableItem = sortableElement(({ children }) => (
  <Row noGutters v="center" mb={3}>
    <Col cw="auto" mr={1}>
      <DragHandle />
    </Col>
    <Col style={styles.colStyles}>{children}</Col>
  </Row>
))

const SortableContainer = sortableContainer(({ children }) => (
  <Box>{children}</Box>
))

export default function DragableList(props) {
  const { dataSource, onUpdate, renderItem, sortable = true, ...args } = props

  // [COMPONENT STATE HOOKS]
  const [sortableItems, setSortableItems] = useState([])

  // [CLEAN FUNCTIONS]
  function onSortEnd({ oldIndex, newIndex }) {
    const updatedItems = [...arrayMove(sortableItems, oldIndex, newIndex)]
    setSortableItems(updatedItems)

    if (!onUpdate) return
    onUpdate(
      updatedItems.map((i, index) => ({
        ...dataSource[i],
        order: index
      }))
    )
  }

  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true
    isComponentMounted && setSortableItems(Object.keys(dataSource))
    // [CLEAN UP FUNCTION]
    return () => {
      isComponentMounted = false
    }
  }, [dataSource])

  // [COMPUTED PROPERTIES]
  const Container = useMemo(() => (sortable ? SortableContainer : Box), [
    sortable
  ])
  const SortableWrapper = useMemo(() => (sortable ? SortableItem : Box), [
    sortable
  ])

  return (
    <Container onSortEnd={onSortEnd} useDragHandle>
      <List
        {...args}
        dataSource={sortableItems}
        renderItem={(item, index) => (
          <SortableWrapper key={`item-${index}`} index={index}>
            {renderItem ? renderItem(dataSource[item], index) : item}
          </SortableWrapper>
        )}
      />
    </Container>
  )
}
