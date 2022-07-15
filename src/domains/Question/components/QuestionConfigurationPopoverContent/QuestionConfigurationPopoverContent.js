import { Box, Col, Row, Title } from '@qonsoll/react-design'
import {
  CustomDivider,
  PopoverSwitcherRow
} from './QuestionConfigurationPopoverContent.styles'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import {
  QuestionConfigurationMenu,
  QuestionTypeSelect
} from '../../../../domains/Question/components'
import React, { useMemo, useState } from 'react'

import { useCurrentQuestionContext } from '../../../../context/CurrentQuestion'
import { useTranslations } from '@qonsoll/translation'

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
  const { t } = useTranslations()

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
  const translatedQuestionType = useMemo(
    () =>
      currentQuestion?.questionType === 'Yes/No'
        ? `${t('Yes')}/${t('No')}`
        : t(currentQuestion?.questionType),
    [currentQuestion, t]
  )

  //[COMPUTED PROPERTIES]
  const configurationTitle = `${translatedQuestionType} ${t('settings')}`

  return (
    <Box >
      <PopoverSwitcherRow
        noGutters
        p={2}
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
          <Title
            color="var(--qf-typography-title-color)"
            fontFamily="var(--ql-font-family-main)"
            level={4}>
            {isQuestionConfig ? configurationTitle : t('Question types')}
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
