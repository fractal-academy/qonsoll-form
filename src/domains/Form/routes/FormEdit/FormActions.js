import { Box, Button } from '@qonsoll/react-design'

import { Icon } from '@qonsoll/icons'
import PropTypes from 'prop-types'
import React from 'react'
import { Tooltip } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons'
import { useActionsFunctionsContext } from '../../../../context/ActionsFunctions/useActionsFunctionsContext'
import { useTranslations } from '@qonsoll/translation'

const FormActions = (props) => {
  const { id, showAnswers, showDrawer } = props

  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()
  const { onFormShow, onFormResultsShow } = useActionsFunctionsContext()

  // [CLEAN FUNCTIONS]
  const handleFormShow = () => onFormShow?.(id)
  const handleAnswersShow = () => onFormResultsShow?.(id)

  return (
    <Box display="flex">
      <Tooltip title={t('Show answers')}>
        <Button
          mr="16px"
          display={['none', 'flex']}
          onClick={handleAnswersShow}
          icon={<Icon name="FormFilled" size={20} />}
        />
      </Tooltip>
      {showAnswers && (
        <Tooltip title={t('Form preview')}>
          <Button
            onClick={handleFormShow}
            mr={showDrawer && '16px'}
            icon={<Icon name="ShowFilled" size={20} />}
          />
        </Tooltip>
      )}

      {/* drawer state controll button */}
      <Button
        onClick={showDrawer}
        icon={<UnorderedListOutlined />}
        display={['none', 'flex', 'flex', 'none']}
      />
    </Box>
  )
}

FormActions.propTypes = {
  id: PropTypes.string,
  showAnswers: PropTypes.bool,
  showDrawer: PropTypes.func
}

export default FormActions
