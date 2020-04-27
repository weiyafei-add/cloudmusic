import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Container, TopDesc, Menu } from './style'
import { CSSTransition } from 'react-transition-group'
import Header from '../../baseUI/header/index'
import Scroll from '../../baseUI/scroll'
import { getName } from '../../api/utils'
import style from '../../assets/global-style'
import { HEADER_HEIGHT } from '../../api/config'
import { connect, useSelector, useDispatch } from 'react-redux'
import { getAlbumList, changeEnterLoading } from './store/actionCreators'
import { isEmptyObject } from '../../api/utils'
import Loading from '../../baseUI/loading'
import SongList from '../SongList'
import MusicNote from '../../baseUI/musicNote'
function Album(props) {
  const [showStatus, setShowStatus] = useState(true)
  // 是否跑马灯
  const [isMarquee, setIsMarquee] = useState(false)
  const [title, setTitle] = useState('歌单')
  const musicRef = useRef()
  const albumSongs = useSelector((state) =>
    state.getIn(['album', 'currentAlbum']).toJS()
  )
  console.log(albumSongs)
  const {
    currentAlbum: currentAlbumImmutable,
    enterLoading,
    getCurrentAlbumDispatch,
  } = props

  const id = props.match.params.id

  const headerEl = useRef()
  const handleBackClick = useCallback(() => {
    setShowStatus(false)
  }, [])
  // 进入页面发送请求
  useEffect(() => {
    getCurrentAlbumDispatch(id)
    //eslint-disable-next-line
  }, [getCurrentAlbumDispatch, id])
  let currentAlbum = currentAlbumImmutable.toJS()

  const renderTopDesc = () => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="imgWrapper">
          <div className="decorate"></div>
          <div className="playCount">
            <i className="iconfont play">&#xe885;</i>
            <span>
              {Math.floor(currentAlbum.subscribedCount / 1000) / 10}万
            </span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="creator">
            <img src={currentAlbum.creator.avatarUrl} alt="作者"></img>
            <span>{currentAlbum.creator.nickname}</span>
          </div>
        </div>
      </TopDesc>
    )
  }
  const renderMenu = () => {
    return (
      <Menu>
        <div>
          <i className="iconfont ">&#xe6ad;</i>
          <span>评论</span>
        </div>
        <div>
          <i className="iconfont ">&#xe86f;</i>
          <span>点赞</span>
        </div>
        <div>
          <i className="iconfont ">&#xe62d;</i>
          <span>收藏</span>
        </div>
        <div>
          <i className="iconfont ">&#xe606;</i>
          <span>更多</span>
        </div>
      </Menu>
    )
  }
  // const renderSong = () => {
  //   return (
  //     <SongList>
  //       <div className="first_line">
  //         <div className="playALl">
  //           <i className="iconfont">&#xe6e3;</i>
  //           <span>播放全部</span>
  //           <span className="songCount">{`(共${currentAlbum.tracks.length}首)`}</span>
  //         </div>
  //         <div className="Collect">
  //           <i className="iconfont add">&#xe62d;</i>
  //           <span>{`收藏(22.7万)`}</span>
  //         </div>
  //       </div>
  //       {currentAlbum.tracks.map((item, index) => {
  //         return (
  //           <SongItem key={item.name + index}>
  //             <div className="index">{index + 1}</div>
  //             <div className="songDesc">
  //               <h1>{item.name}</h1>
  //               <h1>{getName(item.ar, item.al)}</h1>
  //             </div>
  //           </SongItem>
  //         )
  //       })}
  //     </SongList>
  //   )
  // }
  // 头部区域变色以及跑马灯
  const handleOnScroll = useCallback(
    (pos) => {
      let minScrollY = -HEADER_HEIGHT
      let percent = Math.abs(pos.y / minScrollY)
      let headerDom = headerEl.current
      if (pos.y < minScrollY) {
        headerDom.style.backgroundColor = style['theme-color']
        headerDom.style.opacity = Math.min(1, (percent - 1) / 2)
        setTitle(currentAlbum.name)
        setIsMarquee(true)
      } else {
        headerDom.style.backgroundColor = ''
        headerDom.style.opacity = 1
        setTitle('歌单')
        setIsMarquee(false)
      }
    },
    [currentAlbum]
  )
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
      onExited={props.history.goBack}
    >
      <Container>
        <MusicNote ref={musicRef}></MusicNote>
        {enterLoading ? <Loading></Loading> : ''}
        <Header
          ref={headerEl}
          title={title}
          handleClick={handleBackClick}
          isMarquee={isMarquee}
        ></Header>
        {/* 上半部分 */}
        {!isEmptyObject(currentAlbum) ? (
          <Scroll bounceTop={false} onScroll={handleOnScroll}>
            <div>
              {renderTopDesc()}
              {renderMenu()}
              {
                <SongList
                  songs={albumSongs.tracks}
                  musicAnimation={musicAnimation}
                  showBackground
                ></SongList>
              }
            </div>
          </Scroll>
        ) : null}
      </Container>
    </CSSTransition>
  )
}
// 将state映射到props
const mapStateToProps = (state) => ({
  currentAlbum: state.getIn(['album', 'currentAlbum']),
  enterLoading: state.getIn(['album', 'enterLoading']),
})
// 将dispatch映射到props
const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentAlbumDispatch(id) {
      dispatch(getAlbumList(id))
      dispatch(changeEnterLoading(true))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album))
