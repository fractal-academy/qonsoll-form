import React from 'react'
import styled from 'styled-components'
import Title from 'antd/lib/typography/Title'
import { Typography, InputNumber } from 'antd'
import { Box, Row, Col } from '@qonsoll/react-design'
import { NumberedCard } from '../../../../components'
import typeformTheme from 'feedback-typeform-app/styles/theme'

const { Text } = Typography
const startLetter = 65

const ScoreConditionsAdvancedView = (props) => {
  const { index, questionData } = props

  const OptionBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor:
      theme?.color?.dark?.t?.lighten9 ||
      typeformTheme?.color?.dark?.t?.lighten9,
    border: '1px solid',
    borderColor:
      theme?.color?.dark?.t?.lighten5 || theme?.color?.dark?.t?.lighten5,
    borderRadius: theme?.borderRadius?.md
  }))

  const CustomTextBox = styled(Box)(({ theme }) => ({
    maxWidth: '100%',
    minWidth: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid',
    borderColor:
      theme?.color?.dark?.t?.lighten4 ||
      typeformTheme?.color?.dark?.t?.lighten4,
    borderRadius: theme?.borderRadius?.sm || typeformTheme?.borderRadius?.sm
  }))

  return (
    <NumberedCard number={index + 1} key={index}>
      <Box ml={3}>
        <Title level={5} style={{ marginBottom: '10px' }}>
          {questionData?.title}
        </Title>
        {questionData?.questionConfigurations?.map((item, index) => (
          <Row noGutters mb={2} key={index}>
            <Col cw={11} style={{ paddingRight: '32px' }}>
              <OptionBox px={2}>
                <CustomTextBox mr={2} px={2}>
                  <Text strong>{String.fromCharCode(startLetter + index)}</Text>
                </CustomTextBox>
                <Text ellipsis>{item?.answerOption}</Text>
              </OptionBox>
            </Col>
            <Col cw={1}>
              <InputNumber />
            </Col>
          </Row>
        ))}
      </Box>
    </NumberedCard>
  )
}

export default ScoreConditionsAdvancedView
