import React, { useEffect, useState, cloneElement } from 'react'
import { Card, Tag } from 'antd'
import {
  DateTimeInput,
  FileUploader,
  InputForm,
  Popover,
  QuestionHeader,
  Rate,
  TextAreaForm,
  YesnoButton,
  RangeButton,
  ChoiceForm,
  SubmitButton
} from 'components'
import { EyeFilled, PlusOutlined, SettingOutlined } from '@ant-design/icons'
import QuestionTypeSelect from 'domains/QuestionType/components/QuestionTypeSelect'
import { Col, Row, Box } from '@qonsoll/react-design'
import { styles } from './QuestionForm.styles'
import { QUESTION_TYPES, LAYOUT_TYPES } from 'app/constants'
import MediaLibraryModal from 'domains/MediaLibrary/combined/MediaLibraryModal'
import PropTypes from 'prop-types'
import MediaLibrarySimpleView from '../../../MediaLibrary/components/MediaLibrarySimpleView'

// import { useTranslation } from 'react-i18next'

const layoutSides = [
  LAYOUT_TYPES.LEFT_SIDE_BIG.type,
  LAYOUT_TYPES.LEFT_SIDE_SMALL.type,
  LAYOUT_TYPES.RIGHT_SIDE_BIG.type,
  LAYOUT_TYPES.RIGHT_SIDE_SMALL.type
]
const rightSide = [
  LAYOUT_TYPES.RIGHT_SIDE_BIG.type,
  LAYOUT_TYPES.RIGHT_SIDE_SMALL.type
]

function QuestionForm(props) {
  const {
    question,
    onQuestionTypeChange,
    setShowPopover,
    showPopover,
    setIsImageEditVisible,
    isImageEditVisible
  } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user
  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]
  const questionTypesMap = {
    [QUESTION_TYPES.WELCOME_SCREEN]: {
      component: <SubmitButton>START</SubmitButton>
    },
    [QUESTION_TYPES.YES_NO]: {
      component: <YesnoButton />
    },
    [QUESTION_TYPES.PICTURE_CHOICE]: {
      component: <ChoiceForm withImage />
    },
    [QUESTION_TYPES.OPINION_SCALE]: {
      component: <RangeButton from={1} to={5} />
    },
    [QUESTION_TYPES.RATING]: {
      component: <Rate />
    },
    [QUESTION_TYPES.SHORT_TEXT]: {
      component: (
        <InputForm btnProps={{ type: 'primary', children: 'Submit' }} />
      )
    },
    [QUESTION_TYPES.LONG_TEXT]: {
      component: (
        <TextAreaForm btnProps={{ type: 'primary', children: 'Submit' }} />
      )
    },
    [QUESTION_TYPES.DATE]: {
      component: <DateTimeInput />
    },
    [QUESTION_TYPES.FILE_UPLOAD]: {
      component: <FileUploader />
    },
    [QUESTION_TYPES.STATEMENT]: {
      component: <SubmitButton>Next</SubmitButton>
    }
  }

  const bgImage =
    question?.layoutType.type === LAYOUT_TYPES.FULL_SCREEN.type &&
    `url(https://www.awakenthegreatnesswithin.com/wp-content/uploads/2018/08/Nature-Quotes-1.jpg)`

  const imageOrder = rightSide.includes(question?.layoutType.type) ? 3 : 1
  // [CLEAN FUNCTIONS]
  const popoverShowChange = () => {
    setShowPopover(!showPopover)
  }
  const changeImageEditVisibleState = () => {
    setIsImageEditVisible(!isImageEditVisible)
  }
  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true

    // [EFFECT LOGIC]
    // write code here...
    // code sample: isComponentMounted && setState(<your data for state updation>)

    // [CLEAN UP FUNCTION]
    return () => {
      // [OTHER CLEAN UP-S (UNSUBSCRIPTIONS)]
      // write code here...

      // [FINAL CLEAN UP]
      isComponentMounted = false
    }
  }, [])

  return (
    <>
      <Row
        noGutters
        mb={2}
        height="100%"
        width="100%"
        display="flex"
        flex={1}
        style={styles.rowStyle}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundImage={bgImage && bgImage}>
        <Col
          v="center"
          order={2}
          mx={4}
          display="flex"
          style={styles.columnStyle}>
          <Card style={styles.cardStyle} bordered={false}>
            <Row noGutters>
              <Col>
                <Tag color="blue">Question 1</Tag>
              </Col>
              <Col cw="auto">
                <Popover
                  onClick={popoverShowChange}
                  visible={showPopover}
                  onVisibleChange={popoverShowChange}
                  trigger={'click'}
                  placement={'bottomRight'}
                  btnType="primary"
                  btnIcon={<SettingOutlined />}
                  content={
                    <QuestionTypeSelect onClick={onQuestionTypeChange} />
                  }
                />
              </Col>
              {question?.layoutType.type === LAYOUT_TYPES.FULL_SCREEN.type && (
                <Col cw="auto" ml={2}>
                  <MediaLibraryModal
                    btnProps={{
                      type: 'primary',
                      icon: <EyeFilled />,
                      style: styles.borderForFullScreen
                    }}
                  />
                </Col>
              )}
            </Row>
            <Row noGutters h="between" mb={4}>
              <Col cw="auto">
                <QuestionHeader
                  titlePlaceholder={'Editable question title'}
                  subtitlePlaceholder={'Description(optional)'}
                />
              </Col>
            </Row>
            {question?.layoutType.type === LAYOUT_TYPES.BETWEEN.type && (
              <Row>
                <Col cw="auto">
                  <Box
                    {...question?.layoutType.imgSize}
                    backgroundRepeat="no-repeat"
                    backgroundImage={`url(https://www.awakenthegreatnesswithin.com/wp-content/uploads/2018/08/Nature-Quotes-1.jpg)`}
                    position="relative"
                    zIndex="1"
                    mb={3}>
                    <MediaLibraryModal
                      btnProps={{
                        type: 'primary',
                        icon: <EyeFilled />,
                        style: styles.modalButtonStyle
                      }}
                    />
                  </Box>
                </Col>
              </Row>
            )}
            <Row noGutters>
              <Col>
                {cloneElement(
                  questionTypesMap[question?.questionType].component,
                  question
                )}
              </Col>
            </Row>
          </Card>
        </Col>
        {layoutSides.includes(question?.layoutType.type) && (
          <Col
            v="center"
            display="flex"
            style={styles.columnStyle}
            height="100%"
            width="800px"
            order={imageOrder}>
            <Box
              {...question?.layoutType.imgSize}
              backgroundRepeat="no-repeat"
              backgroundImage={`url(https://www.awakenthegreatnesswithin.com/wp-content/uploads/2018/08/Nature-Quotes-1.jpg)`}
              m={2}
              position="relative">
              <Row h="right">
                <Col cw="auto" mr={4}>
                  <Popover
                    // placement="topRight"
                    onClick={changeImageEditVisibleState}
                    visible={isImageEditVisible}
                    onVisibleChange={changeImageEditVisibleState}
                    trigger={'click'}
                    placement="rightTop"
                    btnType="primary"
                    btnIcon={<EyeFilled />}
                    content={
                      <Box width="192px" height="366px" overflow="hidden">
                        <MediaLibrarySimpleView
                          setIsImageEditVisible={setIsImageEditVisible}
                        />
                      </Box>
                    }
                  />
                </Col>
              </Row>
            </Box>
          </Col>
        )}
      </Row>
    </>
  )
}

QuestionForm.propTypes = {
  question: PropTypes.object
}

export default QuestionForm
