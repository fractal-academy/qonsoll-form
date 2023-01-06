import { Card, Col, Row, Text, Title } from '@qonsoll/react-design'

import FormViewActions from './FormViewActions'
import { Icon } from '@qonsoll/icons'
import PropTypes from 'prop-types'
import React from 'react'
import { useActionsFunctionsContext } from '../../../../context/ActionsFunctions/useActionsFunctionsContext'
import { useTranslations } from '@qonsoll/translation'

const FormSimpleView = (props) => {
  const { id, title, subtitle, firebase } = props

  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()
  const { onFormItemClick } = useActionsFunctionsContext()

  // [COMPUTED PROPERTIES]
  const desctiption = subtitle || t('No description')

  // [HELPER FUNCTIONS]
  const handleFormPreview = () => onFormItemClick(id)

  return (
    <Card
      shadowless
      size="small"
      bordered={false}
      bg="var(--qf-card-bg)"
      borderRadius="var(--qf-card-border-radius)">
      <Row noGutters mb="16px">
        <Col
          cw={12}
          height={240}
          bg="var(--qf-card-content-bg)"
          borderRadius="var(--qf-card-border-radius)">
          <Icon
            size={48}
            height="inherit"
            name="FormFilled"
            alignItems="center"
            justifyContent="center"
          />
        </Col>
      </Row>

      <Row mb="16px" v="center">
        <Col>
          <Title
            level={5}
            clamp="1"
            cursor="pointer"
            wordBreak="break-all"
            onClick={handleFormPreview}>
            {title}
          </Title>
          <Text type="secondary" clamp="1" wordBreak="break-all">
            {desctiption}
          </Text>
        </Col>

        <Col cw="auto">
          <FormViewActions form={props} firebase={firebase} />
        </Col>
      </Row>
    </Card>
  )
}

FormSimpleView.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  firebase: PropTypes.object
}

export default FormSimpleView
