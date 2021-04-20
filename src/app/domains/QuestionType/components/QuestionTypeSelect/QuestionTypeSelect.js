import React, { useEffect } from 'react'
import { Col, Row } from '@qonsoll/react-design'
import { Menu } from 'antd'
import { QUESTION_TYPES } from 'app/constants'
import {
  CarOutlined,
  GlobalOutlined,
  HeartOutlined,
  HomeOutlined,
  SwapOutlined
} from '@ant-design/icons'
import Text from 'antd/lib/typography/Text'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'
import { styles } from './QuestionTypeSelect.styles'

const questionTypeMap = [
  {
    type: QUESTION_TYPES.WELCOME_SCREEN,
    description: 'Invite your audience in',
    icon: <HomeOutlined style={{ fontSize: '24px' }} />
  },
  {
    type: QUESTION_TYPES.SHORT_TEXT,
    description: 'For short answers, like names',
    icon: <GlobalOutlined style={{ fontSize: '24px' }} />
  },
  {
    type: QUESTION_TYPES.DATE,
    description: 'Collect answers in date format',

    icon: <SwapOutlined style={{ fontSize: '24px' }} />
  },
  {
    type: QUESTION_TYPES.FILE_UPLOAD,
    description: 'Upload a file up to 10MB',
    icon: <HeartOutlined style={{ fontSize: '24px' }} />
  },
  {
    type: QUESTION_TYPES.LONG_TEXT,
    description: 'Mote space to spill the beans',
    icon: <CarOutlined style={{ fontSize: '24px' }} />
  },
  {
    type: QUESTION_TYPES.OPINION_SCALE,
    description: 'A customizable, numbered scale',
    icon: <HomeOutlined style={{ fontSize: '24px' }} />
  },
  {
    type: QUESTION_TYPES.PICTURE_CHOICE,
    description: 'Multiple choice but prettier',
    icon: <HomeOutlined style={{ fontSize: '24px' }} />
  },
  {
    type: QUESTION_TYPES.RATING,
    description: 'Choose from shapes like ⭐ or 🐶',
    icon: <HomeOutlined style={{ fontSize: '24px' }} />
  },
  {
    type: QUESTION_TYPES.STATEMENT,
    description: 'Take the mic for a moment',
    icon: <HomeOutlined style={{ fontSize: '24px' }} />
  },
  {
    type: QUESTION_TYPES.YES_NO,
    description: 'Just 2 options: Yes or No',
    icon: <HomeOutlined style={{ fontSize: '24px' }} />
  }
]
function QuestionTypeSelect(props) {
  const { onChange, onClick } = props
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
      <Row h="center" v={'center'} noGutters>
        <Col>
          <Menu onChange={onChange} style={styles.menuStyle}>
            {questionTypeMap.map((item, index) => (
              <Menu.Item
                style={styles.menuItemStyle}
                key={index}
                onClick={onClick}>
                <Row noGutters v="center">
                  <Col v="center" cw="auto">
                    {item.icon}
                  </Col>
                  <Col>
                    <Row noGutters v="center">
                      <Text style={styles.questionName}>
                        <Col v="center">{item.type}</Col>
                      </Text>
                    </Row>
                    <Row noGutters>
                      <Col>
                        <Text style={styles.questionDescr}>
                          {item.description}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Menu.Item>
            ))}
          </Menu>
        </Col>
      </Row>
    </>
  )
}

QuestionTypeSelect.propTypes = {}

export default QuestionTypeSelect
