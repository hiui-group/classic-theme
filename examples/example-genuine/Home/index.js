import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import Grid from '@hi-ui/hiui/es/grid'
import Button from '@hi-ui/hiui/es/button'
import Dropdown from '@hi-ui/hiui/es/dropdown'
import Table from '@hi-ui/hiui/es/table'
import echarts from 'echarts'
import theme from './echart-theme'
import './index.scss'

echarts.registerTheme('hiui_theme', theme)
const { Row, Col } = Grid

// 防抖处理
function debounce (fn, wait) {
  let timeout = null
  return function () {
    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(fn, wait)
  }
}

class HomeDashboard extends Component {
  constructor (props) {
    super(props)

    this.columns = [
      { title: 'Column 1', dataIndex: 'name', key: '1' },
      { title: 'Column 1', dataIndex: 'age', key: '2' },
      { title: 'Column 1', dataIndex: 'address', key: '3' },
      {
        title: () => <div>自定义标题</div>,
        dataIndex: 'address',
        key: '4',
        render (text, record, index) {
          return (
            <div>
              {text} --- {index} --- 自定义渲染
            </div>
          )
        }
      },
      {
        title: 'Action',
        key: 'operation',
        width: 100,
        render: () => <Button appearance='link' href='#'>action</Button>
      }
    ]

    this.tableDatas = []
    for (let i = 0; i < 10; i++) {
      this.tableDatas.push({
        // key: i,
        name: `Don Diablo ${i}`,
        age: `${i}${i}`,
        address: `EDC Las Vegas no. ${i}`
      })
    }

    this.echartRefs = []
    this.indexData = [
      {
        amount: '1,300,800',
        name: 'index name'
      },
      {
        amount: '34,000',
        name: 'index name'
      },
      {
        amount: '82',
        name: 'index name'
      }
    ]
    this.indexData = this.indexData.concat(this.indexData)
    this.transportList = [
      { title: '顺丰速运' },
      { title: '中通快递' },
      { title: '圆通快递' },
      { title: '百世快递' },
      { title: '韵达快递' }
    ]
    this.monthList = [
      { title: '11月' },
      { title: '10月' },
      { title: '9月' }
    ]
  }

  componentDidMount () {
    window.onresize = debounce(() => {
      this.echartRefs.forEach(chart => {
        chart && chart.getEchartsInstance().resize()
      })
    }, 50)
  }

  componentWillUnmount () {
    window.onresize = null
  }

  columnarOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      }
    },
    legend: {
      data: ['总参', '八期']
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: true
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    xAxis: {
      type: 'category',
      data: ['顺丰速运', '中通快递', '圆通快递', '百世快递', '韵达快递']
    },
    series: [
      {
        name: '总参',
        type: 'bar',
        barWidth: 20,
        data: [75, 35, 55, 42, 8]
      },
      {
        name: '八期',
        type: 'bar',
        barWidth: 20,
        data: [62, 83, 42, 42, 30]
      }
    ]
  }

  linearOption = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: true
    },
    legend: {
      data: ['询价', '下单']
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '询价',
        data: [120, 165, 150, 240, 260, 180, 190],
        type: 'line',
        smooth: true
      },
      {
        name: '下单',
        data: [95, 98, 52, 125, 155, 115, 99],
        type: 'line',
        smooth: true
      }]
  }

  pieOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      x: 'right',
      data: ['顺丰快递', '申通快递', '中通快递', '其它快递']
    },
    grid: {
      containLabel: true
    },
    series: [
      {
        type: 'pie',
        radius: ['55%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 45, name: '顺丰快递' },
          { value: 20, name: '申通快递' },
          { value: 25, name: '中通快递' },
          { value: 10, name: '其它快递' }
        ]
      }
    ]
  }

  areaOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        type: 'line',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        areaStyle: {normal: {}},
        data: [540, 732, 1320]
      }
    ]
  }
  gaugeOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {}
      }
    },
    series: [
      {
        name: '完成率',
        type: 'gauge',
        splitNumber: 4,
        detail: {formatter: '{value}%'},
        data: [{value: 50}],
        axisLine: {
          lineStyle: {
            width: 10
          }
        },
        splitLine: {
          length: 15
        }
      }
    ]
  }
  render () {
    this.echartRefs.length = 0
    return (
      <div className='page page--dashboard'>
        <Row gutter>
          <Col span={24}>
            <span className='top-btn'>最新报表</span>
            <span className='top-btn'>昨日报表</span>
            <span className='top-btn'>本月报表</span>
          </Col>
        </Row>
        <Row gutter>
          {
            this.indexData.map((item, index) => {
              return (
                <Col span={4} key={index}>
                  <div className='info'>
                    <span className='info__amount'>{item.amount}</span>
                    <span className='info__name'>{item.name}</span>
                  </div>
                </Col>
              )
            })
          }
        </Row>
        <Row gutter>
          <Col span={12}>
            <div className='card'>
              <div className='card__header'>
                <span className='card__title'>快递数量</span>
              </div>
              <div className='card__body'>
                <ReactEcharts
                  ref={echart => this.echartRefs.push(echart)}
                  option={this.columnarOption}
                  opts={{ renderer: 'svg' }}
                  className='card__canvas'
                  theme='hiui_theme'
                />
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className='card'>
              <div className='card__header'>
                <span className='card__title'>询价下单量</span>
                <div className='card__filter'>
                  <Dropdown list={this.transportList} title='物流公司' onClick={(val) => console.log(val)} />
                  <Dropdown list={this.monthList} title='本月' onClick={(val) => console.log(val)} />
                </div>
              </div>
              <div className='card__body'>
                <ReactEcharts
                  ref={echart => this.echartRefs.push(echart)}
                  option={this.linearOption}
                  opts={{ renderer: 'svg' }}
                  className='card__canvas'
                  theme='hiui_theme'
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row gutter>
          <Col span={8}>
            <div className='card'>
              <div className='card__header'>
                <span className='card__title'>快递类别占比</span>
              </div>
              <div className='card__body'>
                <ReactEcharts
                  ref={echart => this.echartRefs.push(echart)}
                  option={this.pieOption}
                  opts={{ renderer: 'svg' }}
                  className='card__canvas'
                  theme='hiui_theme'
                />
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className='card'>
              <div className='card__header'>
                <span className='card__title'>预算情况（万元）</span>
              </div>
              <div className='card__body'>
                <ReactEcharts
                  ref={echart => this.echartRefs.push(echart)}
                  option={this.areaOption}
                  opts={{ renderer: 'svg' }}
                  className='card__canvas'
                  theme='hiui_theme'
                />
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className='card'>
              <div className='card__header'>
                <span className='card__title'>完成率</span>
              </div>
              <div className='card__body'>
                <ReactEcharts
                  ref={echart => this.echartRefs.push(echart)}
                  option={this.gaugeOption}
                  opts={{ renderer: 'svg' }}
                  className='card__canvas'
                  theme='hiui_theme'
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className='card'>
              <div className='card__header'>
                <span className='card__title'>列表</span>
              </div>
              <div className='card__body'>
                <Table
                  columns={this.columns}
                  data={this.tableDatas}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default HomeDashboard
