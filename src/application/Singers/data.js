import React, { createContext, useReducer } from 'react'
import { fromJS } from 'immutable'

// 创建上下文
export const CategoryDataContext = createContext({})
// 常量 action.type
export const CHANGE_CATEGORY = 'singers/CHANGE_CATEGORY'
export const CHANGE_ALPHA = 'singers/CHANGE_ALPHA'

// reducer纯函数(更改数据)
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return state.set('category', action.data)
    case CHANGE_ALPHA:
      return state.set('alpha', action.data)
    default:
      return state
  }
}
// Provide组件
export const Data = props => {
  // useReducer第二个参数传入初始值
  const [data, dispatch] = useReducer(
    reducer,
    fromJS({
      category: '',
      alpha: ''
    })
  )
  return (
    <CategoryDataContext.Provider value={{ data, dispatch }}>
      {props.children}
    </CategoryDataContext.Provider>
  )
}
