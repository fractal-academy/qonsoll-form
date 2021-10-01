import React from 'react'
import { Upload } from 'antd'
import PropTypes from 'prop-types'
import { TEXTINGS } from '../../../constants'
import { ListItem, NewListItem } from '../../../components'
import { useTranslation } from '../../../context/Translation'
import { Row, Col, Box, Text, Link, NoData } from '@qonsoll/react-design'

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
  const { emptyDescription, uploadImage, createForm } = useTranslation()

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
                  {emptyDescription || TEXTINGS.emptyDescription}
                </Text>
                {hasMedia ? (
                  <Upload
                    multiple
                    name="file"
                    showUploadList={false}
                    customRequest={customRequest}
                    beforeUpload={beforeUpload}>
                    <Link onClick={(e) => e.preventDefault()}>
                      {uploadImage || TEXTINGS.uploadImage}
                    </Link>
                  </Upload>
                ) : (
                  disableAddButton && (
                    <Link onClick={onClick}>
                      {createForm || TEXTINGS.createForm}
                    </Link>
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
