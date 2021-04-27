import PropTypes from 'prop-types'
import { DragableList } from 'app/components'
import QuestionSimpleView from 'app/domains/Question/components/QuestionSimpleView'

function QuestionsList(props) {
  const { data, setNewOrder, onItemClick } = props

  // [CLEAN FUNCTIONS]
  const onUpdate = () => {}

  return (
    <DragableList
      withWrapper={false}
      onItemClick={onItemClick}
      itemLayout="horizontal"
      dataSource={data}
      onUpdate={onUpdate}
      setNewOrder={setNewOrder}
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
