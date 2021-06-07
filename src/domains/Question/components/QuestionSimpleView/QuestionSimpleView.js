import { Popconfirm } from 'antd'
import PropTypes from 'prop-types'
import React, { cloneElement } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { LAYOUT_TYPES } from '../../../../constants'
import { Row, Col, Box } from '@qonsoll/react-design'
import { DescriptionContainer } from './QuestionSimpleView.styles'
import { NumberedCard, IconRoundContainer } from '../../../../components'

function QuestionSimpleView(props) {
  const { title, action, number, layoutType, onClick, id } = props

  return (
    <Box onClick={onClick}>
      <NumberedCard number={number}>
        <Row h="around" v="center" ml={2} noGutters>
          <Col cw="auto" mr={2}>
            <IconRoundContainer>
              {layoutType && cloneElement(LAYOUT_TYPES[layoutType]?.icon)}
            </IconRoundContainer>
          </Col>
          <Col width="150px">
            <DescriptionContainer>{title}</DescriptionContainer>
          </Col>
          <Col cw="auto">
            <Popconfirm
              title="Delete this question?"
              onConfirm={(e) => action(e, id)}>
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
