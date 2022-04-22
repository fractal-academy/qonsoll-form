import '@qonsoll/qvideo/dist/styles/styles.css'

import { Box, Button } from '@qonsoll/react-design'

import { Player } from '@qonsoll/qvideo'
import QVIDEO_API_KEY from '../../constants/qvideoApiKey'
import React from 'react'
import { Tooltip } from 'antd'
import { useTranslations } from '@qonsoll/translation'

const API_KEY = process.env.REACT_APP_QVIDEO_API_KEY || QVIDEO_API_KEY
function VideoPlayer(props) {
  const { videoKey, onVideoRemove, withDelete, customOptions } = props

  const { t } = useTranslations()

  return (
    <Box height="inherit" position="relative">
      {withDelete && (
        <Tooltip title={t('Delete this video and record new')}>
          <Button
            //TODO add delete video from DB with onClick
            onClick={onVideoRemove}
            position="absolute"
            size="small"
            type="danger"
            zIndex="1"
            right={1}
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
    </Box>
  )
}

export default VideoPlayer
