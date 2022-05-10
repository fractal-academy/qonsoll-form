import { Avatar, Box, Col, Row, Text, Title } from '@qonsoll/react-design'

import { NumberedCard } from '../../../../components'
import PropTypes from 'prop-types'
import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import moment from 'moment'

function ResponseList(props) {
  const { date, user, index, onClick } = props

  // [CLEAN FUNCTIONS]
  const onItemClick = () => {
    onClick?.(user, date)
  }

  // [COMPUTED PROPERTIES]
  const formattedDate = moment(date.toDate(), 'YYYYMMDD').fromNow()

  return (
    <Box mb={2} onClick={onItemClick}>
      <NumberedCard number={index + 1}>
        <Row v="center" noGutters>
          <Col cw="auto" ml={2} mr={3}>
            <Avatar size={44} icon={<UserOutlined />} />
          </Col>
          <Col>
            <Title
              level={5}
              color="var(--qf-typography-title-color)"
              fontFamily="var(--ql-font-family-main)">
              {user}
            </Title>
            <Text color="var(--qf-typography-subtitle-color)">
              {formattedDate}
            </Text>
          </Col>
        </Row>
      </NumberedCard>
    </Box>
  )
}

ResponseList.propTypes = {
  date: PropTypes.object,
  user: PropTypes.string,
  index: PropTypes.number,
  onClick: PropTypes.func
}

export default ResponseList
