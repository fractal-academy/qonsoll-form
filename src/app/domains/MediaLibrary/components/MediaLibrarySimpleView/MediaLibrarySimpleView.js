import React, { useEffect, useState } from 'react'
import { Box, Col, Row } from '@qonsoll/react-design'
import { Button, Card, Typography } from 'antd'
import { EditOutlined, EyeFilled, PlusOutlined } from '@ant-design/icons'
import { styles } from './MediaLibrarySimpleView.styles'
import MediaLibraryModal from 'domains/MediaLibrary/combined/MediaLibraryModal'
import QuestionTypeSelect from 'domains/QuestionType/components/QuestionTypeSelect'
import { Input, InputForm, Popover } from 'components'
import RangeSlider from 'components/RangeSlider'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'
const { Text } = Typography
function MediaLibrarySimpleView(props) {
  const { setIsImageEditVisible } = props
  // const { WRITE_PROPS_HERE } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]

  const [showPopoverIcon, setShowPopoverIcon] = useState(false)
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
    <Row noGutters>
      <Col>
        <Row noGutters mb={4}>
          <Col>
            <Box
              height="150px"
              borderRadius="8px"
              position="relative"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundImage={`url(https://www.awakenthegreatnesswithin.com/wp-content/uploads/2018/08/Nature-Quotes-1.jpg)`}>
              <MediaLibraryModal
                // data={data}
                onClick={() => {
                  setIsImageEditVisible(false)
                }}
                btnProps={{
                  type: 'primary',
                  icon: <EditOutlined style={styles.btnStyle} />
                }}
              />
            </Box>
          </Col>
        </Row>
        <Row noGutters mb={4}>
          <Col>
            <Text style={styles.fontStyle}>Alt text</Text>
            <Input style={styles.inputStyle} placeholder="Enter alt here..." />
          </Col>
        </Row>
        <Row noGutters>
          <Col>
            <Row noGutters>
              <Col>
                <Text style={styles.fontStyle}>Brightness</Text>
              </Col>
            </Row>
            <Row noGutters>
              <Col>
                <RangeSlider />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

MediaLibrarySimpleView.propTypes = {}

export default MediaLibrarySimpleView
