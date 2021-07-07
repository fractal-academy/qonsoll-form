import React from 'react'
import PropTypes from 'prop-types'
import { ListItem } from '../../../components'
import { Row, Col, Box } from '@qonsoll/react-design'
import { List, Typography } from 'antd'
import { Img } from 'antd-styled'
import noData from '../../../../assets/no_data.svg'

const { Title } = Typography
function StaticList(props) {
  const {
    data,
    setEdit,
    columnWidth,
    selectedBackgroundImg,
    setSelectedBackgroundImg
  } = props

  return (
    <Row display="flex" width="100%" noGutters>
      {!!data?.length ? (
        data?.map((item) => (
          <Col key={item.id} cw={columnWidth}>
            <ListItem
              data={item}
              setEdit={setEdit}
              selectedBackgroundImg={selectedBackgroundImg}
              setSelectedBackgroundImg={setSelectedBackgroundImg}
            />
          </Col>
        ))
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          flex={1}
          justifyContent="center"
          alignItems="center">
          <Img
            style={{
              width: '350px',
              height: '350px'
            }}
            src={noData}
            alt="No data"
          />
          <Title type="secondary" level={4}>
            No data
          </Title>
        </Box>
      )}
    </Row>
  )
}

StaticList.propTypes = {
  data: PropTypes.array,
  columnWidth: PropTypes.number
}

export default StaticList
