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

    this.state = {}
    this.subscriptions = []

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
    const qiaPaginatorElementPageChangedHandler = function (event) {
      pageContainer.innerHTML = `Qia Paginator demo - paged content for page ${event.detail.current}`
    }
    qiaPaginatorElement.addEventListener('pageChanged', qiaPaginatorElementPageChangedHandler)

    this.subscriptions.push([qiaPaginatorElement, 'pageChanged', qiaPaginatorElementPageChangedHandler])
  }

  componentWillUnmount() {
    this.subscriptions.forEach(([element, eventType, eventHandler]) => {
      element.removeEventListener(eventType, eventHandler)
    })
  }

  render() {
    return (
      <div ref={this.nativeElement} className="react-component">
        <h1>Qia Web Widgets</h1>
        <div className="react-components-container">
          <h2>React Components</h2>
          <QiaPaginatorReactComponent className="qia-paginator-react-component" current={4} total={7} />
          <QiaSkeletonReactComponent className="qia-skeleton-react-component" />
        </div>
        <div className="qia-paginators">
          <h2>Qia Paginators</h2>
          <qia-paginator class="web-component-in-react-component" current="2" total="3"></qia-paginator>
          <qia-paginator class="web-component-in-react-component" current="1" total="5"></qia-paginator>
          <qia-paginator class="web-component-in-react-component" current="3" total="7"></qia-paginator>
          <div className="qia-paginator-group">
            <qia-paginator class="web-component-in-react-component" current="3" total="9"></qia-paginator>
            <qia-paginator class="web-component-in-react-component" current="5" total="9"></qia-paginator>
            <qia-paginator class="web-component-in-react-component" current="7" total="9"></qia-paginator>
          </div>
          <div className="paged-content">
            <div className="page-container"></div>
            <div className="qia-paginator-container"></div>
          </div>
        </div>
        <div className="qia-skeletons">
          <h2>Qia Skeletons</h2>
          <qia-skeleton class="web-component-in-react-component"></qia-skeleton>
          <div className="qia-skeleton-container"></div>
        </div>
      </div>
    )
  }
}

export default App
