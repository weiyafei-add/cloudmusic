import React from 'react'
import { GlobalStyle } from './style'
import { IconStyle } from './assets/iconfont/iconfont'
import { renderRoutes } from 'react-router-config' // renderRoutes读取路由配置文件转换为Router标签
import routes from './routes'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index'
import { Data } from './application/Singers/data'
function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <Data>{renderRoutes(routes)}</Data>
      </HashRouter>
    </Provider>
  )
}

export default App
