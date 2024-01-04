import React, { useEffect, useMemo, useState } from 'react'

import PropTypes from 'prop-types'
import SortableContainer from './SortableContainer'
import SortableItem from './SortableItem'
import arrayMove from 'array-move'
import styled from 'styled-components'

const UnsortableItem = styled.div`
  padding-left: 24px;
`

function DragableList(props) {
  const { dataSource, onUpdate, renderItem, sortable } = props

  // [COMPONENT STATE HOOKS]
  const [sortableItems, setSortableItems] = useState([])

  // [CLEAN FUNCTIONS]
  function onSortEnd(data) {
    const { oldIndex, newIndex } = data
    const updatedItems = [...arrayMove(sortableItems, oldIndex, newIndex)]
    setSortableItems(updatedItems)
    if (!onUpdate) return
    onUpdate(
      updatedItems?.map((i, index) => ({
        ...dataSource[i],
        order: index + 1
      }))
    )
  }
  // [COMPUTED PROPERTIES]
  const Container = useMemo(
    //FIX THIS ASAP
    () => (sortable ? SortableContainer : <></>),
    [sortable]
  )
  const SortableWrapper = useMemo(
    () => (sortable ? SortableItem : UnsortableItem),
    [sortable]
  )

  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true
    isComponentMounted && setSortableItems(Object.keys(dataSource))

    // [CLEAN UP FUNCTION]
    return () => {
      isComponentMounted = false
    }
  }, [dataSource])

  return (
    <Container onSortEnd={onSortEnd} useDragHandle>
      {sortableItems?.map((item, index) => (
        <SortableWrapper key={`item-${index}`} index={index}>
          {renderItem ? renderItem(dataSource[item], index) : item}
        </SortableWrapper>
      ))}
    </Container>
  )
}

DragableList.propTypes = {
  dataSource: PropTypes.array,
  onUpdate: PropTypes.func,
  renderItem: PropTypes.func,
  sortable: PropTypes.bool
}

export default DragableList
