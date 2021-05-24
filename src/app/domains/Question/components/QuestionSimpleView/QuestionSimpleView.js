import PropTypes from 'prop-types'
import { cloneElement } from 'react'
import { Popconfirm, message } from 'antd'
import { LAYOUT_TYPES } from 'app/constants'
import { NumberedCard, IconRoundContainer } from 'components'
import { CloseOutlined } from '@ant-design/icons'
import COLLECTIONS from 'app/constants/collection'
import { deleteData } from 'app/services/Firestore'
import { Row, Col, Box } from '@qonsoll/react-design'
import { DescriptionContainer } from './QuestionSimpleView.styles'
function QuestionSimpleView(props) {
  const { title, number, layoutType, onClick, id } = props

  // [CLEAN FUNCTIONS]
  const handleDelete = async () => {
    await deleteData(COLLECTIONS.QUESTIONS, id).catch((e) =>
      message.error(e.message)
    )
  }

  return (
    <Box onClick={onClick}>
      <NumberedCard number={number}>
        <Row h="around" v="center" noGutters ml={2}>
          <Col cw="auto" mr={2}>
            <IconRoundContainer>
              {layoutType && cloneElement(LAYOUT_TYPES[layoutType]?.icon)}
            </IconRoundContainer>
          </Col>
          <Col width="120px">
            <DescriptionContainer>{title}</DescriptionContainer>
          </Col>
          <Col cw="auto">
            <Popconfirm title="Delete this question?" onConfirm={handleDelete}>
              <CloseOutlined />
            </Popconfirm>
          </Col>
        </Row>
      </NumberedCard>
    </Box>
  )
}

QuestionSimpleView.propTypes = {
  number: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  id: PropTypes.string,
  title: PropTypes.string,
  layoutType: PropTypes.string
}

export default QuestionSimpleView
