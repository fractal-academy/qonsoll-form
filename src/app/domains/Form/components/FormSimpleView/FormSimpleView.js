import { Card, Image, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { styles } from './FormSimpleView.style'
import { Row, Col, Box } from '@qonsoll/react-design'
// import { useTranslation } from 'react-i18next'
const { Meta } = Card

const { Text } = Typography

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
      style={styles.cardStyles}
      bodyStyle={styles.cardBodyPadding}
      cover={
        <Image
          style={styles.cardImageStyles}
          alt="Form view"
          src={imageURL}
          preview={false}
        />
      }>
      <Meta
        description={
          <>
            <Row>
              <Col>
                <Text style={styles.titleStyle}>Image title</Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Text style={styles.descriptionTextSize}>
                  Image description
                </Text>
              </Col>
            </Row>
          </>
        }
      />
    </Card>
  )
}
FormSimpleView.defaultProps = {
  imageURL:
    'https://image.freepik.com/free-photo/growing-small-tree-in-nature-and-sunlight_34152-1460.jpg',
  title: 'form title',
  subtitle: 'form subtitle'
}
FormSimpleView.propTypes = {
  imageURL: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
}

export default FormSimpleView
