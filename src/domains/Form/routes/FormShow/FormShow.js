import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { styles } from './FormShow.style'
// import { globalStyles } from '../../../../../styles'
// import { useKeyPress } from '@umijs/hooks'
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
  useAnswersContext,
  useAnswersContextDispatch
} from 'app/context/Answers/useAnswersContext'
import ANSWERS_DISPATCH_EVENTS from '~/app/context/Answers/DispatchEventsTypes'
// const { Title } = Typography

function FormShow(props) {
  const { firebase, actions, id } = props

  // [CUSTOM_HOOKS]
  const { getCollectionRef } = useFunctions(firebase)
  const answers = useAnswersContext()
  const responsesDispatch = useAnswersContextDispatch()
  // [ADDITIONAL HOOKS]
  // const history = useHistory()
  const [data] = useCollectionData(
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
  const sortedData =
    data &&
    data.sort((a, b) => (a.order > b.order ? 1 : b.order > a.order ? -1 : 0))

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
  const onClick = () => {
    !!data &&
    !!data?.answer &&
    responsesDispatch({
      type: ANSWERS_DISPATCH_EVENTS.ADD_RESPONSE,
      payload: data
    })

    setIsAnswered(true)
  }

  return (
    <FirebaseContext.Provider value={firebase}>
      <ActionsFunctionsContext.Provider value={actions}>
        <Box {...styles.mainWrapper}>
          {/*<Row {...styles.headerRow} noGutters>*/}
          {/*  <Col cw="auto" v="center" p={0}>*/}
          {/*    <Button*/}
          {/*      type="text"*/}
          {/*      size="small"*/}
          {/*      // onClick={() => history.goBack()}*/}
          {/*      icon={<ArrowLeftOutlined />}*/}
          {/*    />*/}
          {/*  </Col>*/}
          {/*  <Col v="center">*/}
          {/*    <Box textAlign="center">*/}
          {/*      <Title level={5}>Live Preview</Title>*/}
          {/*    </Box>*/}
          {/*  </Col>*/}
          {/*  <Col cw="auto" v="center">*/}
          {/*    <Button*/}
          {/*      type="text"*/}
          {/*      size="small"*/}
          {/*      icon={<ReloadOutlined />}*/}
          {/*      onClick={onRestart}>*/}
          {/*      Restart*/}
          {/*    </Button>*/}
          {/*  </Col>*/}
          {/*</Row>*/}

          {/*<Row noGutters>*/}
          {/*  <Col>*/}
          {/*    <Divider style={globalStyles.resetMargin} />*/}
          {/*  </Col>*/}
          {/*</Row>*/}

          <Box {...styles.questionContainer}>
            <FormAdvancedView
              isAnswered={isAnswered}
              setIsAnswered={setIsAnswered}
              setCurrentSlide={setCurrentSlide}>
              {sortedData?.map((item, index) => (
                <Box key={index} height="600px" overflowY="auto">
                  <QuestionAdvancedView
                    data={item}
                    questionNumber={index + 1}
                    onClick={onClick}
                    currentSlide={currentSlide}
                  />
                </Box>
              ))}
            </FormAdvancedView>
          </Box>
        </Box>
      </ActionsFunctionsContext.Provider>
    </FirebaseContext.Provider>
  )
}
FormShow.propTypes = {
  firebase: PropTypes.object
}

export default FormShow
