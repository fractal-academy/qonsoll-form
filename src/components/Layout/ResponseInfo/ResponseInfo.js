import { Box, Img, Text } from '@qonsoll/react-design'

import React from 'react'
import ResponsiveImage from './responsive.svg'
import { useTranslations } from '@qonsoll/translation'

const ResponseInfo = (props) => {
  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()

  return (
    <Box
      height="100%"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      display={['flex', 'none']}>
      <Img src={ResponsiveImage} alt="Wrong device" height={150} mb="24px" />
      <Text type="secondary">
        {t('This feature is available only on desktop')}
      </Text>
    </Box>
  )
}

export default ResponseInfo
