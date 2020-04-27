import styled, { keyframes } from 'styled-components'
import style from '../../../assets/global-style'

const fade = keyframes`
  0%{
    transform:translate3d(0,100%,0);
    opacity:0
  }
  60%{
    transform:translate3d(0,60%,0)
    opacity:0.6;
  }
  100%{
    transform:translate3d(0,0,0)
    opacity:1;
  }
  
`
export const PlayListWrapper = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${style['background-color-shadow']};
  transition: transform 3s;
  &.show {
    transform: translate3d(0, 0, 0);
  }
  .list_wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    opacity: 1;
    border-radius: 10px 10px 0 0;
    background: #fff;
    animation: ${fade} 0.2s linear;
  }
`
export const ScrollWrapper = styled.div`
  height: 400px;
  overflow: hidden;
`
export const ListHeader = styled.div`
  position: relative;
  padding: 20px 30px;
  border-radius: 10px 10px 0 0;
  .title {
    display: flex;
    justify-content: space-between;
    > div {
      flex: 1;
      .text {
        flex: 1;
        font-size: ${style['font-size-m']};
        margin-left: 10px;
      }
      i {
        font-size: ${style['font-size-l']};
        color: ${style['theme-color']};
      }
    }
    .clear {
      /* 扩大可点击区域 */
      ${style.extendClick()}
      color: ${style['theme-color']};
    }
  }
`
export const ListWrapper = styled.div`
  .item {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 30px 0 20px;
    .text {
      font-size: ${style['font-size-m']};
      color: ${style['font-color-desc-v2']};
      flex: 1;
      ${style.noWrap()}
    }
    .like {
      font-size: 14px;
      margin-right: 15px;
      color: ${style['theme-color']};
      ${style.extendClick()}
    }
    .delete {
      font-size: ${style['font-size-m']};
      color: ${style['theme-color']};
    }
    .current {
      flex: 0 0 20px;
      color: ${style['theme-color']};
      font-size: ${style['font-size-s']};
      margin-right: 10px;
      width: 20px;
    }
  }
`
