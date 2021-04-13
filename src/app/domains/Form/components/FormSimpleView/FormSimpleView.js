import { Card, Image, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'
const { Meta } = Card

function FormSimpleView(props) {
  const { imageURL, title, subtitle } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]

  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true

    // [EFFECT LOGIC]
    // write code here...
    // code sample: isComponentMounted && setState(<your data for state updation>)

    // [CLEAN UP FUNCTION]
    return () => {
      // [OTHER CLEAN UP-S (UNSUBSCRIPTIONS)]
      // write code here...

      // [FINAL CLEAN UP]
      isComponentMounted = false
    }
  }, [])

  return (
    <Card
      style={{
        width: 160,
        backgroundColor: '#eceff5',
        borderRadius: '8px'
      }}
      bodyStyle={{
        padding: '0 12px 12px 12px'
      }}
      cover={
        <Image
          style={{
            height: '110px',
            padding: '3px',
            borderRadius: '8px'
          }}
          alt="Form view"
          src={imageURL}
          preview={false}
        />
      }>
      <Meta title={title} description={subtitle}></Meta>
    </Card>
  )
}
FormSimpleView.defaultProps = {
  imageURL:
    'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
  title: 'form title',
  subtitle: 'form subtitle'
}
FormSimpleView.propTypes = {
  imageURL: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
}

export default FormSimpleView
