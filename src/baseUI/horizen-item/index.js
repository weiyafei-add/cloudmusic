import React, { memo } from 'react'
import styled from 'styled-components'
import Scroll from '../../baseUI/scroll'
import { PropTypes } from 'prop-types'
import style from '../../assets/global-style'

function Horizen(props) {
  // const Category = useRef(null)

  // useEffect(() => {
  //   let categoryDom = Category.current
  //   categoryDom.style.width = 'max-content'
  //   // let tagElems = categoryDom.querySelectorAll('span')
  //   // let totalWidth = 0
  //   // Array.from(tagElems).forEach(ele => {
  //   //   totalWidth += ele.offsetWidth
  //   // })
  //   // categoryDom.style.width = `${totalWidth}px`
  // }, [])

  const { list, oldVal, title, handleClick } = props
  return (
    <Scroll direction={'horizental'}>
      <div style={{ width: 'max-content' }}>
        <List>
          <span>{title}</span>
          {list.map(item => {
            return (
              <ListItem
                className={`${oldVal === item.key ? 'selected' : ''}`}
                key={item.key}
                onClick={() => handleClick(item.key)}
              >
                {item.name}
              </ListItem>
            )
          })}
        </List>
      </div>
    </Scroll>
  )
}
const List = styled.div`
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  font-size: ${style['font-size-m']};
  > span:first-of-type {
    display: block;
    flex: none;
    color: gray;
    padding-left: 8px;
    margin-right: 5px;
  }
`
const ListItem = styled.span`
  flex: none;
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    border: 1px solid ${style['theme-color']};
    color: ${style['theme-color']};
    opacity: 0.8;
  }
`
Horizen.defaultProps = {
  list: [], //接受的列表数据
  oldVal: '', //当前的item值
  title: '', // 列表左边的标题
  handleClick: null //点击不同的item执行方法
}
Horizen.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
}
export default memo(Horizen)
