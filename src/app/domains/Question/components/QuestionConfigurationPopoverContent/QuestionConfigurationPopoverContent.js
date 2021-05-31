import React, { useState } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import { Typography } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import {
  QuestionTypeSelect,
  QuestionConfigurationMenu
} from 'domains/Question/components'
import { useCurrentQuestionContext } from 'app/context/CurrentQuestion'
import theme from 'app/styles/theme'
import { globalStyles } from 'app/styles'
import { PopoverNegativeMarin } from 'app/styles/NegativeMargin'

const { Title } = Typography
// const fs = theme.typography.fontSize.body1.replace('px', '')
// const spaceVertical = Number(fs) - 4
// const spaceHorizontal = Number(fs) + 8

function QuestionConfigurationPopoverContent(props) {
  const { onQuestionTypeChange, setShowPopover } = props

  // [ADDITIONAL HOOKS]
  const currentQuestion = useCurrentQuestionContext()

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
      <Row
        noGutters
        borderRadius={`${theme.borderRadius.md} ${theme.borderRadius.md} 0 0`}
        bg={theme.color.text.dark}
        width="300px"
        p={2}
        style={globalStyles.cursorPointer}
        onClick={changeQuestionConfigState}>
        <Col v="center" cw="auto" order={isQuestionConfig ? 1 : 3}>
          {isQuestionConfig ? <LeftOutlined /> : <RightOutlined />}
        </Col>
        <Col order={2} ml={2}>
          <Title level={4}>
            {isQuestionConfig ? currentQuestion?.questionType : 'Question Type'}
          </Title>
        </Col>
      </Row>
      <Row noGutters>
        <Col pr={0} display="block">
          {isQuestionConfig ? (
            <QuestionConfigurationMenu />
          ) : (
            <QuestionTypeSelect onClick={onQuestionTypeClick} />
          )}
        </Col>
      </Row>
    </Box>
  )
}

QuestionConfigurationPopoverContent.propTypes = {}

export default QuestionConfigurationPopoverContent
