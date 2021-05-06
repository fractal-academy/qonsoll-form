import { Card, Tag } from 'antd'
import { cloneElement } from 'react'
import {
  Rate,
  Popover,
  InputForm,
  ChoiceForm,
  YesnoButton,
  RangeButton,
  SubmitButton,
  FileUploader,
  TextAreaForm,
  DateTimeInput,
  QuestionHeader
} from 'components'
import PropTypes from 'prop-types'
import { DEFAULT_IMAGE } from 'app/constants'
import { styles } from './QuestionForm.styles'
import { Col, Row, Box } from '@qonsoll/react-design'
import { QUESTION_TYPES, LAYOUT_TYPES } from 'app/constants'
import { EditOutlined, SettingOutlined } from '@ant-design/icons'
import { useCurrentQuestionContext } from 'app/context/CurrentQuestion'
import { MediaLibrarySimpleView } from 'domains/MediaLibrary/components'
import QuestionTypeSelect from 'domains/QuestionType/components/QuestionTypeSelect'

function QuestionForm(props) {
  const {
    data,
    showPopover,
    setShowPopover,
    isImageEditVisible,
    onQuestionTypeChange,
    setIsImageEditVisible
  } = props

  // [ADDITIONAL HOOKS]
  const currentQuestion = useCurrentQuestionContext()

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
    [QUESTION_TYPES.CHOICE]: {
      component: <ChoiceForm />
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
  const computedMediaUrl = `url(${currentQuestion?.image || DEFAULT_IMAGE})`
  const label =
    currentQuestion.questionType === QUESTION_TYPES.ENDING
      ? 'Ending'
      : `Question ${data?.order + 1}`
  const layoutType = LAYOUT_TYPES[data?.layoutType]
  const imageShowRule =
    layoutType?.type !== LAYOUT_TYPES.BETWEEN.type &&
    layoutType?.type !== LAYOUT_TYPES.FULL_SCREEN.type &&
    layoutType?.type !== LAYOUT_TYPES.DEFAULT.type
  const bgImage =
    layoutType?.type === LAYOUT_TYPES.FULL_SCREEN.type && computedMediaUrl

  // [CLEAN FUNCTIONS]
  const popoverShowChange = () => {
    setShowPopover(!showPopover)
  }
  const changeImageEditVisibleState = () => {
    setIsImageEditVisible(!isImageEditVisible)
  }

  return (
    <Row
      noGutters
      // mb={2}
      height="100%"
      width="100%"
      display="flex"
      // flex={1}
      // style={styles.rowStyle}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundImage={bgImage}>
      <Col
        v="center"
        mx={4}
        order={2}
        display="flex"
        style={styles.columnStyle}>
        <Card style={styles.cardStyle} bordered={false}>
          <Row noGutters>
            <Col>
              <Tag color="blue">{label} </Tag>
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
                content={<QuestionTypeSelect onClick={onQuestionTypeChange} />}
              />
            </Col>
            {layoutType?.type === LAYOUT_TYPES.FULL_SCREEN.type && (
              <Col cw="auto" ml={2}>
                <Popover
                  onClick={changeImageEditVisibleState}
                  visible={isImageEditVisible}
                  onVisibleChange={changeImageEditVisibleState}
                  trigger={'click'}
                  placement="rightTop"
                  btnType="primary"
                  btnIcon={<EditOutlined />}
                  content={
                    <Box width="192px" height="366px" overflow="hidden">
                      <MediaLibrarySimpleView
                        setIsImageEditVisible={setIsImageEditVisible}
                        bgImage={bgImage}
                      />
                    </Box>
                  }
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
            <Row noGutters>
              <Col cw="auto">
                <Box
                  {...layoutType.imgSize}
                  backgroundRepeat="no-repeat"
                  backgroundImage={computedMediaUrl}
                  backgroundSize="cover"
                  position="relative"
                  zIndex="1"
                  mb={3}>
                  <Popover
                    onClick={changeImageEditVisibleState}
                    visible={isImageEditVisible}
                    onVisibleChange={changeImageEditVisibleState}
                    trigger={'click'}
                    placement="rightTop"
                    btnType="primary"
                    btnIcon={<EditOutlined />}
                    content={
                      <Box width="192px" height="366px" overflow="hidden">
                        <MediaLibrarySimpleView
                          setIsImageEditVisible={setIsImageEditVisible}
                          bgImage={computedMediaUrl}
                        />
                      </Box>
                    }
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
          // width="800px"
          order={layoutType?.imageOrder}>
          <Box
            {...layoutType?.imgSize}
            backgroundRepeat="no-repeat"
            backgroundImage={computedMediaUrl}
            backgroundSize="cover"
            backgroundPosition="center left"
            m={2}
            position="relative">
            <Row h="right">
              <Col cw="auto" mr={4}>
                <Popover
                  onClick={changeImageEditVisibleState}
                  visible={isImageEditVisible}
                  onVisibleChange={changeImageEditVisibleState}
                  trigger={'click'}
                  placement="rightTop"
                  btnType="primary"
                  btnIcon={<EditOutlined />}
                  content={
                    <Box width="192px" height="366px" overflow="hidden">
                      <MediaLibrarySimpleView
                        setIsImageEditVisible={setIsImageEditVisible}
                        bgImage={computedMediaUrl}
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
  )
}

QuestionForm.propTypes = {
  data: PropTypes.object,
  onQuestionTypeChange: PropTypes.func,
  setShowPopover: PropTypes.func,
  showPopover: PropTypes.bool,
  setIsImageEditVisible: PropTypes.func,
  isImageEditVisible: PropTypes.bool
}

export default QuestionForm
