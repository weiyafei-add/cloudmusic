import React from 'react'
import styled from 'styled-components'
import style from '../../assets/global-style'
import PropTypes from 'prop-types'

const HeaderContainer = styled.div`
  height: 40px;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0);
  color: ${style['font-color-light']};
  line-height: 40px;
  padding: 0 0 0 8px;
  z-index: 100;
  display: flex;
  .back {
    font-size: ${style['font-size-ll']};
  }
  h1 {
    display: inline-block;
    margin-left: 8px;
    font-weight: 700;
  }
`
// 函数组件拿不到ref 就需要用forwardRef来转发ref
const Header = React.forwardRef((props, ref) => {
  const { title, handleClick, isMarquee } = props
  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={handleClick}>
        &#xe655;
      </i>
      {isMarquee ? (
        <marquee>
          <span>{title}</span>
        </marquee>
      ) : (
        <h1>{title}</h1>
      )}
    </HeaderContainer>
  )
})
Header.defaultProps = {
  handleClick: () => {},
  title: '',
}
Header.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  isMarquee: PropTypes.bool,
}
export default React.memo(Header)
