import React from 'react'
import styled, { keyframes } from 'styled-components'
import style from '../../assets/global-style'

// 创建关键帧
const dance = keyframes`
  0%,40%,100%{
    transform:scaleY(0.4);
    transform-origin:center 100%
  }
  20%{
    transform:scaleY(1)
  }
`
const Loading = styled.div`
  width: 100%;
  height: 15px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 12px;
  > div {
    width: 1px;
    height: 100%;
    background: ${style['theme-color']};
    margin-right: 2px;
    animation: ${dance} 1s ease infinite;
    animation-play-state: running;
  }
  > div:nth-child(2) {
    animation-delay: -0.1s;
  }
  > div:nth-child(3) {
    animation-delay: -0.2s;
  }
  > div:nth-child(4) {
    animation-delay: -0.5s;
  }
  > div:nth-child(5) {
    animation-delay: -0.6s;
  }
  > div:nth-child(6) {
    animation-delay: -0.1s;
  }
`

function LoadingV2() {
  return (
    <Loading>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      正在努力加载
    </Loading>
  )
}
export default React.memo(LoadingV2)
