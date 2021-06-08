import React from 'react'
import PropTypes from 'prop-types'
import theme from '../../../../styles/theme'
import styled from 'styled-components'
import { Button, Typography } from 'antd'
import { Row, Col } from '@qonsoll/react-design'
import { CheckOutlined } from '@ant-design/icons'
import { useActionsFunctionsContext } from '../../../context/ActionsFunctions/useActionsFunctionsContext'
import { useAnswersContext } from '../../../context/Answers'
import { useTranslation } from '../../../context/Translation'

const { Text } = Typography

const StyledSubmit = styled(Button)`
  height: 56px;
  font-size: ${theme.typography.fontSize.h4};
`

function SubmitButton(props) {
  const { children, onClick, finish, question, ...rest } = props
  const formId = question?.formId

  // [ADDITIONAL_HOOKS]
  const answers = useAnswersContext()
  const { onFinish } = useActionsFunctionsContext()
  const { t } = useTranslation()

  // [CLEAN FUNCTIONS]
  const onButtonClick = () => {
    if (finish) {
      const updatedAnswers = { formId, answers }
      //add function from b2g and provide updatedAnswers
      onFinish?.(updatedAnswers)
    } else onClick?.()
  }

  return (
    <Row display="flex" v="center" noGutters>
      <Col cw="auto" mr={3}>
        <StyledSubmit type="primary" onClick={onButtonClick} {...rest}>
          {children || (
            <Row display="flex" noGutters>
              <Col cw="auto" mr={2}>
                {t('OK')}
              </Col>
              <Col>
                <CheckOutlined />
              </Col>
            </Row>
          )}
        </StyledSubmit>
      </Col>
      <Col cw="auto">
        <Text>{t('Press enter')} ↵</Text>
      </Col>
    </Row>
  )
}

SubmitButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node
}

export default SubmitButton
