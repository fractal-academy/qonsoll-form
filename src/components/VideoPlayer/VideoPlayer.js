import React from 'react'
import { Tooltip } from 'antd'
import { Player } from '@qonsoll/qvideo'
import '@qonsoll/qvideo/dist/styles/styles.css'
import { Button } from '@qonsoll/react-design'
import { useTranslation } from '../../context/Translation'
import QVIDEO_API_KEY from '../../constants/qvideoApiKey'

const API_KEY = process.env.REACT_APP_QVIDEO_API_KEY || QVIDEO_API_KEY

function VideoPlayer(props) {
  const { videoKey, deleteVideo, withDelete, customOptions } = props

  const { qvideoDeleteVideoButton } = useTranslation()

  return (
    <>
      {withDelete && (
        <Tooltip
          title={qvideoDeleteVideoButton || 'Delete this video and record new'}>
          <Button
            onClick={deleteVideo}
            position="absolute"
            size="small"
            type="danger"
            zIndex="1"
            left={1}
            top={1}>
            X
          </Button>
        </Tooltip>
      )}
      <Player
        spinnerText="loading"
        spinnerSize="md"
        apiKey={API_KEY}
        videoToken={videoKey}
        customOptions={customOptions}
      />
    </>
  )
}

export default VideoPlayer
