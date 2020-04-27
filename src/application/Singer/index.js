import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Container,
  ImgWrapper,
  CollectButton,
  SongListWrapper,
  BgLayer,
} from './style'
import Header from '../../baseUI/header'
import { CSSTransition } from 'react-transition-group'
import SongsList from '../SongList'
import Scroll from '../../baseUI/scroll'
import { HEADER_HEIGHT } from '../../api/config'
import { connect } from 'react-redux'
import { getSingerInfo, changeEnterLoading } from './Store/actionCreates'
import Loading from '../../baseUI/loading'
// 导入音乐节点
import MusicNote from '../../baseUI/musicNote'
function Singer(props) {
  const musicRef = useRef()
  const [showStatus, setShowStatus] = useState(true)
  const collectButton = useRef()
  const imageWrapper = useRef()
  const songScrollWrapper = useRef()
  const songScroll = useRef()
  const header = useRef()
  const layer = useRef()
  const initialHeight = useRef()
  const OFFSET = 5
  const {
    artist: artistImmutabla,
    songsOfArtist: songsOfArtistImmutabla,
    loading,
    songsCount,
  } = props
  const { getSingerinfoDispatch } = props
  const artist = artistImmutabla.toJS() || {}
  const songsOfArtist = songsOfArtistImmutabla.toJS() || []
  useEffect(() => {
    let id = props.match.params.id
    getSingerinfoDispatch(id)
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    let h = imageWrapper.current.offsetHeight
    songScrollWrapper.current.style.top = `${h - OFFSET}px`
    initialHeight.current = h
    // 将遮罩层放在下面, 包裹住歌曲列表
    layer.current.style.top = `${h - OFFSET}px`
    songScroll.current.refresh()
    // eslint-disable-next-line
  }, [])
  // 返回上一页
  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false)
  }, [])
  // 滚动事件处理
  const handleScroll = useCallback((pos) => {
    let height = initialHeight.current
    const newY = pos.y
    const imgDOM = imageWrapper.current
    const buttonDOM = collectButton.current
    const headerDOM = header.current
    const layerDOM = layer.current
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT
    // 滑动距离占图片高度的百分比
    const percent = Math.abs(newY / height)
    // 下拉图片放大,按钮跟着偏移
    if (newY > 0) {
      imgDOM.style['transform'] = `scale(${1 + percent})`
      buttonDOM.style['transform'] = `translate3d(0,${newY}px,0)`
      layerDOM.style['transform'] = `translate3d(0,${newY}px,0)`
    } else if (newY >= minScrollY) {
      // 往上滑动,但是没有超过header部分
      layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`
      layerDOM.style.zIndex = 1
      imgDOM.style.zIndex = -1
      imgDOM.style.paddingTop = '75%'
      imgDOM.style.height = 0
      // 收藏按钮逐渐变淡
      buttonDOM.style['transform'] = `translate3d(0,${newY}px,0)`
      buttonDOM.style['opacity'] = `${1 - percent * 2}`
    } else if (newY < minScrollY) {
      // 超出header部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`
      layerDOM.style.zIndex = 1
      headerDOM.style.zIndex = 100
      imgDOM.style.height = `${HEADER_HEIGHT}px`
      imgDOM.style.paddingTop = 0
      imgDOM.style.zIndex = 99
    }
  }, [])
  // 音符掉落动画
  const musicAnimation = (x, y) => {
    musicRef.current.startAnimation({ x, y })
  }
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames={'fly'}
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container>
        {loading ? <Loading></Loading> : null}
        <Header
          handleClick={setShowStatusFalse}
          title={artist.name}
          ref={header}
        ></Header>
        <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
          <div className={'filter'}></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont add">&#xe62d;</i>
          <span>收 藏</span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper} play={songsCount}>
          <Scroll onScroll={handleScroll} ref={songScroll}>
            <SongsList
              songs={songsOfArtist}
              musicAnimation={musicAnimation}
            ></SongsList>
          </Scroll>
        </SongListWrapper>
        <MusicNote ref={musicRef}></MusicNote>
      </Container>
    </CSSTransition>
  )
}
const mapStateToProps = (state) => ({
  artist: state.getIn(['singerInfo', 'artist']),
  songsOfArtist: state.getIn(['singerInfo', 'songsOfArtist']),
  loading: state.getIn(['singerInfo', 'loading']),
  songsCount: state.getIn(['player', 'playList']).size,
})
const mapDispatchToProps = (dispatch) => {
  return {
    getSingerinfoDispatch(id) {
      dispatch(changeEnterLoading(true))
      dispatch(getSingerInfo(id))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer))
