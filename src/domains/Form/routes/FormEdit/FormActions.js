import { Button, Tooltip } from 'antd'

import { Icon } from '@qonsoll/icons'
import PropTypes from 'prop-types'
import React from 'react'
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
    <div display="flex">
      {showAnswers && (
        <Tooltip title={t('Show answers')}>
          <Button
            mr="16px"
            display={['none', 'flex']}
            onClick={handleAnswersShow}
            icon={<Icon name="FormFilled" size={20} />}
          />
        </Tooltip>
      )}
      <Tooltip title={t('Form preview')}>
        <Button
          onClick={handleFormShow}
          mr={['0px', '16px', '16px', '0px']}
          icon={<Icon name="ShowFilled" size={20} />}
        />
      </Tooltip>

      {/* drawer state controll button */}
      <Button
        onClick={showDrawer}
        icon={<UnorderedListOutlined />}
        display={['none', 'flex', 'flex', 'none']}
      />
    </div>
  )
}

FormActions.propTypes = {
  id: PropTypes.string,
  showAnswers: PropTypes.bool,
  showDrawer: PropTypes.func
}

export default FormActions
