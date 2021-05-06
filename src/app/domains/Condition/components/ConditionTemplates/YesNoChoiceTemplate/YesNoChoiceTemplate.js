import { Button } from 'antd'
import PropTypes from 'prop-types'
import Text from 'antd/lib/typography/Text'
import { styles } from './YesNoChoiceTemplate.styles'
import { Box, Col, Row } from '@qonsoll/react-design'
import { QuestionSelect } from 'domains/Question/components'

function YesNoChoiceTemplate(props) {
  const { answers, questionList, addRedirectQuestion } = props

  return (
    <>
      {answers.map((item, index) => (
        <Row mb={2} key={index}>
          <Col>
            <Box
              display="flex"
              alignItems="center"
              p={2}
              mr={2}
              border="1px solid #bbbbbb"
              borderRadius="4px">
              <Button type="outline" style={styles.buttonM}>
                <Text strong>{item.name[0].toUpperCase()}</Text>
              </Button>
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

YesNoChoiceTemplate.propTypes = {
  answers: PropTypes.array,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}

export default YesNoChoiceTemplate
