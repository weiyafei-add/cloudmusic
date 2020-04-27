import React, { useState, useEffect, useRef, useCallback } from 'react'
import { CSSTransition } from 'react-transition-group'
import {
  Container,
  ShortcutWrapper,
  HotKey,
  List,
  ListItem,
  SongItem,
} from './style'
import SearchBox from '../../baseUI/search_box'
import { useDispatch, useSelector } from 'react-redux'
import {
  getHotKeyWords,
  getSuggeetList,
  changeEnterLoading,
} from './store/actionCreators'
import Scroll from '../../baseUI/scroll'
import Loading from '../../baseUI/loading'
import { getSongDetail } from '../Player/Store/actionCreators'
import MusicNote from '../../baseUI/musicNote'
function Search(props) {
  const [show, setShow] = useState(false)
  const queryRef = useRef()
  const musicNoteRef = useRef()
  const [query, setQuery] = useState('')
  /**
   *  仓库获取数据
   */
  const dispatch = useDispatch()
  const hotListImmutable = useSelector((state) =>
    state.getIn(['search', 'hotList'])
  )
  const suggestList = useSelector((state) =>
    state.getIn(['search', 'suggestList'])
  ).toJS()
  const enterLoading = useSelector((state) =>
    state.getIn(['search', 'enterLoading'])
  )
  const songList = useSelector((state) =>
    state.getIn(['search', 'songsList'])
  ).toJS()

  const hotList = hotListImmutable.toJS()
  const songsCount = useSelector((state) =>
    state.getIn(['player', 'playList']).toJS()
  )
  /**
   *
   *
   */
  useEffect(() => {
    setShow(true)
    // 利用redux缓存, 避免每次进入都发送请求
    if (!hotListImmutable.size) dispatch(getHotKeyWords())
  }, [])
  // ///////////////////////
  const renderHotKey = () => {
    return (
      <ul>
        {hotList.map((item) => (
          <li
            onClick={() => setQuery(item.first)}
            className="item"
            key={item.first}
          >
            <span className="item_name">{item.first}</span>
          </li>
        ))}
      </ul>
    )
  }
  const back = useCallback(() => {
    setShow(false)
  }, [])
  const handleQuery = (q) => {
    setQuery(q)
    if (!q) return
    dispatch(changeEnterLoading(true))
    dispatch(getSuggeetList(q))
  }
  const renderSingers = () => {
    let artists = suggestList.artists
    if (!artists || !artists.length) return
    return (
      <List>
        <h1 className="title">相关歌手</h1>

        {artists.map((item) => {
          return (
            <ListItem
              key={item.id}
              onClick={() => props.history.push(`/singers/${item.id}`)}
            >
              <div className="imgBox">
                <img
                  src={item.picUrl + '?params=300x300'}
                  width={'100%'}
                  height={'100%'}
                  alt="头像"
                ></img>
              </div>
              <span className="albumName">歌手: {item.name}</span>
            </ListItem>
          )
        })}
      </List>
    )
  }
  const renderAlbum = () => {
    let albums = suggestList.playlists
    if (!albums || !albums.length) return
    return (
      <List>
        <h1 className="title">相关歌单</h1>
        {albums.map((item, index) => {
          return (
            <ListItem
              key={item.id}
              onClick={() => props.history.push(`/album/${item.id}`)}
            >
              <div className="imgBox">
                <img
                  src={item.coverImgUrl + '?params=300x300'}
                  width={'100%'}
                  height={'100%'}
                  alt="头像"
                ></img>
              </div>
              <span className="albumName">歌单: {item.name}</span>
            </ListItem>
          )
        })}
      </List>
    )
  }
  const renderSongs = () => {
    console.log(songList)
    if (!songList || !songList.length) return
    return songList.map((item) => {
      return (
        <SongItem key={item.id} onClick={(e) => selectItem(e, item.id)}>
          <span className="songName">{item.name}</span>
          <span className="name">
            {item.artists[0].name} - {item.album.name}
          </span>
        </SongItem>
      )
    })
  }
  const selectItem = (e, id) => {
    dispatch(getSongDetail(id))
    musicNoteRef.current.startAnimation({
      x: e.nativeEvent.clientX,
      y: e.nativeEvent.clientY,
    })
  }
  // /////////////////////////////
  return (
    <CSSTransition
      in={show}
      timeout={400}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container play={songsCount.length}>
        <MusicNote ref={musicNoteRef}></MusicNote>
        <SearchBox
          newQuery={query}
          back={back}
          handleQuery={handleQuery}
        ></SearchBox>
        <ShortcutWrapper show={!query}>
          <Scroll>
            <div>
              <HotKey>
                <h1 className="title">热门搜索</h1>
                {renderHotKey()}
              </HotKey>
            </div>
          </Scroll>
        </ShortcutWrapper>
        {/* 搜索结果 */}
        <ShortcutWrapper show={query}>
          <Scroll>
            <div>
              {renderSingers()}
              {renderAlbum()}
              {renderSongs()}
            </div>
          </Scroll>
        </ShortcutWrapper>
        {enterLoading ? <Loading></Loading> : ''}
      </Container>
    </CSSTransition>
  )
}

export default Search
