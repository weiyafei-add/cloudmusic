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
export const NomalPlayerContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  z-index: 200;
  background: ${style['background-color']};
  &.nomal-enter,
  &.nomal-exit-done {
    .top {
      transform: translate3d(0, -100px, 0);
    }
    .bottom {
      transform: translate3d(0, 100px, 0);
    }
  }
  &.normal-enter-active,
  &.normal-exit-active {
    .top,
    .bottom {
      transform: translate3d(0, 0, 0);
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }
    opacity: 1;
    transition: all 0.4s;
  }
  &.normal-exit-active {
    opacity: 0;
  }
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    filter: blur(20px);
    opacity: 0.6;
    &.layer {
      background: ${style['font-color-desc']};
      opacity: 0.3;
      filter: none;
    }
  }
`
export const TopWrapper = styled.div`
  position: relative;
  top: 0;
  height: 8%;
  left: 0;
  border-bottom: 1px solid rgba(228, 228, 228, 0.1);
  display: flex;
  align-items: center;
  padding-left: 10px;
  .back {
    flex: 0, 0, 30px;
    transform: rotate(90deg);
    .iconfont {
      font-size: 24px;
      font-weight: 700;
      color: ${style['font-color-desc']};
    }
  }
  .title {
    flex: 1;
    margin-left: 10px;
    color: ${style['font-color-desc']};
    font-size: ${style['font-size-l']};
    box-sizing: border-box;
    line-height: 2em;
    > p:nth-child(2) {
      line-height: 1em;
      color: ${style['font-color-desc-v2']};
      font-size: ${style['font-size-m']};
    }
  }
`
export const Middle = styled.div`
  width: 100%;
  height: 60%;
  position: relative;
  overflow: hidden;
  .cd {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    overflow: hidden;
    border: 8px solid ${style['background-color-shadow']};
    box-sizing: border-box;
    margin: 0 auto;
    margin-top: 60px;
    .play {
      animation: ${rotate} 20s infinite linear;
      &.pause {
        animation-play-state: paused;
      }
    }
  }
`
export const Bottom = styled.div`
  width: 100%;
  position: absolute;
  bottom: 50px;
  left: 0;
  padding: 0 30px;
  box-sizing: border-box;

  .control {
    margin-top: 10px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 160px;
    > div {
      i {
        font-size: 30px;
        color: ${style['font-color-desc']};
      }
    }
    .center {
      i {
        font-size: 40px;
      }
    }
  }
`
export const ProgressBarWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  .progress-bar-wrapper {
    flex: 1;
  }
  .time {
    flex: 0 0 30px;
    width: 30px;
    color: ${style['font-color-desc']};
    font-size: ${style['font-size-s']};
    line-height: 30px;
    &.time-1 {
      text-align: left;
      margin-right: 8px;
    }
    &.time-2 {
      text-align: right;
      margin-left: 1px;
    }
  }
`
export const LyricContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`
export const LyricWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  p {
    line-height: 32px;
    color: rgba(255, 255, 255, 0.5);
    white-space: normal;
    font-size: ${style['font-size-l']};
    &.current {
      color: #fff;
    }
    &.pure {
      position: relative;
      top: 30vh;
    }
  }
`
