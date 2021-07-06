import PropTypes from 'prop-types'
import React, { useState, useMemo } from 'react'
import { Box, Row, Col } from '@qonsoll/react-design'
import { NumberedCard } from '../../../../components'
import Title from 'antd/lib/typography/Title'
import { Select, Typography, InputNumber } from 'antd'
import styled from 'styled-components'
import { DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'feedback-typeform-app/src/context/Translation'
import { COLLECTIONS } from '../../../../constants'
import useFunctions from '../../../../hooks/useFunctions'
import {
  CustomChoiceBox,
  CustomTextBox
} from '../../components/ConditionTemplates/ChoiceTemplate/ChoiceTemplate.styles'

const { Text } = Typography
const startLetter = 65

const ScoreConditionsAdvancedView = (props) => {
  const { index, questionData } = props

  return (
    <NumberedCard number={index + 1} key={index}>
      <Box ml={3}>
        <Title level={5} strong>
          {questionData?.title}
        </Title>
        {questionData?.questionConfigurations?.map((item, index) => (
          <Row noGutters mb={2} key={index}>
            <Col cw={6}>
              <CustomChoiceBox pl={2} mr={4}>
                <CustomTextBox mr={2} px={2}>
                  <Text strong>{String.fromCharCode(startLetter + index)}</Text>
                </CustomTextBox>
                {item?.answerOption}
              </CustomChoiceBox>
            </Col>
            <Col cw={6}>
              <InputNumber />
            </Col>
          </Row>
        ))}
      </Box>
    </NumberedCard>
  )
}

export default ScoreConditionsAdvancedView
