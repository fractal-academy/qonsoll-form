import PropTypes from 'prop-types'
import { Popconfirm } from 'antd'
import { useHover } from '@umijs/hooks'
import { Row } from '@qonsoll/react-design'
import { DEFAULT_IMAGE, TEXTINGS } from '../../constants'
import { CloseOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'
import { useTranslation } from '../../context/Translation'
import { MediaLibraryModal } from '../../domains/MediaLibrary/components'
import {
  LetterBox,
  DeleteButton,
  ChoiceInput,
  ChoiceOptionCol,
  MediaBox,
  MainBox
} from './ChoiceEditable.styles'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from '../../context/CurrentQuestion'

let startLetter = 65

function ChoiceEditable(props) {
  const { index, data, withImage } = props

  //[CUSTOM HOOKS]

  // [ADDITIONAL HOOKS]
  const [isHovering, hoverRef] = useHover()
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()
  const { choicePlaceholder, conditionRemovingWarn, removeButton } =
    useTranslation()

  // [COMPONENT STATE HOOKS]
  const [value, setValue] = useState(data?.answerOption)

  // [COMPUTED PROPERTIES]
  const choiceProps = currentQuestion?.questionConfigurations
  const letter = String.fromCharCode(startLetter + index)
  const bgImage = `url(${data?.image || DEFAULT_IMAGE})`

  const hasConditions = data.redirectQuestion !== ''

  // [CLEAN FUNCTIONS]
  const onChange = (e) => {
    setValue(e.target.value)
  }
  const onBlur = async () => {
    //if the value has not changed do nothing, reduce the number of queries to the database
    if (choiceProps[index].answerOption === value) return
    // update the choice we need
    choiceProps[index].answerOption = value
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { questionConfigurations: choiceProps }
    })
  }

  const onDelete = async () => {
    //remove item from array with 'index' position,
    //'1' - amount of deleted elements from index position till the end(check how splice works for details)
    choiceProps.splice(index, 1)
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { questionConfigurations: choiceProps }
    })
  }
  const onMediaModalContinue = (selectedImage) => {
    choiceProps[index].image = selectedImage
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
    <MainBox m={1} withImage={withImage} ref={hoverRef}>
      {withImage && (
        <MediaBox backgroundImage={bgImage} mx={2} mt={2}>
          <MediaLibraryModal
            btnProps={{
              type: 'primary'
            }}
            isHovering={isHovering}
            onContinue={onMediaModalContinue}
          />
        </MediaBox>
      )}
      <Row noGutters px={2}>
        <LetterBox withImage={withImage}>{letter}</LetterBox>
        <ChoiceOptionCol
          width={withImage ? '150px' : '100%'}
          withImage={withImage}>
          <ChoiceInput
            withImage={withImage}
            maxLength="150"
            value={value}
            onBlur={onBlur}
            placeholder={`${
              choicePlaceholder || TEXTINGS.choicePlaceholder
            } ${index}`}
            autoSize={{ minRows: 1, maxRows: 12 }}
            bordered={false}
            onChange={onChange}
          />
        </ChoiceOptionCol>
      </Row>
      {isHovering &&
        (hasConditions ? (
          <Popconfirm
            title={conditionRemovingWarn || TEXTINGS.conditionRemovingWarn}
            onConfirm={onDelete}
            okType="danger"
            okText={removeButton || TEXTINGS.removeButton}>
            <DeleteButton>
              <CloseOutlined />
            </DeleteButton>
          </Popconfirm>
        ) : (
          <DeleteButton onClick={onDelete}>
            <CloseOutlined />
          </DeleteButton>
        ))}
    </MainBox>
  )
}

ChoiceEditable.propTypes = {
  index: PropTypes.number,
  data: PropTypes.object,
  withImage: PropTypes.bool
}

export default ChoiceEditable
