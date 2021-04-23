import { Badge } from 'antd'
import { styles } from './CustomBadge.styles'
import { CheckOutlined } from '@ant-design/icons'

function CustomBadge(props) {
  return <Badge count={<CheckOutlined style={styles.customBadge} />} />
}

CustomBadge.propTypes = {}

export default CustomBadge
