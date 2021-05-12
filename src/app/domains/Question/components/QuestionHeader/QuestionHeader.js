import PropTypes from 'prop-types'
import { Row, Col } from '@qonsoll/react-design'
import QuestionTitle from 'app/domains/Question/components/QuestionTitle'
import QuestionSubtitle from 'app/domains/Question/components/QuestionSubtitle'

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
