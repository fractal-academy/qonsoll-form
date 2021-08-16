import PropTypes from 'prop-types'
import { Popconfirm } from 'antd'
import React, { cloneElement } from 'react'
import { Row, Col } from '@qonsoll/react-design'
import { LAYOUT_TYPES } from '../../../../constants'
import { useTranslation } from '../../../../context/Translation'
import { DeleteOutlined, ExclamationOutlined } from '@ant-design/icons'
import { NumberedCard, IconRoundContainer } from '../../../../components'
import { useCurrentQuestionContext } from '../../../../context/CurrentQuestion'
import { DescriptionContainer, StyledButton } from './QuestionSimpleView.styles'

function QuestionSimpleView(props) {
  const {
    title,
    action,
    number,
    layoutType,
    onClick,
    id,
    disableDelete,
    data
  } = props

  // [ADDITIONAL HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const {
    popconfirmOnDeleteQuestion,
    popconfirmOnDeleteQuestionWithConditions
  } = useTranslation()

  const hasCondtitionOnIt =
    data?.filter(
      (question) =>
        question?.questionConfigurations?.filter(
          (config) => config?.redirectQuestion === currentQuestion?.id
        )?.length > 0
    )?.length > 0

  // [COMPUTED PROPERTIES]
  const current = currentQuestion && currentQuestion.id === id
  //this one check or question includes any answerOption with redirectQuestion
  const hasConditions = currentQuestion?.questionConfigurations?.filter(
    (item, index) => item?.redirectQuestion?.length > 0
  )?.length

  return (
    <NumberedCard current={current} onClick={onClick} number={number}>
      <Row v="center" ml={2} noGutters>
        <Col cw="auto" mr={2}>
          {!!title?.length ? (
            <IconRoundContainer>
              {layoutType && cloneElement(LAYOUT_TYPES[layoutType]?.icon)}
            </IconRoundContainer>
          ) : (
            <IconRoundContainer danger>
              {layoutType &&
                cloneElement(<ExclamationOutlined style={{ color: 'red' }} />)}
            </IconRoundContainer>
          )}
        </Col>
        <Col width="150px">
          <DescriptionContainer>{title}</DescriptionContainer>
        </Col>
        <Col cw="auto">
          <Popconfirm
            placement="topRight"
            title={
              hasConditions || hasCondtitionOnIt
                ? popconfirmOnDeleteQuestionWithConditions ||
                  'This question has connected logic. Delete it?'
                : popconfirmOnDeleteQuestion || 'Delete this question?'
            }
            onConfirm={(e) => action(e, id)}
            disabled={disableDelete}
            okType="danger"
            okText="Delete">
            <StyledButton
              type="text"
              shape="circle"
              size="small"
              danger
              disabled={disableDelete}>
              <DeleteOutlined style={{ fontSize: '18px' }} />
            </StyledButton>
          </Popconfirm>
        </Col>
      </Row>
    </NumberedCard>
  )
}

QuestionSimpleView.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array,
  action: PropTypes.func,
  title: PropTypes.string,
  onClick: PropTypes.func,
  layoutType: PropTypes.string,
  disableDelete: PropTypes.bool,
  number: PropTypes.number.isRequired
}

export default QuestionSimpleView
