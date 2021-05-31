import React from 'react'
import PropTypes from 'prop-types'
import { ListItem } from '../../../components'
import { Row, Col } from '@qonsoll/react-design'

function StaticList(props) {
  const {
    data,
    columnWidth,
    selectedBackgroundImg,
    setSelectedBackgroundImg,
    onClick,
    disableAddButton
  } = props

  return (
    <Row display="flex" width="100%" noGutters>
      {data?.map((item) => (
        <Col key={item.id} cw={columnWidth}>
          <ListItem
            data={item}
            selectedBackgroundImg={selectedBackgroundImg}
            setSelectedBackgroundImg={setSelectedBackgroundImg}
          />
        </Col>
      ))}
    </Row>
  )
}

StaticList.propTypes = {
  data: PropTypes.array,
  columnWidth: PropTypes.number
}

export default StaticList
