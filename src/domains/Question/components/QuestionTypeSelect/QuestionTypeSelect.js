import React from 'react'
import PropTypes from 'prop-types'
import Text from 'antd/lib/typography/Text'
import { Col, Row } from '@qonsoll/react-design'
import { QUESTION_TYPES } from '../../../../constants'
import { IconRoundContainer } from '../../../../components'
import { useTranslation } from '../../../../context/Translation'
import {
  QuestionsTypeMenu,
  QuestionMenuItem,
  Description
} from './QuestionTypeSelect.styles'
import {
  CalendarOutlined,
  CopyrightOutlined,
  FileTextOutlined,
  GoldOutlined,
  HomeOutlined,
  PictureOutlined,
  ShareAltOutlined,
  SmallDashOutlined,
  StarOutlined,
  UploadOutlined
} from '@ant-design/icons'

function QuestionTypeSelect(props) {
  const { onClick, customQuestionTypes } = props

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslation()

  // [COMPUTED_PROPERTIES]
  const questionTypeMap = customQuestionTypes || [
    {
      type: QUESTION_TYPES.WELCOME_SCREEN,
      description: t('Invite your audience in'),
      icon: <HomeOutlined />
    },
    {
      type: QUESTION_TYPES.LONG_TEXT,
      description: t('Mote space to spill the beans'),
      icon: <FileTextOutlined />
    },
    {
      type: QUESTION_TYPES.DATE,
      description: t('Collect answers in date format'),
      icon: <CalendarOutlined />
    },
    {
      type: QUESTION_TYPES.FILE_UPLOAD,
      description: t('Upload a file up to 10MB'),
      icon: <UploadOutlined />
    },

    {
      type: QUESTION_TYPES.OPINION_SCALE,
      description: t('A customizable, numbered scale'),
      icon: <HomeOutlined />
    },
    {
      type: QUESTION_TYPES.PICTURE_CHOICE,
      description: t('Multiple choice but prettier'),
      icon: <PictureOutlined />
    },
    {
      type: QUESTION_TYPES.CHOICE,
      description: t('Multiple choice'),
      icon: <GoldOutlined />
    },
    {
      type: QUESTION_TYPES.RATING,
      description: t('Rate'),
      icon: <StarOutlined />
    },
    {
      type: QUESTION_TYPES.STATEMENT,
      description: t('Take the mic for a moment'),
      icon: <CopyrightOutlined />
    },
    {
      type: QUESTION_TYPES.SHORT_TEXT,
      description: t('For short answers, like names'),
      icon: <SmallDashOutlined />
    },
    {
      type: QUESTION_TYPES.YES_NO,
      description: t('Just 2 options: Yes or No'),
      icon: <ShareAltOutlined />
    }
  ]

  return (
    <Row
      h="center"
      v="center"
      pl={2}
      noGutters
      display="flex"
      style={{ flex: '1' }}>
      <Col display="block">
        <QuestionsTypeMenu>
          {questionTypeMap.map((item) => (
            <QuestionMenuItem key={item.type} onClick={onClick}>
              <Row noGutters v="center">
                <Col v="center" cw="auto" mr={2}>
                  <IconRoundContainer>{item.icon}</IconRoundContainer>
                </Col>
                <Col display="block">
                  <Row noGutters>
                    <Col v="center">
                      <Text strong>{item.type}</Text>
                    </Col>
                  </Row>
                  <Row noGutters>
                    <Col>
                      <Description type="secondary">
                        {item.description}
                      </Description>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </QuestionMenuItem>
          ))}
        </QuestionsTypeMenu>
      </Col>
    </Row>
  )
}

QuestionTypeSelect.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func
}

export default QuestionTypeSelect
