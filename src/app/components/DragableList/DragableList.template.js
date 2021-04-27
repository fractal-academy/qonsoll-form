import React, { useEffect, useMemo, useState } from 'react'
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from 'react-sortable-hoc'
import { List } from 'antd'
import arrayMove from 'array-move'
import styles from './DragableList.styles'
import { setData } from 'app/services/Firestore'
import { Box, Col, Row } from '@qonsoll/react-design'
import { COLLECTIONS } from 'app/constants'

const SortableItem = sortableElement(
  sortableHandle(({ children, withWrapper }) =>
    withWrapper ? (
      <Row noGutters>
        <Col style={styles.colStyles}>
          <Box style={styles.boxStyles} />
          {children}
        </Col>
      </Row>
    ) : (
      <Box>{children}</Box>
    )
  )
)
const SortableContainer = sortableContainer(({ children }) => (
  <Box>{children}</Box>
))

function DragableList(props) {
  const {
    onItemClick,
    dataSource,
    onUpdate,
    setNewOrder,
    renderItem,
    withWrapper = true,
    sortable = true,
    ...args
  } = props

  // [COMPONENT STATE HOOKS]
  const [sortableItems, setSortableItems] = useState([])

  // [CLEAN FUNCTIONS]
  function onSortEnd({ oldIndex, newIndex }) {
    const updatedItems = [...arrayMove(sortableItems, oldIndex, newIndex)]
    setSortableItems(updatedItems)

    if (!onUpdate) return

    let items = updatedItems.map((i, index) => ({
      ...dataSource[i],
      order: index
    }))
    onUpdate(items)

    items.forEach((item) => {
      setNewOrder(item)
    })
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
          <Box
            onClick={() => onItemClick && onItemClick(dataSource[item], index)}>
            <SortableWrapper
              withWrapper={withWrapper}
              key={`item-${index}`}
              index={index}>
              {renderItem ? renderItem(dataSource[item], index) : item}
            </SortableWrapper>
          </Box>
        )}
      />
    </Container>
  )
}

export default DragableList
