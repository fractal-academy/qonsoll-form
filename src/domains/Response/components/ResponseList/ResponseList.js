import React from 'react'
import useFunctions from 'feedback-typeform-app/src/hooks/useFunctions'
import { COLLECTIONS } from 'feedback-typeform-app/src/constants'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Box, Col } from '@qonsoll/react-design'
import moment from 'moment'
import { NumberedCard } from 'feedback-typeform-app/src/components'
import { EmptyState } from 'feedback-typeform-app/src/domains/Form/components/FormConditionsForm/FormConditionsForm.styles'
import { useTranslation } from '../../../../context/Translation'

function ResponseList(props) {
  const { formId } = props
  const { emptyStateDescription } = useTranslation()
  // [CUSTOM HOOKS]
  const { getCollectionRef } = useFunctions()

  // [CLEAN FUNCTIONS]
  const [userAnswerGroup] = useCollectionData(
    getCollectionRef(COLLECTIONS.USER_ANSWERS_GROUP).where(
      'formId',
      '==',
      formId
    )
  )

  return (
    <>
      {userAnswerGroup?.length > 0 ? (
        userAnswerGroup?.map((item, index) => (
          <Col cw={5} key={index} my={2}>
            <NumberedCard number={index + 1}>
              <Box ml={3} my={2}>
                {moment(item.date.toDate()).format('MMMM Do YYYY, h:mm:ss a')},
                {item.user}'s response
              </Box>
            </NumberedCard>
          </Col>
        ))
      ) : (
        <EmptyState
          description={
            emptyStateDescription || "This form doesn't have any responses yet"
          }
        />
      )}
    </>
  )
}

ResponseList.propTypes = {}

export default ResponseList
