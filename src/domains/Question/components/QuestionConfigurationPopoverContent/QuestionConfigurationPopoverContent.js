import { Typography } from 'antd'
import React, { useState } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import theme from '../../../../../styles/theme'
import { globalStyles } from '../../../../../styles'
import { PopoverNegativeMarin } from '../../../../../styles/NegativeMargin'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useCurrentQuestionContext } from '../../../../context/CurrentQuestion'
import { useTranslation } from '../../../../context/Translation'
import {
  QuestionTypeSelect,
  QuestionConfigurationMenu
} from '../../../../domains/Question/components'
import { PopoverSwitcherRow } from './QuestionConfigurationPopoverContent.styles'

const { Title } = Typography

function QuestionConfigurationPopoverContent(props) {
  const { onQuestionTypeChange, setShowPopover, customQuestionTypes } = props

  // [ADDITIONAL HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const { t } = useTranslation()

  // [COMPONENT STATE HOOKS]
  const [isQuestionConfig, setIsQuestionConfig] = useState(false)

  // [CLEAN FUNCTIONS]
  const changeQuestionConfigState = () => {
    setIsQuestionConfig(!isQuestionConfig)
  }
  const onQuestionTypeClick = (data) => {
    onQuestionTypeChange(data)
    setShowPopover(false)
  }
  return (
    <Box my={PopoverNegativeMarin.v} mx={PopoverNegativeMarin.h}>
      <PopoverSwitcherRow noGutters p={2} onClick={changeQuestionConfigState}>
        <Col v="center" cw="auto" order={isQuestionConfig ? 1 : 3}>
          {isQuestionConfig ? <LeftOutlined /> : <RightOutlined />}
        </Col>
        <Col order={2} ml={2}>
          <Title level={4}>
            {isQuestionConfig
              ? currentQuestion?.questionType
              : t('Question Type')}
          </Title>
        </Col>
      </PopoverSwitcherRow>
      <Row noGutters>
        <Col pr={0} display="block">
          {isQuestionConfig ? (
            <QuestionConfigurationMenu />
          ) : (
            <QuestionTypeSelect
              onClick={onQuestionTypeClick}
              customQuestionTypes={customQuestionTypes}
            />
          )}
        </Col>
      </Row>
    </Box>
  )
}

QuestionConfigurationPopoverContent.propTypes = {}

export default QuestionConfigurationPopoverContent
