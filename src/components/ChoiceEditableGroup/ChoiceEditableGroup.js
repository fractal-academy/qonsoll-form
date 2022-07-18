import { AddNewChoiceBox, styles } from './ChoiceEditableGroup.styles'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from '../../context/CurrentQuestion'

import { Box } from '@qonsoll/react-design'
import { ChoiceEditable } from '../../components'
import { Icon } from '@qonsoll/icons'
import { List } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { v4 as uuid } from 'uuid'

// const pictureGrid = {
//   gutter: [24, 16],
//   xs: 1,
//   sm: 1,
//   md: 2,
//   lg: 2,
//   xl: 3,
//   xxl: 5
// }
const choiceGrid = {
  xs: 1,
  sm: 1,
  md: 1,
  lg: 1,
  xl: 1,
  xxl: 1
}

function ChoiceEditableGroup(props) {
  const { withImage } = props

  // [ADDITIONAL HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPUTED PROPERTIES]
  const choiceProps = currentQuestion.questionConfigurations || []
  const listData = [...choiceProps, { isCreate: true }]

  // [CLEAN FUNCTIONS]
  const onAddChoice = () => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: {
        questionConfigurations: choiceProps
          ? [
              ...choiceProps,
              {
                image: '',
                answerOption: '',
                redirectQuestion: '',
                answerOptionId: uuid(),
                redirectConditionRule: ''
              }
            ]
          : [
              {
                image: '',
                answerOption: '',
                redirectQuestion: '',
                answerOptionId: uuid(),
                redirectConditionRule: ''
              }
            ]
      }
    })
  }

  return (
    <List
      grid={choiceGrid}
      dataSource={listData}
      renderItem={(item, index) =>
        item?.isCreate ? (
          <List.Item>
            <AddNewChoiceBox
              height={withImage ? '146px' : '48px'}
              onClick={onAddChoice}>
              <Icon name="PlusOutlined" size={20} />
            </AddNewChoiceBox>
          </List.Item>
        ) : (
          <List.Item key={item?.id || index}>
            <ChoiceEditable
              key={index}
              data={item}
              index={index}
              withImage={withImage}
            />
          </List.Item>
        )
      }
    />
  )
}

ChoiceEditableGroup.propTypes = {
  withImage: PropTypes.bool
}

export default ChoiceEditableGroup
