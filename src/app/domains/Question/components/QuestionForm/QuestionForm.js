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
  LAYOUT_TYPES.LEFT_SIDE_BIG,
  LAYOUT_TYPES.LEFT_SIDE_SMALL,
  LAYOUT_TYPES.RIGHT_SIDE_BIG,
  LAYOUT_TYPES.RIGHT_SIDE_SMALL
]
const rightSide = [LAYOUT_TYPES.RIGHT_SIDE_BIG, LAYOUT_TYPES.RIGHT_SIDE_SMALL]

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

  const cardStyles = {
    ...styles.cardStyle,
    ...(question?.layoutType === LAYOUT_TYPES.FULL_SCREEN
      ? {
          backgroundImage: `url(https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg)`
        }
      : {})
  }
  const imageOrder = rightSide.includes(question?.layoutType) ? 3 : 1
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
      <Row noGutters mb={2} height="inherit">
        <Col v="center" order={2}>
          <Card style={cardStyles}>
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
              {question?.layoutType === LAYOUT_TYPES.FULL_SCREEN && (
                <Col cw="auto" ml={2}>
                  <MediaLibraryModal
                    btnProps={{
                      type: 'primary',
                      icon: <EyeFilled />,
                      children: 'Layout'
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
            {question?.layoutType === LAYOUT_TYPES.BETWEEN && (
              <Row>
                <Col cw="auto">
                  <Box
                    {...question?.layoutType}
                    backgroundImage={`url(https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg)`}
                    position="relative"
                    zIndex="1">
                    <MediaLibraryModal
                      btnProps={{
                        type: 'primary',
                        icon: <SettingOutlined />,
                        style: {
                          position: 'absolute',
                          top: '12px',
                          right: '15px'
                        }
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
        {layoutSides.includes(question?.layoutType) && (
          <Col
            v="center"
            display="flex"
            style={styles.columnStyle}
            height="100%"
            order={imageOrder}>
            <Box
              {...question?.layoutType}
              backgroundImage={`url(https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg)`}>
              <MediaLibraryModal
                btnProps={{ type: 'primary', icon: <SettingOutlined /> }}
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
