import { Typography, Divider } from 'antd'
import React, { useState } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useTranslation } from '../../../../context/Translation'
import { PopoverNegativeMarin } from '../../../../../styles/NegativeMargin'
import { useCurrentQuestionContext } from '../../../../context/CurrentQuestion'
import {
  PopoverSwitcherRow,
  CustomDivider
} from './QuestionConfigurationPopoverContent.styles'
import {
  QuestionTypeSelect,
  QuestionConfigurationMenu
} from '../../../../domains/Question/components'

const { Title } = Typography

function QuestionConfigurationPopoverContent(props) {
  const {
    questionData,
    setShowPopover,
    customQuestionTypes,
    onQuestionTypeChange,
    welcomeScreenShowRule
  } = props

  // [ADDITIONAL HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const { typeConfiguration } = useTranslation()

  // [COMPONENT STATE HOOKS]
  const [isQuestionConfig, setIsQuestionConfig] = useState(false)

  // [CLEAN FUNCTIONS]
  const changeQuestionConfigState = () => {
    setIsQuestionConfig(!isQuestionConfig)
  }
  const onQuestionTypeClick = (questionType) => {
    onQuestionTypeChange(questionType)
    setShowPopover(false)
  }
  return (
    <Box my={PopoverNegativeMarin.v} mx={PopoverNegativeMarin.h}>
      <PopoverSwitcherRow
        noGutters
        py={2}
        h="between"
        onClick={changeQuestionConfigState}>
        <Col v="center" cw="auto" order={isQuestionConfig ? 1 : 3}>
          {isQuestionConfig ? <LeftOutlined /> : <RightOutlined />}
        </Col>
        <Col cw="auto" order={2}>
          <Title level={4}>
            {isQuestionConfig
              ? `${currentQuestion?.questionType} settings`
              : typeConfiguration || 'Question types'}
          </Title>
        </Col>
      </PopoverSwitcherRow>
      <CustomDivider />
      <Row noGutters>
        <Col pr={0} display="block">
          {isQuestionConfig ? (
            <QuestionConfigurationMenu />
          ) : (
            <QuestionTypeSelect
              questionData={questionData}
              onClick={onQuestionTypeClick}
              customQuestionTypes={customQuestionTypes}
              welcomeScreenShowRule={welcomeScreenShowRule}
            />
          )}
        </Col>
      </Row>
    </Box>
  )
}

QuestionConfigurationPopoverContent.propTypes = {}

export default QuestionConfigurationPopoverContent
