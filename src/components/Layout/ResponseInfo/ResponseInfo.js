import { Image, Typography } from 'antd'

import React from 'react'
import ResponsiveImage from './responsive.svg'
import { useTranslations } from '@qonsoll/translation'

const { Text } = Typography

const ResponseInfo = (props) => {
  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()

  return (
    <div
      height="100%"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      display={['flex', 'none']}
    >
      <Image src={ResponsiveImage} alt="Wrong device" height={150} mb="24px" />
      <Text type="secondary">
        {t('This feature is available only on desktop')}
      </Text>
    </div>
  )
}

export default ResponseInfo
