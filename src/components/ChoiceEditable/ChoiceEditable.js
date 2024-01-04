import {
  ChoiceInput,
  Letter,
  Media,
  Remove,
  Wrapper
} from './ChoiceEditable.styles'
import { Col, Popconfirm } from 'antd'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from '../../context/CurrentQuestion'
import React, { useEffect, useState } from 'react'

import { CloseOutlined } from '@ant-design/icons'
import { DEFAULT_IMAGE } from '../../constants'
import { MediaLibraryModal } from '../../domains/MediaLibrary/components'
import PropTypes from 'prop-types'
import { useHover } from '@umijs/hooks'
import { useTranslations } from '@qonsoll/translation'

let startLetter = 65

function ChoiceEditable(props) {
  const { index, data, withImage } = props

  // [ADDITIONAL HOOKS]
  const [isHovering, hoverRef] = useHover()
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()
  const { t } = useTranslations()

  // [COMPONENT STATE HOOKS]
  const [value, setValue] = useState(data?.answerOption)

  // [COMPUTED PROPERTIES]
  const choiceProps = currentQuestion?.questionConfigurations
  const letter = String.fromCharCode(startLetter + index - 1)
  const bgImage = `url(${data?.image || DEFAULT_IMAGE})`

  const hasConditions = data.redirectQuestion !== ''

  // [CLEAN FUNCTIONS]
  const onChange = (e) => {
    setValue(e.target.value)
  }
  const onBlur = async () => {
    //if the value has not changed do nothing, reduce the number of queries to the database
    if (choiceProps[index - 1].answerOption === value) return
    // update the choice we need
    choiceProps[index - 1].answerOption = value
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { questionConfigurations: choiceProps }
    })
  }

  const onDelete = async () => {
    //remove item from array with 'index' position,
    //'1' - amount of deleted elements from index position till the end(check how splice works for details)
    choiceProps.splice(index - 1, 1)
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { questionConfigurations: choiceProps }
    })
  }
  const onMediaModalContinue = (selectedImage) => {
    choiceProps[index - 1].image = selectedImage
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { questionConfigurations: choiceProps }
    })
  }

  // [USE_EFFECTS]
  useEffect(() => {
    //update text area value when delete element
    setValue(data?.answerOption)
  }, [data])

  return (
    <Wrapper noGutters v="center" withImage={withImage} ref={hoverRef}>
      {withImage && (
        <Media cw={12} backgroundImage={bgImage}>
          <MediaLibraryModal
            btnProps={{
              type: 'primary'
            }}
            isHovering={isHovering}
            onContinue={onMediaModalContinue}
          />
        </Media>
      )}

      <Col cw="auto">
        <Letter>{letter}</Letter>
      </Col>

      <Col>
        <ChoiceInput
          maxLength={150}
          value={value}
          onBlur={onBlur}
          placeholder={`${t('Choice')} ${index}`}
          autoSize={{ minRows: 1, maxRows: 6 }}
          bordered={false}
          onChange={onChange}
        />
      </Col>

      {isHovering &&
        (hasConditions ? (
          <Popconfirm
            title={t('This option has connected logic, delete it anyway?')}
            onConfirm={onDelete}
            okType="danger"
            okText={t('Delete')}
            cancelText={t('Cancel')}
          >
            <Remove>
              <CloseOutlined />
            </Remove>
          </Popconfirm>
        ) : (
          <Remove onClick={onDelete}>
            <CloseOutlined />
          </Remove>
        ))}
    </Wrapper>
    // <MainBox mb="8px" mr={withImage && 2} withImage={withImage} ref={hoverRef}>
    //   {withImage && (
    //     <MediaBox backgroundImage={bgImage} mx={2} mt={2}>
    //       <MediaLibraryModal
    //         btnProps={{
    //           type: 'primary'
    //         }}
    //         isHovering={isHovering}
    //         onContinue={onMediaModalContinue}
    //       />
    //     </MediaBox>
    //   )}
    //   <Row noGutters v="center" padding="12px 24px">
    //     <LetterBox cw="auto" withImage={withImage}>
    //       {letter}
    //     </LetterBox>
    //     <ChoiceOptionCol
    //       width={withImage ? '150px' : '100%'}
    //       withImage={withImage}>
    //       <ChoiceInput
    //         withImage={withImage}
    //         maxLength="150"
    //         value={value}
    //         onBlur={onBlur}
    //         placeholder={`${t('Choice')} ${index}`}
    //         autoSize={{ minRows: 1, maxRows: 12 }}
    //         bordered={false}
    //         onChange={onChange}
    //       />
    //     </ChoiceOptionCol>
    //   </Row>
    //   {isHovering &&
    //     (hasConditions ? (
    //       <Popconfirm
    //         title={t('This option has connected logic, delete it anyway?')}
    //         onConfirm={onDelete}
    //         okType="danger"
    //         okText={t('Delete')}
    //         cancelText={t('Cancel')}>
    //         <DeleteButton>
    //           <CloseOutlined />
    //         </DeleteButton>
    //       </Popconfirm>
    //     ) : (
    //       <DeleteButton onClick={onDelete}>
    //         <CloseOutlined />
    //       </DeleteButton>
    //     ))}
    // </MainBox>
  )
}

ChoiceEditable.propTypes = {
  index: PropTypes.number,
  data: PropTypes.object,
  withImage: PropTypes.bool
}

export default ChoiceEditable
