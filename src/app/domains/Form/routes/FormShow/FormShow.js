import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Button, Typography } from 'antd'
import { COLLECTIONS } from 'app/constants'
import { Box } from '@qonsoll/react-design'
import { FormShowHeader } from './FormShow.style'
import { ContentCard, Spinner } from 'components'
import { useHistory, useParams } from 'react-router'
import { getCollectionRef } from 'app/services/Firestore'
import { FormAdvancedView } from 'domains/Form/components'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { QuestionAdvancedView } from 'domains/Question/components'
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons'
import ANSWERS_DISPATCH_EVENTS from 'app/context/Answers/DispatchEventsTypes'
import TypeformConfigurationContext from 'app/context/TypeformConfigurationContext'
import { useAnswersContextDispatch } from 'app/context/Answers/useAnswersContext'

const { Title } = Typography

function FormShow(props) {
  const { configurations } = props

  // [CUSTOM HOOKS]
  const answersDispatch = useAnswersContextDispatch()

  // [ADDITIONAL HOOKS]
  const history = useHistory()
  const { id } = useParams()
  const [data, loading] = useCollectionData(
    getCollectionRef(COLLECTIONS.QUESTIONS).where('formId', '==', id)
  )

  // [COMPONENT STATE HOOKS]
  const [isAnswered, setIsAnswered] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // [COMPUTED PROPERTIES]
  const sortedData = data && data.sort((a, b) => a.order - b.order)

  //temporary solution for ending logic; fix after adding logic jumps
  sortedData &&
    sortedData.forEach(
      (item) =>
        item.questionType === 'Ending' &&
        sortedData.push(sortedData.splice(sortedData.indexOf(item), 1)[0])
    )

  // [CLEAN FUNCTIONS]
  const onRestart = () => {
    window.location.reload()
  }
  const onClick = (data) => {
    !!data &&
      !!data?.answer &&
      answersDispatch({
        type: ANSWERS_DISPATCH_EVENTS.ADD_RESPONSE,
        payload: data
      })

    setIsAnswered(true)
  }

  return (
    <TypeformConfigurationContext.Provider value={configurations}>
      {loading ? (
        <Spinner />
      ) : (
        <Box height={'100%'}>
          <FormShowHeader display="flex" p={3} justifyContent="space-between">
            <Box display="flex">
              <Button
                type="text"
                size="small"
                onClick={() => history.goBack()}
                icon={<ArrowLeftOutlined />}
              />
              <Title level={5}>Live Preview</Title>
            </Box>
            <Button
              type="text"
              size="small"
              icon={<ReloadOutlined />}
              onClick={onRestart}>
              Restart
            </Button>
          </FormShowHeader>

          <ContentCard>
            <FormAdvancedView
              isAnswered={isAnswered}
              setIsAnswered={setIsAnswered}
              setCurrentSlide={setCurrentSlide}>
              {sortedData?.map((item, index) => (
                // fix height - important
                // <Box key={index} height={'750px'} overflowY="auto">
                //   <QuestionAdvancedView
                //     data={item}
                //     questionNumber={index + 1}
                //     onClick={onClick}
                //     currentSlide={currentSlide}
                //   />
                // </Box>
                <Component
                  sortedData={sortedData}
                  onClick={onClick}
                  currentSlide={currentSlide}
                  index={index}
                  item={item}
                />
              ))}
            </FormAdvancedView>
          </ContentCard>
        </Box>
      )}
    </TypeformConfigurationContext.Provider>
  )
}

const Component = ({ index, item, onClick, currentSlide, wrapperHeight }) => {
  console.log({ wrapperHeight })
  return (
    <Box key={index} height={wrapperHeight} overflowY="auto">
      <QuestionAdvancedView
        wrapperHeight={wrapperHeight}
        data={item}
        questionNumber={index + 1}
        onClick={onClick}
        currentSlide={currentSlide}
      />
    </Box>
  )
}

FormShow.propTypes = {
  configurations: PropTypes.object
}

export default FormShow
