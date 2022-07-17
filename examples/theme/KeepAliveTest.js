import React from 'react'
import { Grid, Button, Radio, Input, Form, Select, Cascader } from '@hi-ui/hiui'

class KeepAliveTest extends React.Component {
  constructor(props) {
    super(props)
    console.log('KeepAliveTest constructor --------------', props)
    this.form = React.createRef()
    this.state = {
      form: {
        name: '',
        region: '',
        count: '',
        store: ''
      },
      checkedIndex: -1,
      options: [
        {
          id: '手机',
          title: '手机',
          children: [
            {
              id: '小米',
              title: '小米',
              children: [
                {
                  id: '小米3',
                  title: '小米3'
                },
                {
                  id: '小米4',
                  title: '小米4'
                }
              ]
            },
            {
              id: '红米',
              title: '红米',
              children: [
                {
                  id: '红米3',
                  title: '红米3'
                },
                {
                  id: '红米4',
                  title: '红米4'
                }
              ]
            }
          ]
        },
        {
          id: '电视',
          title: '电视',
          children: [
            {
              id: '小米电视4A',
              title: '小米电视4A'
            },
            {
              id: '小米电视4C',
              title: '小米电视4C'
            }
          ]
        }
      ],
      rules: {
        name: {
          required: true,
          message: <span style={{ color: '#ccc' }}>请输入名称</span>,
          trigger: 'onBlur,onChange'
        },
        region: {
          required: true,
          message: '请选择区域',
          trigger: 'onChange'
        },
        count: {
          required: true,
          trigger: 'onChange',
          validator: (rule, value, cb) => {
            const count = +value
            if (isNaN(count)) {
              // eslint-disable-next-line standard/no-callback-literal
              cb('请输入数字')
            } else if (count <= 0) {
              // eslint-disable-next-line standard/no-callback-literal
              cb('必须是正数')
            } else {
              cb()
            }
          }
        }
      }
    }
  }

  handleSubmit() {
    this.form.current.validate((valid, error) => {
      console.log('valid:', valid, 'error:', error)
      if (!error) {
        console.log(valid)
        alert('submit')
      } else {
        console.log('error', error)
        return false
      }
    })
  }

  cancelSubmit() {
    this.setState({
      form: {
        name: '',
        region: '',
        count: ''
      }
    })
    this.form.current.resetValidates()
  }

  // 清除校验信息
  clearValidates() {
    this.form.current.clearValidates()
  }

  render() {
    const Row = Grid.Row
    const Col = Grid.Col
    const FormItem = Form.Item
    return (
      <div style={{ background: '#fff', padding: '10px' }}>
        <h2>keep-alive</h2>
        <p>设置该页面为 keepAlive 状态为true时候，会缓存该页面实例</p>
        <Row>
          <Col span={12}>
            <Form
              ref={this.form}
              rules={this.state.rules}
              initialValues={{
                name: '',
                count: 0,
                store: '',
                region: '',
                category: ''
              }}
              labelWidth="80"
              labelPlacement="right"
            >
              <FormItem label="名称" field="name">
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem label="数量" field="count">
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem label="门店" field="store">
                <Select
                  data={[
                    { title: '电视', id: '3' },
                    { title: '手机', id: '2' },
                    { title: '笔记本', id: '4' },
                    { title: '生活周边', id: '5' },
                    { title: '办公', id: '6' }
                  ]}
                  searchable
                  showCheckAll
                  placeholder="请选择"
                  emptyContent="无匹配数据"
                  onChange={(item) => {
                    console.log('多选结果', item)
                  }}
                />
              </FormItem>
              <FormItem label="品类" field="category">
                <Cascader
                  onChange={(id) => {
                    console.log('change')
                  }}
                  data={this.state.options}
                  style={{ width: '100%' }}
                />
              </FormItem>
              <FormItem label="地区" field="region">
                <Radio.Group
                  data={[
                    { id: 'beijing', title: '北京' },
                    { id: 'shanghai', title: '上海' },
                    { id: 'chongqing', title: '重庆' }
                  ]}
                />
              </FormItem>

              <FormItem>
                <div>
                  <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                    提交
                  </Button>
                  <Button type="default" onClick={this.cancelSubmit.bind(this)}>
                    重置
                  </Button>
                  <Button type="default" onClick={this.clearValidates.bind(this)}>
                    清除校验信息
                  </Button>
                </div>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default KeepAliveTest
