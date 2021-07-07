import React from 'react'
import { Typography } from 'antd'
import PropTypes from 'prop-types'
import { PageHeader } from '../../../components'
import { Box } from '@qonsoll/react-design'
import { useTranslation } from '../../../context/Translation'

const { Text } = Typography

function PageLayout(props) {
  //[CUSTOM HOOKS]
  const { formEditTitle, smallScreenHandleWarning } = useTranslation()

  const {
    title = formEditTitle || 'New Form',
    children,
    id,
    onBack,
    questionsList,
    handleSmallScreen
  } = props

  return (
    <Box
      flex={1}
      display="flex"
      height={handleSmallScreen && '100%'}
      flexDirection="column">
      <PageHeader
        title={title}
        id={id}
        onBack={onBack}
        questionsList={questionsList}
      />
      {handleSmallScreen ? (
        children
      ) : (
        <Box
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center">
          <Text>
            {smallScreenHandleWarning ||
              'This feature is available only on desktop.'}
          </Text>
        </Box>
      )}
    </Box>
  )
}

PageLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

export default PageLayout
