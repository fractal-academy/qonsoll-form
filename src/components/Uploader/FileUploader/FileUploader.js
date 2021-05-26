import React, { useState } from 'react'
import { Upload, message } from 'antd'
import { Text } from 'antd-styled'
import { IconLabel } from '~/components'
import { Col, Row } from '@qonsoll/react-design'
import { InboxOutlined } from '@ant-design/icons'
import { storage } from 'app/services/Firebase'
import { getCollectionRef, setData } from 'app/services/Firestore'
import COLLECTIONS from 'app/constants/collection'

const { Dragger } = Upload

const config = {
  name: 'file',
  multiple: true
}

const UploadArea = (props) => {
  // [COMPONENT STATE HOOKS]
  const [filesList, setFilesList] = useState({})
  // [COMPUTED PROPERTIES]

  const fileId = getCollectionRef(COLLECTIONS.RESPONSES).doc().id

  // [CLEAN FUNCTIONS]
  const onMediaUploaded = (data) => {
    const fileId = getCollectionRef(COLLECTIONS.RESPONSES).doc().id
    setData(COLLECTIONS?.RESPONSES, fileId, data).catch((e) =>
      message.error(e.message)
    )
  }

  const onChange = (data) => {
    const { file } = data
    const currentFile = {
      name: file.name,
      status: 'uploading',
      percent: 0,
      uid: file.uid
    }
    setFilesList((files) => ({ ...files, [currentFile.uid]: currentFile }))
    // !!filesList
    //   ? setFilesList((files) => ({ ...files, [currentFile.uid]: currentFile }))
    //   : setFilesList({ [currentFile.uid]: currentFile })

    const ref = storage.ref('files').child(file.uid)
    const uploadFile = ref.put(file)
    uploadFile.on(
      'state_changed',
      (snapshot) => {
        // Calc of upload progress
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ).toFixed(0)
        // Update item while it uploading
        const currentFile = {
          name: uploadFile.name,
          status: 'uploading',
          percent: progress,
          uid: uploadFile.uid
        }
        setFilesList((files) => ({
          ...files,
          [currentFile.uid]: currentFile
        }))
      },
      (error) => {
        // Handle error during the upload
        message.error(error.message)
        const failedUploadFile = {
          name: file.name,
          status: 'error',
          uid: file.uid
        }
        setFilesList((files) => ({
          ...files,
          [failedUploadFile.uid]: failedUploadFile
        }))
      },
      () => {
        uploadFile.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const currentFile = {
            id: fileId,
            name: file.name,
            fileUrl: downloadURL,
            uid: file.uid
          }
          setFilesList((files) => ({
            ...files,
            [currentFile.uid]: currentFile
          }))

          onMediaUploaded(currentFile)
        })
      }
    )
  }

  return (
    <Dragger
      {...config}
      {...props}
      customRequest={onChange}
      fileList={Object.values(filesList)}>
      <Row h="center" v="center">
        <Col cw="auto">
          <IconLabel>
            <InboxOutlined />
          </IconLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <Text>Click or drag file to this area to upload</Text>
        </Col>
      </Row>
      <Row>
        <Col>
          <Text type="secondary">Upload files</Text>
        </Col>
      </Row>
    </Dragger>
  )
}

UploadArea.propTypes = {}

export default UploadArea
