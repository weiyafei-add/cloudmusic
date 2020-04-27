import styled, { keyframes } from 'styled-components'
import style from '../../../assets/global-style'

const rotate = keyframes`
  0%{
    transform:rotate(0)
  }
  100%{
    transform:rotate(360deg)
  }
`
export const MiniPlayerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 60px;
  background: ${style['highlight-background-color']};
  width: 100%;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  box-sizing: border-box;
  .imgWrapper {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    img {
      border-radius: 50%;
      &.cdImg {
        animation: ${rotate} 10s infinite linear;
        &.cdImg.pause {
          animation-play-state: paused;
        }
      }
    }
  }

  .songInfo {
    flex: 1;
    font-size: ${style['font-size-m']};
    color: ${style['font-color-desc-v2']};
    line-height: 1.6em;
    margin-left: 10px;
    > p {
      ${style.noWrap()}
    }
    > p:first-child {
      color: ${style['font-color-desc']};
    }
  }
  .control {
    flex: 0, 0, 30px;
    padding: 0 10px;
    &.control:first-child {
      margin-right: 20px;
    }
    .icon_mini {
      display: block;
      font-size: 16px;
      position: absolute;
      left: 8px;
      top: 8px;
    }
    i {
      color: ${style['theme-color']};
      font-size: 30px;
    }
  }
  &.mini-enter {
    transform: translateY(100%);
  }
  &.mini-enter-active {
    transform: translateY(0);
    transition: transform 0.4s;
  }
  &.mini-exit-active {
    transform: translateY(100%);
    transition: transform 0.4s;
  }
`
