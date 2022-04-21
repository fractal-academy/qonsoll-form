import '@qonsoll/qvideo/dist/styles/styles.css'

import { Button } from '@qonsoll/react-design'
import { Player } from '@qonsoll/qvideo'
import QVIDEO_API_KEY from '../../constants/qvideoApiKey'
import React from 'react'
import { Tooltip } from 'antd'
import { useTranslations } from '@qonsoll/translation'

const API_KEY = process.env.REACT_APP_QVIDEO_API_KEY || QVIDEO_API_KEY
function VideoPlayer(props) {
  const { videoKey, deleteVideo, withDelete, customOptions } = props

  const { t } = useTranslations()

  return (
    <>
      {withDelete && (
        <Tooltip title={t('Delete this video and record new')}>
          <Button
            //TODO add delete video from DB with onClick
            onClick={deleteVideo}
            size="small"
            type="danger"
            position="absolute"
            zIndex="1"
            videoToken=""
            left={1}
            top={1}>
            X
          </Button>
        </Tooltip>
      )}
      <Player
        autoLoad
        spinnerSize="md"
        apiKey={API_KEY}
        videoToken={videoKey}
        customOptions={customOptions}
      />
    </>
  )
}

export default VideoPlayer
