import React from 'react'
import '@qonsoll/qvideo/dist/styles/styles.css'
import { Player } from '@qonsoll/qvideo'
import { Button } from '@qonsoll/react-design'
import { Tooltip } from 'antd'
import { useTranslation } from '../../context/Translation'

const API_KEY = '6da3bb20-8bfb-44b6-b96a-94be93941aa0'

function VideoPlayer(props) {
  const { videoKey, deleteVideo, withDelete, customOptions } = props

  const { qvideoDeleteVideoButton } = useTranslation()

  return (
    <>
      {withDelete && (
        <Tooltip
          title={qvideoDeleteVideoButton || 'Delete this video and record new'}>
          <Button
            //TODO add delete video from DB with onClick
            onClick={deleteVideo}
            size="small"
            type="danger"
            position="absolute"
            zIndex="1"
            videoToken=""
            right={1}
            top={1}>
            X
          </Button>
        </Tooltip>
      )}
      <Player
        circle
        spinnerText="qForm"
        apiKey={API_KEY}
        videoToken={videoKey}
        customOptions={customOptions}
      />
    </>
  )
}

export default VideoPlayer
