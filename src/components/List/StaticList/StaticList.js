import { Box, Col, Link, NoData, Row, Text } from '@qonsoll/react-design'
import { ListItem, NewListItem } from '../../../components'

import PropTypes from 'prop-types'
import React from 'react'
import { Upload } from 'antd'
import { useTranslations } from '@qonsoll/translation'

function StaticList(props) {
  const {
    data,
    setEdit,
    onClick,
    hasMedia,
    beforeUpload,
    customRequest,
    disableAddButton = true,
    selectedBackgroundImg,
    setSelectedBackgroundImg
  } = props

  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()

  // [COMPUTED PROPERTIES]
  const columnWidth = data?.[0]?.imageUrl ? 3 : [6, 4, 4, 2]

  return (
    <>
      {data?.length ? (
        <Row display="flex" width="100%" height="fit-content" noGutters>
          {disableAddButton && (
            <Col cw={columnWidth}>
              <NewListItem
                onClick={onClick}
                hasMedia={hasMedia}
                beforeUpload={beforeUpload}
                customRequest={customRequest}
              />
            </Col>
          )}
          {data?.map((item) => (
            <Col key={item.id} cw={columnWidth}>
              <ListItem
                data={item}
                setEdit={setEdit}
                selectedBackgroundImg={selectedBackgroundImg}
                setSelectedBackgroundImg={setSelectedBackgroundImg}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Box mt={4} width="100%" display="flex" justifyContent="center">
          <NoData
            description={
              <Box display="flex" flexDirection="column">
                <Text color="var(--qf-typography-subtitle-color)">
                  {t('Nothing was found')}
                </Text>
                {hasMedia ? (
                  <Upload
                    multiple
                    name="file"
                    showUploadList={false}
                    customRequest={customRequest}
                    beforeUpload={beforeUpload}>
                    <Link onClick={(e) => e.preventDefault()}>
                      {t('Upload new image')}
                    </Link>
                  </Upload>
                ) : (
                  disableAddButton && (
                    <Link onClick={onClick}>{t('Add new form')}</Link>
                  )
                )}
              </Box>
            }
          />
        </Box>
      )}
    </>
  )
}

StaticList.propTypes = {
  data: PropTypes.array,
  columnWidth: PropTypes.number
}

export default StaticList
