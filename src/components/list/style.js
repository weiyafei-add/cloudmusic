import styled from 'styled-components'
import style from '../../assets/global-style'
export const ListWrapper = styled.div`
  width: 100%;
  .title {
    font-size: 14px;
    font-weight: 700;
    line-height: 60px;
    padding-left: 10px;
  }
`
export const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`
export const ListItem = styled.div`
  position: relative;
  width: 32%;
  .img_wrap {
    border-radius: 3px;
    overflow: hidden;
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0, 0%, 43%, 0.4), hsla(0, 0%, 100%, 0));
    }
  }
  .play_count {
    font-size: ${style['font-size-s']};
    color: ${style['font-color-light']};
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 2px;
  }
  .desc {
    font-size: ${style['font-size-s']};
    margin-bottom: 5px;
    overflow: hidden;
    padding: 0 2px;
    margin-top: 2px;
    height: 50px;
    line-height: 1.4;
    color: ${style['font-color-desc']};
  }
`
