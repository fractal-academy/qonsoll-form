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
import { EyeFilled, SettingOutlined } from '@ant-design/icons'
import QuestionTypeSelect from 'domains/QuestionType/components/QuestionTypeSelect'
import { Col, Row, Box } from '@qonsoll/react-design'
import { styles } from './QuestionForm.styles'
import { QUESTION_TYPES, LAYOUT_TYPES } from 'app/constants'
import MediaLibraryModal from 'domains/MediaLibrary/combined/MediaLibraryModal'
import PropTypes from 'prop-types'

// import { useTranslation } from 'react-i18next'

function QuestionForm(props) {
  const { data, onQuestionTypeChange, setshowPopover, showPopover } = props
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
    },
    [QUESTION_TYPES.ENDING]: {
      component: <SubmitButton>Finish</SubmitButton>
    }
  }
  const layoutType = LAYOUT_TYPES[data?.layoutType]
  const imageShowRule =
    layoutType?.type !== LAYOUT_TYPES.BETWEEN.type &&
    layoutType?.type !== LAYOUT_TYPES.FULL_SCREEN.type &&
    layoutType?.type !== LAYOUT_TYPES.DEFAULT.type

  const bgImage =
    layoutType?.type === LAYOUT_TYPES.FULL_SCREEN.type && `url(${data?.image})`

  // [CLEAN FUNCTIONS]
  const popoverShowChange = () => {
    setshowPopover(!showPopover)
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
        backgroundImage={bgImage}>
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
                  onVisibleChange={() => {
                    setshowPopover(!showPopover)
                  }}
                  trigger={'click'}
                  placement={'bottomRight'}
                  btnType="primary"
                  btnIcon={<SettingOutlined />}
                  content={
                    <QuestionTypeSelect onClick={onQuestionTypeChange} />
                  }
                />
              </Col>
              {layoutType?.type === LAYOUT_TYPES.FULL_SCREEN.type && (
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
            {layoutType?.type === LAYOUT_TYPES.BETWEEN.type && (
              <Row>
                <Col cw="auto">
                  <Box
                    {...layoutType.imgSize}
                    backgroundRepeat="no-repeat"
                    backgroundImage={`url(${data?.image})`}
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
                  questionTypesMap[data?.questionType].component,
                  data
                )}
              </Col>
            </Row>
          </Card>
        </Col>
        {imageShowRule && (
          <Col
            v="center"
            display="flex"
            style={styles.columnStyle}
            height="100%"
            width="800px"
            order={layoutType?.imageOrder}>
            <Box
              {...layoutType?.imgSize}
              backgroundRepeat="no-repeat"
              backgroundImage={`url(${data?.image})`}
              position="relative"
              zIndex="1"
              m={2}>
              <MediaLibraryModal
                btnProps={{
                  type: 'primary',
                  icon: <EyeFilled />,
                  style: styles.modalButtonStyle
                }}
              />
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
