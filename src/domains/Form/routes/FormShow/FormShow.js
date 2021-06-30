import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TranslationContext } from '../../../../context/Translation'
// import { globalStyles } from '../../../../../styles'
import { useKeyPress } from '@umijs/hooks'
import { COLLECTIONS } from '../../../../constants'
// import { Button, Divider, Typography } from 'antd'
import { Box } from '@qonsoll/react-design'
import { FormAdvancedView } from '../../../../domains/Form/components'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { QuestionAdvancedView } from '../../../../domains/Question/components'
// import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons'
import useFunctions from '../../../../hooks/useFunctions'
import FirebaseContext from '../../../../context/Firebase/FirebaseContext'
import ActionsFunctionsContext from '../../../../context/ActionsFunctions/ActionsFunctionsContext'
import {
  useAnswersContextDispatch,
  ANSWERS_DISPATCH_EVENTS
} from '../../../../context/Answers'
import TypeformConfigurationContext from '../../../../context/TypeformConfigurationContext'

// const { Title } = Typography
import { ContentCard, Spinner } from '../../../../components'

function FormShow(props) {
  const {
    firebase,
    actions = {},
    id,
    translate,
    submitLoading,
    configurations,
    wrapperHeight,
    wrapperOffset
  } = props

  // [CUSTOM_HOOKS]
  const { getCollectionRef } = useFunctions(firebase)
  const answersDispatch = useAnswersContextDispatch()

  // [ADDITIONAL HOOKS]
  // const history = useHistory()
  useKeyPress(9, (e) => {
    e.preventDefault()
  })
  const [data, loading] = useCollectionData(
    getCollectionRef(COLLECTIONS.QUESTIONS).where('formId', '==', id)
  )
  // return this after adding isRequired and condition rules
  // useKeyPress('enter', (event) => {
  //   onClick()
  // })

  // [COMPONENT STATE HOOKS]
  const [isAnswered, setIsAnswered] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // [COMPUTED PROPERTIES]
  const sortedData = data && data.sort((a, b) => a.order - b.order)
  const disabledUp = currentSlide === 0
  const disabledDown = currentSlide === data?.length - 1

  //temporary solution for ending logic; fix after adding logic jumps
  sortedData &&
    sortedData.forEach(
      (item) =>
        item.questionType === 'Ending' &&
        sortedData.push(sortedData.splice(sortedData.indexOf(item), 1)[0])
    )

  // [CLEAN FUNCTIONS]
  // const onRestart = () => {
  //   window.location.reload()
  // }
  const onClick = (answerData) => {
    !!answerData &&
      answersDispatch({
        type: ANSWERS_DISPATCH_EVENTS.ADD_ANSWER,
        payload: answerData
      })

    setIsAnswered(true)
  }

  return (
    <FirebaseContext.Provider value={firebase}>
      <ActionsFunctionsContext.Provider value={actions}>
        <TranslationContext.Provider value={{ t: translate }}>
          <TypeformConfigurationContext.Provider value={configurations}>
            {loading ? (
              <Spinner />
            ) : (
              <Box>
                {/* <Row {...styles.headerRow} noGutters>
                 <Col cw="auto" v="center" p={0}>
                   <Button
                     type="text"
                     size="small"
                     // onClick={() => history.goBack()}
                     icon={<ArrowLeftOutlined />}
                   />
                 </Col>
                 <Col v="center">
                   <Box textAlign="center">
                     <Title level={5}>Live Preview</Title>
                   </Box>
                 </Col>
                 <Col cw="auto" v="center">
                   <Button
                     type="text"
                     size="small"
                     icon={<ReloadOutlined />}
                     onClick={onRestart}>
                     Restart
                   </Button>
                 </Col>
                </Row>

                <Row noGutters>
                 <Col>
                   <Divider style={globalStyles.resetMargin} />
                 </Col>
                </Row> */}

                <ContentCard
                  topOffset={wrapperOffset}
                  wrapperHeight={wrapperHeight}>
                  <FormAdvancedView
                    submitLoading={submitLoading}
                    isAnswered={isAnswered}
                    setIsAnswered={setIsAnswered}
                    currentSlide={currentSlide}
                    setCurrentSlide={setCurrentSlide}
                    disabledUp={disabledUp}
                    disabledDown={disabledDown}>
                    {sortedData?.map((item, index) => (
                      <Component
                        key={index}
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
        </TranslationContext.Provider>
      </ActionsFunctionsContext.Provider>
    </FirebaseContext.Provider>
  )
}

const Component = ({ index, item, onClick, currentSlide, wrapperHeight }) => {
  return (
    <Box key={index} height={wrapperHeight} overflowY="auto">
      <QuestionAdvancedView
        wrapperHeight={wrapperHeight}
        data={item}
        questionNumber={index}
        onClick={onClick}
        currentSlide={currentSlide}
      />
    </Box>
  )
}

FormShow.propTypes = {
  firebase: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  actions: PropTypes.shape({ onFinish: PropTypes.func }),
  submitLoading: PropTypes.bool
}

export default FormShow
