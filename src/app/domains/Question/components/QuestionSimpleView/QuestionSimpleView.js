import { useState } from 'react'
import PropTypes from 'prop-types'
import { cloneElement } from 'react'
import { Card } from 'app/components'
import './QuestionSimpleView.styles.css'
import { LAYOUT_TYPES } from 'app/constants'
import COLLECTIONS from 'app/constants/collection'
import { deleteData } from 'app/services/Firestore'
import { Row, Col, Box } from '@qonsoll/react-design'
import { Popconfirm, message } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

function QuestionSimpleView(props) {
  const { title, number, layoutType, onClick, id } = props
  // [COMPONENT STATE HOOKS]
  const [visible, setVisible] = useState(false)

  // [CLEAN FUNCTIONS]
  const showPopconfirm = () => {
    setVisible(true)
  }
  const handleCancel = () => {
    setVisible(false)
  }

  const handleDelete = async () => {
    try {
      await deleteData(COLLECTIONS.QUESTIONS, id)
    } catch (e) {
      message.error('Oops! Something went wrong.')
    }
  }

  return (
    <Box onClick={onClick}>
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
            <Popconfirm
              title="Delete this question?"
              onConfirm={handleDelete}
              onCancel={handleCancel}>
              <CloseOutlined onClick={showPopconfirm} />
            </Popconfirm>
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
