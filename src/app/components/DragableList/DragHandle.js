import styles from './DragableList.styles'
import { Box } from '@qonsoll/react-design'
import { MoreOutlined } from '@ant-design/icons'
import { sortableHandle } from 'react-sortable-hoc'

const DragHandler = sortableHandle(() => (
  <Box>
    <MoreOutlined style={styles.dragHandler} />
    <MoreOutlined />
  </Box>
))

export default DragHandler
