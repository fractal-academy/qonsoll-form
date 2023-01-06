import { List } from 'antd'
import { MediaView } from '..'
import { NoData } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import React from 'react'
import { useTranslations } from '@qonsoll/translation'

const MediaList = (props) => {
  const { media, selected, handleSelect } = props

  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()

  return (
    <List
      dataSource={media}
      grid={{
        gutter: [24, 2],
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 4
      }}
      locale={{
        emptyText: <NoData description={t('There is no media uploaded yet')} />
      }}
      renderItem={(item, index) => (
        <List.Item key={item?.id || index}>
          <MediaView
            {...item}
            selected={selected}
            handleSelect={handleSelect}
          />
        </List.Item>
      )}
    />
  )
}

MediaList.propTypes = {
  media: PropTypes.array,
  selected: PropTypes.bool,
  handleSelect: PropTypes.func
}

export default MediaList
