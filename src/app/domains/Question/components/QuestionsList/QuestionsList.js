import PropTypes from 'prop-types'
import { DragableList } from 'app/components'
import QuestionSimpleView from 'app/domains/Question/components/QuestionSimpleView'

function QuestionsList(props) {
  const { data } = props

  // [CLEAN FUNCTIONS]
  const onUpdate = () => {}

  return (
    <DragableList
      itemLayout="horizontal"
      dataSource={data}
      onUpdate={onUpdate}
      renderItem={(item, index) => (
        <QuestionSimpleView {...item} number={index + 1} />
      )}
    />
  )
}

QuestionsList.propTypes = {
  data: PropTypes.array
}

export default QuestionsList
