import React, { useState } from 'react'
import { Row, Col, Box, Title } from '@qonsoll/react-design'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useTranslation } from '../../../../context/Translation'
import { useCurrentQuestionContext } from '../../../../context/CurrentQuestion'
import {
  PopoverSwitcherRow,
  CustomDivider
} from './QuestionConfigurationPopoverContent.styles'
import {
  QuestionTypeSelect,
  QuestionConfigurationMenu
} from '../../../../domains/Question/components'

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
  const { questionTypeConfiguration, questionConfigurationTitle } =
    useTranslation()

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

  //[COMPUTED PROPERTIES]
  const configurationTitle =
    (questionConfigurationTitle &&
      `${currentQuestion?.questionType} ${questionConfigurationTitle}`) ||
    `${currentQuestion?.questionType} settings`

  return (
    <Box px={0} py={0}>
      <PopoverSwitcherRow
        noGutters
        py={2}
        h="between"
        onClick={changeQuestionConfigState}>
        <Col
          v="center"
          cw="auto"
          pr={isQuestionConfig && '0px'}
          pl={!isQuestionConfig && '0px'}
          order={isQuestionConfig ? 1 : 3}>
          {isQuestionConfig ? <LeftOutlined /> : <RightOutlined />}
        </Col>
        <Col cw="auto" order={2}>
          <Title color="var(--qf-typography-title-color)" level={4}>
            {isQuestionConfig
              ? configurationTitle
              : questionTypeConfiguration || 'Question types'}
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
