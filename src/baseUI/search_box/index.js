import React, { useRef, useEffect, useState, useMemo } from 'react'
import { SearchBoxWrapper } from './style'
import { debounce } from '../../api/utils'
function SearchBox(props) {
  const [query, setQuery] = useState('')
  const queryRef = useRef()
  // 父组件传过来的热门关键词
  const { newQuery } = props
  // 父组件针对搜索关键字发送请求的处理
  const { handleQuery } = props
  // 是否显示清除按钮
  const displayStyle = query ? { display: 'block' } : { display: 'none' }
  useEffect(() => {
    queryRef.current.focus()
  }, [])
  let handleDebounce = useMemo(() => {
    return debounce(handleQuery, 500)
  }, [handleQuery])

  useEffect(() => {
    handleDebounce(query)
  }, [query])

  useEffect(() => {
    if (newQuery !== query) {
      setQuery(newQuery)
    }
  }, [newQuery])

  // 处理输入变化
  const handleOnChange = (e) => {
    setQuery(e.target.value)
  }
  // 清除按钮
  const clearInput = () => {
    queryRef.current.focus()
    setQuery('')
  }
  return (
    <SearchBoxWrapper>
      <i className="iconfont back" onClick={() => props.back()}>
        &#xe655;
      </i>
      <input
        ref={queryRef}
        className="input"
        placeholder="搜索歌曲 歌手 专辑"
        onChange={(e) => handleOnChange(e)}
        value={query}
      ></input>
      <i
        className="iconfont clear"
        onClick={() => clearInput()}
        style={displayStyle}
      >
        &#xe600;
      </i>
    </SearchBoxWrapper>
  )
}
export default React.memo(SearchBox)
