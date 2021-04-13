import { Badge } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

const CustomBadge = (props) => {
  return (
    <Badge
      count={
        <CheckOutlined
          style={{
            color: '#FFF',
            backgroundColor: '#1890FF',
            borderRadius: '50px',
            padding: '5px'
          }}
        />
      }></Badge>
  )
}

export default CustomBadge
