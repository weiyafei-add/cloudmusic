import styled from 'styled-components'
import style from '../../assets/global-style'
export const SongList = styled.div`
  width: 100%;
  border-radius: 10px 10px 0 0;
  ${(props) =>
    props.showBackground
      ? `background:${style['highlight-background-color']}`
      : null};
  z-index: 100;
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
  > div {
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
      > h1 {
        ${style.noWrap()}
      }
      > h1:first-child {
        color: ${style['font-color-desc']};
      }
      > h1:nth-child(2) {
        color: ${style['font-color-desc-v2']};
        font-size: ${style['font-size-ss']};
      }
    }
  }
`
