import { Button } from 'antd'
import PropTypes from 'prop-types'
import Text from 'antd/lib/typography/Text'
import { styles } from './RatingTemplate.styles'
import { Box, Col, Row } from '@qonsoll/react-design'
import { QuestionSelect } from 'domains/Question/components'
import theme from 'app/styles/theme'

let startLetter = 65

function RatingTemplate(props) {
  const { answers, questionList, addRedirectQuestion } = props

  return (
    <>
      {answers.map((item, index) => (
        <Row noGutters mb={2} key={index}>
          <Col>
            <Box
              display="flex"
              alignItems="center"
              key={index}
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

RatingTemplate.propTypes = {
  answers: PropTypes.array,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}

export default RatingTemplate
