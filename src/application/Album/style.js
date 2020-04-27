import styled from 'styled-components'
import style from '../../assets/global-style'
export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${style['background-color']};
  z-index: 1000;
  transform-origin: right bottom;
  &.fly-enter,
  &.fly-appear {
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active,
  &.fly-appear-active {
    transition: transform 0.3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform 0.3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`

// 上半部分
export const TopDesc = styled.div`
  width: 100%;
  height: 275px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 18px;
  box-sizing: border-box;
  .desc_wrapper,
  .imgWrapper {
    margin-top: -50px;
  }
  .background {
    z-index: -1;

    width: 100%;
    height: 100%;
    position: absolute;
    background: url(${(props) => props.background}) no-repeat 0 0;
    background-size: 100% 100%;
    filter: blur(20px);
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.2);
    }
  }
  .imgWrapper {
    width: 120px;
    height: 120px;
    background: url(${(props) => props.background}) no-repeat 0 0;
    background-size: 100% 100%;
    box-sizing: border-box;
    border-radius: 3px;
    position: relative;
    .playCount {
      position: absolute;
      top: 3px;
      right: 3px;
      color: ${style['font-color-light']};
      display: flex;
      align-items: center;
      > span {
        font-size: ${style['font-size-s']};
      }
    }
    .decorate {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 20%;
      border-radius: 3px;
      background: linear-gradient(hsla(0, 0%, 43%, 0.4), hsla(0, 0%, 100%, 0));
    }
  }
  .desc_wrapper {
    flex: 1;
    display: flex;
    height: 120px;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px 0;
    box-sizing: border-box;
    margin-left: 10px;
    .title {
      color: ${style['font-color-light']};
      font-size: ${style['font-size-l']};
      font-weight: 700;
      line-height: 1.5rem;
    }
    .creator {
      height: 20px;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
      span {
        margin-left: 5px;
        color: ${style['font-color-desc-v2']};
        font-size: ${style['font-size-m']};
      }
    }
  }
`
// menu部分
export const Menu = styled.div`
  width: 100%;
  display: flex;
  margin-top: -85px;
  margin-bottom: 20px;
  height: 40px;
  justify-content: space-around;
  > div {
    color: ${style['font-color-light']};
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    i {
      font-size: 20px;
    }
    span {
      font-size: ${style['font-size-s']};
    }
  }
`
// 歌曲列表部分
export const SongList = styled.div`
  width: 100%;
  border-radius: 10px 10px 0 0;
  background-color: ${style['highlight-background-color']};
  z-index: 200;
  .first_line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    margin: 0 10px;
    border-bottom: 1px solid ${style['border-color']};
    box-sizing: border-box;
    .playALl {
      display: flex;
      align-items: center;
      line-height: 24px;
      .iconfont {
        font-size: 26px;
        margin-right: 10px;
      }
      .songCount {
        font-size: ${style['font-size-s']};
        color: ${style['font-color-desc-v2']};
        margin-left: 5px;
      }
    }
    .Collect {
      height: 100%;
      background: ${style['theme-color']};
      color: ${style['font-color-light']};
      box-sizing: border-box;
      padding: 0 10px;
      border-radius: 5px;
      margin-right: -10px;
      font-size: ${style['font-size-m']};
      display: flex;
      align-items: center;
      i {
        font-size: 12px;
        margin-right: 5px;
      }
    }
  }
`
export const SongItem = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  .index {
    width: 15%;
    height: 100%;
    background: ${style['highlight-background-color']};
    text-align: center;
    line-height: 60px;
  }
  .songDesc {
    height: 100%;
    width: 85%;
    border-bottom: 1px solid ${style['border-color']};
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 5px 0;
    box-sizing: border-box;
    > h1:first-child {
      color: ${style['font-color-desc']};
    }
    > h1:nth-child(2) {
      color: ${style['font-color-desc-v2']};
      font-size: ${style['font-size-ss']};
    }
  }
`
