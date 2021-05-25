import { Popconfirm } from 'antd'
import PropTypes from 'prop-types'
import { cloneElement } from 'react'
import './QuestionSimpleView.styles.css'
import { LAYOUT_TYPES } from 'app/constants'
import { NumberedCard } from 'app/components'
import { CloseOutlined } from '@ant-design/icons'
import { Row, Col, Box } from '@qonsoll/react-design'

function QuestionSimpleView(props) {
  const { title, action, number, layoutType, onClick, id } = props

  return (
    <Box onClick={onClick}>
      <NumberedCard number={number}>
        <Row h="around" v="center" noGutters ml={2}>
          <Col cw="auto" mr={2}>
            <Box display="flex" className="roundBox">
              {layoutType &&
                cloneElement(LAYOUT_TYPES[layoutType]?.icon, {
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
              onConfirm={() => action(id)}>
              <CloseOutlined />
            </Popconfirm>
          </Col>
        </Row>
      </NumberedCard>
    </Box>
  )
}

QuestionSimpleView.propTypes = {
  id: PropTypes.string,
  action: PropTypes.func,
  title: PropTypes.string,
  onClick: PropTypes.func,
  layoutType: PropTypes.string,
  number: PropTypes.number.isRequired
}

export default QuestionSimpleView
