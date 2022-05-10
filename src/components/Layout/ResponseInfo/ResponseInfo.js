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
      display={['flex', 'none']}
      flexDirection="column"
      alignItems="center"
      justifyContent="center">
      <Img src={ResponsiveImage} alt="Wrong device" height={150} mb={3} />
      <Text>{t('This feature is available only on desktop')}</Text>
    </Box>
  )
}

export default ResponseInfo
