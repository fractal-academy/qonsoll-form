import React from 'react'
import { Empty } from 'antd'
import PropTypes from 'prop-types'
import { ListItem } from '../../../components'
import { Row, Col, Box } from '@qonsoll/react-design'

function StaticList(props) {
  const {
    data,
    setEdit,
    columnWidth,
    selectedBackgroundImg,
    setSelectedBackgroundImg
  } = props

  return (
    <>
      {data?.length ? (
        <Row display="flex" width="100%" noGutters>
          {data?.map((item) => (
            <Col key={item.id} cw={columnWidth}>
              <ListItem
                data={item}
                setEdit={setEdit}
                selectedBackgroundImg={selectedBackgroundImg}
                setSelectedBackgroundImg={setSelectedBackgroundImg}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Box mt={4} width="100%" display="flex" justifyContent="center">
          <Empty />
        </Box>
      )}
    </>
  )
}

StaticList.propTypes = {
  data: PropTypes.array,
  columnWidth: PropTypes.number
}

export default StaticList
