import React from 'react'
import PropTypes from 'prop-types'
import theme from 'app/styles/theme'
import Text from 'antd/lib/typography/Text'
import { Box, Col, Row } from '@qonsoll/react-design'
import { styles } from './OpinionScaleTemplate.styles'
import { QuestionSelect } from 'domains/Question/components'

let startLetter = 65

function OpinionScaleTemplate(props) {
  const { answers, questionList, addRedirectQuestion } = props

  return (
    <>
      {answers.map((item, index) => (
        <Row noGutters mb={2} key={index}>
          <Col>
            <Box
              display="flex"
              alignItems="center"
              bg={theme.color.dark.t.lighten9}
              p={`${theme.grid.gutters.sm / 2 - 2}px`}
              mr={4}
              border="1px solid"
              borderColor={theme.color.dark.t.lighten5}
              borderRadius={theme.borderRadius.md}>
              <Box style={styles.buttonM}>
                <Text strong>{String.fromCharCode(startLetter++)}</Text>
              </Box>
              {item.name}
            </Box>
          </Col>
          <Col>
            <QuestionSelect
              addRedirectQuestion={addRedirectQuestion}
              answers={answers}
              index={index}
              questionList={questionList}
            />
          </Col>
        </Row>
      ))}
    </>
  )
}

OpinionScaleTemplate.propTypes = {
  answers: PropTypes.array,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}

export default OpinionScaleTemplate
