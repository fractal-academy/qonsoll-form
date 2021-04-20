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
  Button
} from 'components'
import { EyeFilled, SettingOutlined } from '@ant-design/icons'
import QuestionTypeSelect from 'domains/QuestionType/components/QuestionTypeSelect'
import { Col, Row, Box } from '@qonsoll/react-design'
import { styles } from './QuestionForm.styles.js'
import { QUESTION_TYPES, LAYOUT_TYPES } from 'app/constants'
import MediaLibraryModal from 'domains/MediaLibrary/combined/MediaLibraryModal'
import PropTypes from 'prop-types'

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
  const { question } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user
  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]
  const questionTypesMap = {
    [QUESTION_TYPES.YES_NO]: {
      component: <YesnoButton />
    },
    [QUESTION_TYPES.PICTURE_CHOICE]: {
      component: <ChoiceForm />
    },
    [QUESTION_TYPES.OPINION_SCALE]: {
      component: <RangeButton />
    },
    [QUESTION_TYPES.RATING]: {
      component: <Rate />
    },
    [QUESTION_TYPES.SHORT_TEXT]: {
      component: <InputForm />
    },
    [QUESTION_TYPES.LONG_TEXT]: {
      component: <TextAreaForm />
    },
    [QUESTION_TYPES.DATE]: {
      component: <DateTimeInput />
    },
    [QUESTION_TYPES.FILE_UPLOAD]: {
      component: <FileUploader />
    },
    [QUESTION_TYPES.STATEMENT]: {
      component: <Button />
    }
  }

  const bgImage =
    question?.layoutType.type === LAYOUT_TYPES.FULL_SCREEN.type &&
    `url(https://www.awakenthegreatnesswithin.com/wp-content/uploads/2018/08/Nature-Quotes-1.jpg)`

  const imageOrder = rightSide.includes(question?.layoutType.type) ? 3 : 1
  // [CLEAN FUNCTIONS]

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
        style={styles.rowStyle}
        flex={1}
        backgroundImage={bgImage && bgImage}>
        <Col v="center" order={2} cw="auto">
          <Card style={styles.cardStyle} bordered={false}>
            <Row noGutters>
              <Col>
                <Tag color="blue">Question 1</Tag>
              </Col>
              <Col cw="auto">
                <Popover
                  style={styles.popoverStyle}
                  trigger="click"
                  placement="bottomRight"
                  btnType="primary"
                  btnIcon={<SettingOutlined />}
                  content={<QuestionTypeSelect />}
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
            <Row noGutters h="between">
              <Col cw="auto">
                <QuestionHeader
                  titlePlaceholder={'change on Question type'}
                  subtitlePlaceholder={'Description(optional)'}
                />
              </Col>
            </Row>
            {question?.layoutType.type === LAYOUT_TYPES.BETWEEN.type && (
              <Row>
                <Col cw="auto">
                  <Box
                    {...question?.layoutType.imgSize}
                    backgroundImage={`url(https://www.awakenthegreatnesswithin.com/wp-content/uploads/2018/08/Nature-Quotes-1.jpg)`}
                    position="relative"
                    zIndex="1">
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
              backgroundImage={`url(https://www.awakenthegreatnesswithin.com/wp-content/uploads/2018/08/Nature-Quotes-1.jpg)`}
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
