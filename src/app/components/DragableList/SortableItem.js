import DragHandle from './DragHandle'
import styles from './DragableList.styles'
import { Col, Row } from '@qonsoll/react-design'
import { sortableElement } from 'react-sortable-hoc'

const SortableItem = sortableElement(({ children }) => (
  <Row noGutters v="center" mb={3}>
    <Col cw="auto" mr={1}>
      <DragHandle />
    </Col>
    <Col style={styles.colStyles}>{children}</Col>
  </Row>
))

export default SortableItem
