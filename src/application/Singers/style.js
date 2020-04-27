import styled from 'styled-components'
import style from '../../assets/global-style'
export const Content = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`
// 歌手列表
export const SingerListContainer = styled.div`
  position: fixed;
  top: 160px;
  bottom: ${(props) => (props.play > 0 ? '60px' : 0)};
  overflow: hidden;
  width: 100%;
`
export const List = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 5px;
`
export const ListItem = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${style['border-color']};
  display: flex;
  align-items: center;
  padding: 2px 0;
  .singerImg {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    img {
      border-radius: 5px;
    }
  }
  > span {
    line-height: 60px;
    font-size: ${style['font-size-m']};
    color: ${style['font-color-desc']};
    margin-left: 20px;
    font-weight: 500;
  }
`
