import React from 'react'
import { Typography } from 'antd'
import PropTypes from 'prop-types'
import { PageHeader } from 'components'
import { Box } from '@qonsoll/react-design'

const { Text } = Typography

function PageLayout(props) {
  const {
    title = 'New Form',
    children,
    questionsList,
    handleSmallScreen
  } = props

  return (
    <Box
      flex={1}
      display="flex"
      height={handleSmallScreen && '100%'}
      flexDirection="column">
      <PageHeader title={title} questionsList={questionsList} />
      {handleSmallScreen ? (
        children
      ) : (
        <Box
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center">
          <Text>This feature is not supported by this device.</Text>
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
