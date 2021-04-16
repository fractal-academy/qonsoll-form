import React, { useEffect, useState, cloneElement } from 'react'
import { Card, Tag } from 'antd'
import {
  DateTimeInput,
  FileUploader,
  InputForm,
  Popover,
  QuestionHeader,
  Rate,
  TextAreaForm
} from 'components'
import { SettingOutlined } from '@ant-design/icons'
import QuestionTypeSelect from 'domains/QuestionType/components/QuestionTypeSelect'
import { Col, Row, Box } from '@qonsoll/react-design'
import { styles } from './QuestionForm.styles.js'
import { QUESTION_TYPE, LAYOUT_TYPE } from 'app/constants'
import PropTypes from 'prop-types'

// import { useTranslation } from 'react-i18next'

const questionTypesMap = {
  [QUESTION_TYPE.YES_NO]: {
    component: <>YES/NO btns</>
  },
  [QUESTION_TYPE.PICTURE_CHOICE]: {
    component: <>List of ImageUploaders</>
  },
  [QUESTION_TYPE.OPINION_SCALE]: {
    component: <>Option Scale</>
  },
  [QUESTION_TYPE.RATING]: {
    component: <Rate />
  },
  [QUESTION_TYPE.SHORT_TEXT]: {
    component: <InputForm />
  },
  [QUESTION_TYPE.LONG_TEXT]: {
    component: <TextAreaForm />
  },
  [QUESTION_TYPE.DATE]: {
    component: <DateTimeInput />
  },
  [QUESTION_TYPE.FILE_UPLOAD]: {
    component: <FileUploader />
  },
  [QUESTION_TYPE.STATEMENT]: {
    component: <>Continue Btn</>
  }
}

const layoutSides = [
  LAYOUT_TYPE.LEFT_SIDE_BIG,
  LAYOUT_TYPE.LEFT_SIDE_SMALL,
  LAYOUT_TYPE.RIGHT_SIDE_BIG,
  LAYOUT_TYPE.RIGHT_SIDE_SMALL
]
const rightSide = [LAYOUT_TYPE.RIGHT_SIDE_BIG, LAYOUT_TYPE.RIGHT_SIDE_SMALL]

function QuestionForm(props) {
  const { question } = props
  // const { WRITE_PROPS_HERE } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user
  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]

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
          <Card
            style={{
              ...styles.cardStyle,
              ...(question.layoutType === LAYOUT_TYPE.FULL_SCREEN && {
                backgroundImage: `url(https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg)`
              })
            }}>
            <Row noGutters h="between">
              <Col cw="auto">
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
            </Row>
            <Row noGutters h="between">
              <Col cw="auto">
                <QuestionHeader
                  titlePlaceholder={'change on Question type'}
                  subtitlePlaceholder={'Description(optional)'}
                />
              </Col>
            </Row>
            {question.layoutType === LAYOUT_TYPE.BETWEEN && (
              <Row>
                <Col cw="auto">
                  <Box
                    {...question.layoutType}
                    backgroundImage={`url(https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg)`}
                  />
                </Col>
              </Row>
            )}
            <Row noGutters>
              <Col>
                {cloneElement(
                  questionTypesMap[question.questionType].component,
                  {
                    ...question
                  }
                )}
              </Col>
            </Row>
          </Card>
        </Col>
        {layoutSides.includes(question.layoutType) && (
          <Col
            v="center"
            display="flex"
            style={styles.columnStyle}
            height="100%"
            order={rightSide.includes(question.layoutType) ? 3 : 1}>
            <Box
              {...question.layoutType}
              backgroundImage={`url(https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg)`}
            />
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
