import style from '../../assets/global-style'
import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: ${(props) => (props.play > 0 ? '60px' : 0)};
  right: 0;
  width: 100%;
  z-index: 100;
  background: #f2f3f4;
  padding-top: 40px;
  &.fly-enter,
  &.fly-appear {
    transform: translate3d(100%, 0, 0);
  }
  &.fly-enter-active,
  &.fly-appear-active {
    transform: translate3d(0, 0, 0);
    transition: transform 0.3s;
  }
  &.fly-exit {
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transform: translate3d(100%, 0, 0);
    transition: transform 0.3s;
  }
`
export const ShortcutWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 40px;
  bottom: 0;
  display: ${(props) => (props.show ? '' : 'none')};
`
export const HotKey = styled.div`
  margin: 0 20px 20px 20px;
  h1 {
    margin: 30px 0 20px 0;
    color: ${style['font-color-desc-v2']};
    font-size: ${style['font-size-m']};
  }
  .item {
    background: ${style['highlight-background-color']};
    margin-right: 20px;
    margin-bottom: 10px;
    padding: 5px 10px;
    border-radius: 8px;
    font-size: ${style['font-size-m']};
  }
`
export const List = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0 10px;
  box-sizing: border-box;
  color: #2e3030;
  h1 {
    font-size: ${style['font-size-s']};
    line-height: 30px;
  }
`
export const ListItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .imgBox {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    overflow: hidden;
    margin: 5px 0px;
  }
  .albumName {
    margin-left: 10px;
    font-size: ${style['font-size-m']};
  }
`
export const SongItem = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 5px;
  margin:0px 10px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .songName {
    ${style.noWrap()}
  }
  .name {
    ${style.noWrap()}
    color: ${style['font-color-desc-v2']};
    font-size: ${style['font-size-s']};
  }
`
