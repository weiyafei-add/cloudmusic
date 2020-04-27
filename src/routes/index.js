import React, { lazy, Suspense } from 'react'
import { Redirect } from 'react-router-dom'
import Home from '../application/Home'
// import Recommend from '../application/Recommend'
// import Singers from '../application/Singers'
// import Rank from '../application/Rank'
// import Album from '../application/Album/index'
// import Singer from '../application/Singer/index'
// import Search from '../application/Search'
const RecommendComponent = lazy(() => import('../application/Recommend'))
const SingersComponent = lazy(() => import('../application/Singers'))
const RankComponent = lazy(() => import('../application/Rank'))
const AlbumComponent = lazy(() => import('../application/Album'))
const SingerComponent = lazy(() => import('../application/Singer'))
const SearchComponent = lazy(() => import('../application/Search'))

const SuspenseComponent = (Component) => (props) => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}
export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => <Redirect to={'/recommend'} />,
      },
      {
        path: '/recommend',
        component: SuspenseComponent(RecommendComponent),
        routes: [
          {
            path: '/recommend/:id',
            component: SuspenseComponent(AlbumComponent),
          },
        ],
      },
      {
        path: '/singers',
        component: SuspenseComponent(SingersComponent),
        key: 'singers',
        routes: [
          {
            path: '/singers/:id',
            component: SuspenseComponent(SingerComponent),
          },
        ],
      },
      {
        path: '/rank',
        component: SuspenseComponent(RankComponent),
        routes: [
          {
            path: '/rank/:id',
            component: SuspenseComponent(AlbumComponent),
          },
        ],
      },
      {
        path: '/search',
        component: SuspenseComponent(SearchComponent),
        exact: true,
        key: 'search',
      },
      {
        path: '/album/:id',
        exact: true,
        key: 'album',
        component: SuspenseComponent(AlbumComponent),
      },
    ],
  },
]
