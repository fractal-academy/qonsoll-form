import React from 'react'
import { Box } from '@qonsoll/react-design'
import moment from 'moment'
import PropTypes from 'prop-types'
import { useTranslation } from '../../../../context/Translation'
import { NumberedCard } from '../../../../components'

function ResponseList(props) {
  const { date, user, index, onClick } = props
  const { userAnswerGroupResponseEnding } = useTranslation()

  // [CLEAN FUNCTIONS]
  const onItemClick = () => {
    onClick?.(user, date)
  }

  // [COMPUTED PROPERTIES]
  const formattedDate = moment(date.toDate()).format('MMMM Do YYYY, h:mm:ss a')

  return (
    <Box my={2} onClick={onItemClick}>
      <NumberedCard number={index + 1}>
        <Box ml={3} my={2}>
          {formattedDate}, {user}
          {userAnswerGroupResponseEnding || "'s response"}
        </Box>
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
