import styled from 'styled-components'
import style from '../../assets/global-style'
export const Container = styled.div`
  position: fixed;
  top: 94px;
  bottom: 0;
  width: 100%;
  background-color: ${style['background-color']};
  .official,
  .global {
    line-height: 30px;
    margin-left: 5px;
    font-weight: 700;
    font-size: ${style['font-size-m']};
  }
`
export const List = styled.ul`
  width: 100%;
  padding: 0 5px;
  box-sizing: border-box;
  display: ${props => (props.globalRank ? 'flex' : '')};
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`
export const ListItem = styled.li`
  border-bottom: 1px solid ${style['border-color']};
  display: ${props => (props.tracks.length ? 'flex' : '')};
  padding: 3px 0;
  .imgWrap {
    position: relative;
    width: ${props => (props.tracks.length ? '27vw' : '32vw')};
    height: ${props => (props.tracks.length ? '27vw' : '32vw')};
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
    .updateFrequency {
      display: block;
      margin-top: -20%;
      font-size: ${style['font-size-ss']};
      color: #fff;
      margin-left: 5px;
    }
    .decorate {
      width: 100%;
      height: 20px;
      position: absolute;
      bottom: 0;
      background: linear-gradient(
        rgba(255, 255, 255, 0),
        rgba(110, 110, 110, 0.4)
      );
    }
  }
`

export const SongList = styled.div`
  flex: 1;
  margin-left: 10px;
  padding: 5px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  span {
    font-size: ${style['font-size-s']};
    color: grey;
  }
`
