import { combineReducers } from 'redux-immutable'
import { reducer as recommendReducer } from '../application/Recommend/store/index'
import { reducer as singerReducer } from '../application/Singers/store/index'
import { reducer as rankReducer } from '../application/Rank/store/index'
import { reducer as albumReducer } from '../application/Album/store/index'
import { reducer as singerInfoReducer } from '../application/Singer/Store/index'
import { reducer as playReducer } from '../application/Player/Store/index'
import { reducer as searchReducer } from '../application/Search/store/index'
// 合并反应器
export default combineReducers({
  recommend: recommendReducer,
  singer: singerReducer,
  rank: rankReducer,
  album: albumReducer,
  singerInfo: singerInfoReducer,
  player: playReducer,
  search: searchReducer,
})
