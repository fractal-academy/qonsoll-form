import PropTypes from 'prop-types'
import { Row, Col } from '@qonsoll/react-design'
import QuestionTitle from 'domains/Question/components/QuestionTitle'
import QuestionSubtitle from 'domains/Question/components/QuestionSubtitle'

function QuestionHeader(props) {
  const { titlePlaceholder, subtitlePlaceholder } = props

  return (
    <>
      <Row noGutters>
        <Col>
          <QuestionTitle placeholder={titlePlaceholder} />
        </Col>
      </Row>
      <Row noGutters>
        <Col>
          <QuestionSubtitle placeholder={subtitlePlaceholder} />
        </Col>
      </Row>
    </>
  )
}

QuestionHeader.propTypes = {
  titlePlaceholder: PropTypes.string,
  subtitlePlaceholder: PropTypes.string
}

export default QuestionHeader
