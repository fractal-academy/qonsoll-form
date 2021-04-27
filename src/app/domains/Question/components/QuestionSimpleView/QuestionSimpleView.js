import PropTypes from 'prop-types'
import { cloneElement } from 'react'
import { Card } from 'app/components'
import { Dropdown, Menu } from 'antd'
import './QuestionSimpleView.styles.css'
import { LAYOUT_TYPES } from 'app/constants'
import { MoreOutlined } from '@ant-design/icons'
import { Row, Col, Box } from '@qonsoll/react-design'

function QuestionSimpleView(props) {
  const { title, number, layoutType } = props

  // [CLEAN FUNCTIONS]

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
              {cloneElement(LAYOUT_TYPES[layoutType].icon, {
                className: 'typeIcon'
              })}
            </Box>
          </Col>
          <Col width="120px" className="description">
            {title}
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
