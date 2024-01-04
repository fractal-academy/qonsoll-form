import { DescriptionContainer, StyledButton } from './QuestionSimpleView.styles'
import { IconRoundContainer, NumberedCard } from '../../../../components'
import React, { cloneElement } from 'react'

import { ExclamationOutlined } from '@ant-design/icons'
import { Icon } from '@qonsoll/icons'
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
      <div display="flex" alignItems="center">
        <div mr="8px">
          {title?.length ? (
            <IconRoundContainer>
              {layoutType && cloneElement(LAYOUT_TYPES[layoutType]?.icon)}
            </IconRoundContainer>
          ) : (
            <IconRoundContainer danger>
              {layoutType &&
                cloneElement(<ExclamationOutlined style={{ color: 'red' }} />)}
            </IconRoundContainer>
          )}
        </div>
        <div flexGrow={1}>
          <DescriptionContainer>{title}</DescriptionContainer>
        </div>
        <div ml={2}>
          {hiddenDelete ? (
            <div height="24px" width="24px" />
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
              cancelText={t('Cancel')}
              disabled={disableDelete}
              okType="danger"
            >
              <StyledButton
                type="text"
                shape="circle"
                size="small"
                danger
                disabled={disableDelete}
              >
                <Icon name="TrashFilled" size={20} />
              </StyledButton>
            </Popconfirm>
          )}
        </div>
      </div>
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
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  endings: PropTypes.array,
  hiddenDelete: PropTypes.bool
}

export default QuestionSimpleView
