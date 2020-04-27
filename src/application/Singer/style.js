import styled from 'styled-components'
import style from '../../assets/global-style'
export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #f2f3f4;
  transform-origin: right bottom;
  overflow: hidden;
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
export const ImgWrapper = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  padding-top: 75%;
  background: url(${(props) => props.bgUrl});
  background-size: cover;
  transform-origin: top;
  z-index: 50;
  .filter {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(7, 17, 27, 0.3);
  }
`
export const CollectButton = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  background: ${style['theme-color']};
  width: 120px;
  height: 40px;
  margin-top: -55px;
  z-index: 50;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  color: ${style['font-color-light']};
  font-size: ${style['font-size-m']};
  box-sizing: border-box;
  .add {
    font-size: ${style['font-size-s']};
    margin-right: 10px;
  }
`
export const BgLayer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  border-radius: 10px;
  background: white;
  z-index: 50;
`
export const SongListWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: ${(props) => (props.play > 0 ? '60px' : 0)};
  left: 0;
  right: 0;
  width: 100%;
  z-index: 50;
  > div {
    position: absolute;
    left: 0;
    width: 100%;
    overflow: visible;
  }
`
