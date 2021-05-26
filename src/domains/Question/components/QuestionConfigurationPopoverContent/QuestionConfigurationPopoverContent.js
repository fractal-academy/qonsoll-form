import { Typography } from 'antd'
import React, { useState } from 'react'
import theme from '../../../../../styles/theme'
import { Row, Col } from '@qonsoll/react-design'
import { globalStyles } from '../../../../../styles'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useCurrentQuestionContext } from '../../../../context/CurrentQuestion'
import {
  QuestionTypeSelect,
  QuestionConfigurationMenu
} from '../../../../domains/Question/components'

const { Title } = Typography

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
    <>
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
        <Col pr={0}>
          {isQuestionConfig ? (
            <QuestionConfigurationMenu />
          ) : (
            <QuestionTypeSelect onClick={onQuestionTypeClick} />
          )}
        </Col>
      </Row>
    </>
  )
}

QuestionConfigurationPopoverContent.propTypes = {}

export default QuestionConfigurationPopoverContent
