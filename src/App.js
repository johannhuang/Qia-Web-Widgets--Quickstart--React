import React from 'react'

import {
  QiaSkeleton,
  QiaSkeletonReactComponent,
  QiaPaginator,
  QiaPaginatorReactComponent
} from 'qia-widgets'

import './App.css'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      qiaPaginatorObject: {
        current: 4,
        total: 7,
        // NOTE: 20201121, the API of QiaPaginatorReactComponent is subject to change
        // NOTE: 20201121, in current design, QiaPaginatorReactComponent is a completely controlled component without internal state
        onPageChange: (event) => {
          this.setState((state, props) => {
            return {
              qiaPaginatorObject: {
                current: event.value,
                total: state.qiaPaginatorObject.total,
                onPageChange: state.qiaPaginatorObject.onPageChange
              }
            }
          })
        }
      }
    }

    // NOTE: for imperative in declarative
    this.nativeElement = React.createRef()
  }

  componentDidMount() {
    const containerElement = this.nativeElement.current

    const qiaSkeletonContainer = containerElement.querySelector('.qia-skeleton-container')
    const qiaSkeleton = new QiaSkeleton({}, qiaSkeletonContainer)

    const qiaPaginatorContainer = containerElement.querySelector('.qia-paginator-container')
    const qiaPaginator = new QiaPaginator({current: 92, total: 97}, qiaPaginatorContainer)
    const qiaPaginatorElement = qiaPaginator.element

    const pageContainer = containerElement.querySelector('.page-container')
    pageContainer.innerHTML = `Qia Paginator demo - paged content for page ${92}`

    qiaPaginatorElement.addEventListener('pageChanged', function (event) {
      pageContainer.innerHTML = `Qia Paginator demo - paged content for page ${event.detail.current}`
    })
  }

  render() {
    return (
      <div ref={this.nativeElement} className="react-component">
        <h1>Qia Web Widgets</h1>
        <div className="qia-paginators">
          <h2>Qia Paginators</h2>
          <qia-paginator class="web-component-in-react-component" current="2" total="3"></qia-paginator>
          <qia-paginator class="web-component-in-react-component" current="1" total="5"></qia-paginator>
          <qia-paginator class="web-component-in-react-component" current="3" total="7"></qia-paginator>
          <qia-paginator class="web-component-in-react-component" current="5" total="9"></qia-paginator>
          <div className="paged-content">
            <div className="page-container"></div>
            <div className="qia-paginator-container"></div>
          </div>
          <span className="react-component-container">
            <QiaPaginatorReactComponent
              current={this.state.qiaPaginatorObject.current}
              total={this.state.qiaPaginatorObject.total}
              onPageChange={this.state.qiaPaginatorObject.onPageChange}
              onPageChanged={() => {}} />
          </span>
        </div>
        <div className="qia-skeletons">
          <h2>Qia Skeletons</h2>
          <qia-skeleton class="web-component-in-react-component"></qia-skeleton>
          <span className="qia-skeleton-container"></span>
          <span className="react-component-container">
            <QiaSkeletonReactComponent className="qia-skeleton" />
          </span>
        </div>
      </div>
    )
  }
}

export default App
