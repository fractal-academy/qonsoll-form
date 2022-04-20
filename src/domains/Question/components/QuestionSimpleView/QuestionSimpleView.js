import { DeleteOutlined, ExclamationOutlined } from '@ant-design/icons'
import { DescriptionContainer, StyledButton } from './QuestionSimpleView.styles'
import { IconRoundContainer, NumberedCard } from '../../../../components'
import React, { cloneElement } from 'react'

import { Box } from '@qonsoll/react-design'
import { LAYOUT_TYPES } from '../../../../constants'
import { Popconfirm } from 'antd'
import PropTypes from 'prop-types'
import { useCurrentQuestionContext } from '../../../../context/CurrentQuestion'
import { useTranslations } from '@qonsoll/translation'

function QuestionSimpleView(props) {
  const {
    id,
    data,
    title,
    action,
    number,
    endings,
    onClick,
    layoutType,
    hiddenDelete,
    disableDelete
  } = props

  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()
  const currentQuestion = useCurrentQuestionContext()

  // [COMPUTED PROPERTIES]
  const hasCondtitionOnIt = !!data?.filter(
    (question) =>
      question?.questionConfigurations?.filter(
        (config) => config?.redirectQuestion === currentQuestion?.id
      )?.length
  )?.length

  const hasEndingOnIt = !!endings?.filter(
    (ending) =>
      !!ending?.questionConfigurations?.filter(
        (configEndings) =>
          configEndings?.triggerQuestionId?.split(' ')[0] ===
          currentQuestion?.id
      )?.length
  )?.length

  const current = currentQuestion && currentQuestion.id === id
  //this one check or question includes any answerOption with redirectQuestion
  const hasConditions = !!currentQuestion?.questionConfigurations?.filter(
    (item) => item?.redirectQuestion?.length > 0
  )?.length

  return (
    <NumberedCard current={current} onClick={onClick} number={number}>
      <Box display="flex" alignItems="center">
        <Box mr={2}>
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
        </Box>
        <Box flexGrow={1}>
          <DescriptionContainer>{title}</DescriptionContainer>
        </Box>
        <Box ml={2}>
          {hiddenDelete ? (
            <Box height="24px" width="24px"></Box>
          ) : (
            <Popconfirm
              placement="topRight"
              title={
                hasEndingOnIt || hasConditions || hasCondtitionOnIt
                  ? t('This question has connected logic, delete it anyway?')
                  : t('Delete this question?')
              }
              onConfirm={(e) => action(e, id)}
              okText={t('Delete')}
              disabled={disableDelete}
              okType="danger">
              <StyledButton
                type="text"
                shape="circle"
                size="small"
                danger
                disabled={disableDelete}>
                <DeleteOutlined style={{ fontSize: '18px' }} />
              </StyledButton>
            </Popconfirm>
          )}
        </Box>
      </Box>
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
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default QuestionSimpleView
