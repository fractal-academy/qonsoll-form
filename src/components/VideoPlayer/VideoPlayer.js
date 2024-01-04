import '@qonsoll/qvideo/dist/styles/styles.css'

import { Icon } from '@qonsoll/icons'
import { Player } from '@qonsoll/qvideo'
import PropTypes from 'prop-types'
import QVIDEO_API_KEY from '../../constants/qvideoApiKey'
import React from 'react'
import { Tooltip } from 'antd'
import { useTranslations } from '@qonsoll/translation'

const API_KEY = process.env.REACT_APP_QVIDEO_API_KEY || QVIDEO_API_KEY
function VideoPlayer(props) {
  const { videoKey, deleteVideo, withDelete, customOptions } = props

  const { t } = useTranslations()

  return (
    <div height="inherit" position="relative">
      {withDelete && (
        <Tooltip title={t('Delete this video and record new')}>
          {/*//TODO add delete video from DB with onClick*/}
          {/* <Remove
            position="absolute"
            top={10}
            right={10}
            zIndex="1"
            question={t('Are you sure you want to remove')}
            icon={<Icon name="TrashFilled" size={20} fill="currentColor" />}
            type="primary"
            onSubmit={deleteVideo}
            popconfirmPlacement="bottomRight"
            confirmLabel={t('Yes, remove')}
            cancelLabel={t('No, keep')}
            itemName={t('video')}
          /> */}
        </Tooltip>
      )}
      <Player
        autoLoad
        spinnerSize="md"
        apiKey={API_KEY}
        videoToken={videoKey}
        customOptions={customOptions}
      />
    </div>
  )
}

VideoPlayer.propTypes = {
  videoKey: PropTypes.string,
  deleteVideo: PropTypes.func,
  withDelete: PropTypes.bool,
  customOptions: PropTypes.object
}

export default VideoPlayer
