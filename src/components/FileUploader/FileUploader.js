import { Box, Button, Col, Row, Text } from '@qonsoll/react-design'
import { DeleteOutlined, FileOutlined, InboxOutlined } from '@ant-design/icons'
import { IconLabel, UploadItem } from './FileUploader.styles'
import { Popconfirm, Progress, Upload, message } from 'antd'
import React, { useState } from 'react'
import { useHover, useKeyPress } from '@umijs/hooks'

import COLLECTIONS from '../../constants/collection'
import PropTypes from 'prop-types'
import { SubmitButton } from '..'
import useFunctions from '../../hooks/useFunctions'
import { useTranslations } from '@qonsoll/translation'

const { Dragger } = Upload

const config = {
  name: 'file',
  multiple: true
}

const UploadArea = (props) => {
  const { onContinue, question, currentSlide } = props

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const { getCollectionRef, storage } = useFunctions()
  const [isHovering, hoverRef] = useHover()

  // [COMPONENT STATE HOOKS]
  const [filesList, setFilesList] = useState({})

  // [CLEAN FUNCTIONS]
  // const onMediaUploaded = (data) => {
  //   const fileId = getCollectionRef(COLLECTIONS.ANSWERS).doc().id
  //   setData(COLLECTIONS?.ANSWERS, fileId, data).catch((e) =>
  //     message.error(e.message)
  //   )
  // }

  const onChange = (data) => {
    const { file } = data

    const fileId = getCollectionRef(COLLECTIONS.ANSWERS).doc().id

    const currentFile = {
      name: file?.name,
      status: 'uploading',
      percent: 0,
      uid: file?.uid
    }

    currentFile?.name &&
      setFilesList((files) => ({ ...files, [currentFile.uid]: currentFile }))

    const ref = storage.ref('files').child(file?.uid)
    const uploadFile = ref.put(file)

    uploadFile.on(
      'state_changed',
      (snapshot) => {
        // Calc of upload progress
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ).toFixed(0)

        // Update item while it uploading
        const updatedCurrentFile = {
          name: file?.name,
          status: 'uploading',
          uid: file?.uid,
          percent: progress
        }

        setFilesList((files) => ({
          ...files,
          [updatedCurrentFile?.uid]: updatedCurrentFile
        }))
      },
      (error) => {
        // Handle error during the upload
        message.error(error.message)
        const failedUploadFile = {
          name: file?.name,
          status: 'error',
          uid: file?.uid
        }
        failedUploadFile?.name &&
          setFilesList((files) => ({
            ...files,
            [failedUploadFile?.uid]: failedUploadFile
          }))
      },
      () => {
        uploadFile.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
          const currentFile = {
            id: fileId,
            name: file?.name,
            fileUrl: downloadURL,
            uid: file?.uid
          }
          currentFile?.name &&
            setFilesList((files) => ({
              ...files,
              [currentFile?.uid]: currentFile
            }))
          // onMediaUploaded(currentFile)
        })
      }
    )
  }
  const onRemove = (file) => {
    const asArray = Object.entries(filesList)
    const filteredFiles = asArray?.filter(([key, value]) => key !== file?.uid)
    const filteredFilesToObj = Object.fromEntries(filteredFiles)
    storage
      .ref('files')
      .child(file?.uid)
      .delete()
      .then(() => {
        setFilesList(filteredFilesToObj)
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('error, ', error)
        message.error(t("Couldn't delete file"))
      })
  }

  const onApply = () => {
    const uploaderData = Object.keys(filesList).length ? filesList : ''
    const data = {
      question,
      answer: { value: uploaderData }
    }
    question?.isRequired
      ? uploaderData
        ? onContinue?.(data)
        : message.error(t('The answer is required'))
      : onContinue?.(data)
  }

  useKeyPress(
    (event) => event.keyCode === 13 && currentSlide === question?.order,
    (event) => {
      if (event.type === 'keyup') {
        onApply()
      }
    },
    {
      events: ['keydown', 'keyup']
    }
  )

  return (
    <Box flexDirection="column">
      <Dragger
        style={{ borderRadius: 'var(--btn-border-radius-base)' }}
        {...config}
        {...props}
        customRequest={onChange}
        fileList={[]}
        disabled={!onContinue}>
        <Box onMouseDown={(e) => e.preventDefault()} ref={hoverRef}>
          <Box display="flex" justifyContent="center" mb="8px">
            <IconLabel disabled={!onContinue} isHovering={isHovering}>
              <InboxOutlined style={{ fontSize: '24px' }} />
            </IconLabel>
          </Box>
          <Box textAlign="center">
            <Text color="var(--qf-typography-subtitle-color)">
              {t('Click or drag file to this area to upload')}
            </Text>
          </Box>
        </Box>
      </Dragger>
      <Box mt={3}>
        {Object.values(filesList)?.map((file) => (
          <UploadItem my={1} py={2} px={3}>
            <Row noGutters>
              <Col cw="auto" v="center" mr={2}>
                <FileOutlined />
              </Col>
              <Col v="center">
                <Text
                  color="var(--qf-typography-subtitle-color)"
                  wordBreak="break-all">
                  {file?.name}
                </Text>
              </Col>
              <Col cw="auto" v="center">
                {file?.percent ? (
                  <Progress type="circle" percent={file?.percent} width={24} />
                ) : (
                  <Popconfirm
                    onConfirm={() => onRemove(file)}
                    title={t('Delete this item?')}
                    okType="danger"
                    okText={t('Delete')}
                    cancelText={t('Cancel')}>
                    <Button
                      shape="circle"
                      type="text"
                      color="red"
                      size="small"
                      danger>
                      <DeleteOutlined />
                    </Button>
                  </Popconfirm>
                )}
              </Col>
            </Row>
          </UploadItem>
        ))}
      </Box>
      <Box mt="24px">
        <SubmitButton onClick={onApply} disablePressEnter />
      </Box>
    </Box>
  )
}

UploadArea.propTypes = {
  onContinue: PropTypes.func,
  question: PropTypes.object,
  currentSlide: PropTypes.number
}

export default UploadArea
