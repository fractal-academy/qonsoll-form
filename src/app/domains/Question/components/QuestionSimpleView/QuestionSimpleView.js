import PropTypes from 'prop-types'
import { cloneElement } from 'react'
import { Card } from 'app/components'
import { Dropdown, Menu } from 'antd'
import './QuestionSimpleView.styles.css'
import { MoreOutlined } from '@ant-design/icons'
import { Row, Col, Box } from '@qonsoll/react-design'

function QuestionSimpleView(props) {
  const { description, number, icon } = props

  // [COMPUTED PROPERTIES]
  const menu = (
    <Menu>
      <Menu.Item>Duplicate</Menu.Item>
      <Menu.Item>Delete</Menu.Item>
    </Menu>
  )

  return (
    <Box mb={3}>
      <Card number={number}>
        <Row h="around" v="center" noGutters ml={2}>
          <Col cw="auto" mr={2}>
            <Box display="flex" className="roundBox">
              {cloneElement(icon, { className: 'typeIcon' })}
            </Box>
          </Col>
          <Col width="120px" className="description">
            {description}
          </Col>
          <Col cw="auto">
            <Dropdown overlay={menu} placement="bottomRight">
              {cloneElement(<MoreOutlined />, { className: 'dropdownIcon' })}
            </Dropdown>
          </Col>
        </Row>
      </Card>
    </Box>
  )
}

QuestionSimpleView.propTypes = {
  number: PropTypes.number.isRequired,
  description: PropTypes.string,
  icon: PropTypes.node
}

export default QuestionSimpleView
