import { useState } from 'react'
import { firestore } from 'app/services'
import { useHistory } from 'react-router'
import { styles } from './FormShow.style'
import { globalStyles } from 'app/styles'
import { useKeyPress } from '@umijs/hooks'
import { Button, Divider, Typography } from 'antd'
import { Row, Col, Box } from '@qonsoll/react-design'
import { FormAdvancedView } from 'domains/Form/components'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { QuestionAdvancedView } from 'domains/Question/components'
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons'

const { Title } = Typography

function FormShow(props) {
  // [ADDITIONAL HOOKS]
  const history = useHistory()
  const [data] = useCollectionData(firestore.collection('questions'))
  useKeyPress('enter', (event) => {
    onClick()
  })

  // [COMPONENT STATE HOOKS]
  const [isAnswered, setIsAnswered] = useState(false)

  // [CLEAN FUNCTIONS]
  const onRestart = () => {}
  const onClick = () => {
    setIsAnswered(true)
  }

  return (
    <Box bg="#f6f9fe" display="flex" flexDirection="column" height="100%">
      <Row noGutters bg="white" py={3} px={4}>
        <Col cw="auto" v="center" p={0}>
          <Button
            type="text"
            size="small"
            onClick={() => history.goBack()}
            style={globalStyles.resetPadding}
            icon={<ArrowLeftOutlined style={globalStyles.iconSize} />}
          />
        </Col>
        <Col style={styles.textAlign}>
          <Title level={5} style={globalStyles.resetMargin}>
            Live Preview
          </Title>
        </Col>
        <Col cw="auto" v="center">
          <Button
            type="text"
            size="small"
            icon={<ReloadOutlined />}
            onClick={onRestart}>
            Restart
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Divider style={globalStyles.resetMargin} />
        </Col>
      </Row>

      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
        m={4}
        borderRadius="8px"
        bg="white">
        <FormAdvancedView isAnswered={isAnswered} setIsAnswered={setIsAnswered}>
          {data?.map((item, index) => (
            <Box key={index} height="600px">
              <QuestionAdvancedView
                data={item}
                questionNumber={index + 1}
                onClick={onClick}
              />
            </Box>
          ))}
        </FormAdvancedView>
      </Box>
    </Box>
  )
}

export default FormShow
