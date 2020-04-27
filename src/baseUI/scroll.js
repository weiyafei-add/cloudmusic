import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  useMemo
} from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import styled from 'styled-components'
import LoadingV2 from '../baseUI/loading-v2/index'
import { debounce } from '../api/utils'
const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
const PullDownLoading = styled.div`
  position: absolute;
  top: 0;
  height: 30px;
  left: 0;
  width: 100%;
`
const Scroll = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState()
  const scrollContainerRef = useRef()
  const { direction, click, refresh, bounceTop, bounceBottom } = props
  const { pullUp, pullDown, onScroll, pullUpLoading, pullDownLoading } = props

  let pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 300)
  }, [pullUp])
  let pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 300)
  }, [pullDown])
  // 进入页面会创建BScroll实例a
  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      // 当前动画的滑动方向
      scrollX: direction === 'horizental',
      scrollY: direction === 'vertical',
      //再滑动的时候 实时派发scroll事件
      probeType: 3,
      click: click, //点击事件
      bounce: {
        top: bounceTop, //是否向上吸顶
        bottom: bounceBottom //是否向下吸顶
      }
    })
    setBScroll(scroll)
    return () => {
      console.log('清楚副作用咯')
      setBScroll(null)
    }
    //eslint-disable-next-line
  }, [])
  // 给实例绑定scroll事件
  useEffect(() => {
    // 如果实例创建失败,或者没有传入onScroll
    if (!bScroll || !onScroll) return
    // 监听scroll函数
    bScroll.on('scroll', scroll => {
      onScroll(scroll)
    })
    // 清除effect
    return () => {
      bScroll.off('scroll')
    }
  }, [onScroll, bScroll])
  // 进行上拉到底的判断,调用上拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullUp) return
    const handlePullUp = () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce()
      }
    }
    bScroll.on('scrollEnd', handlePullUp)
    // 清除effect
    return () => {
      bScroll.off('scrollEnd', handlePullUp)
    }
  }, [pullUp, bScroll, pullUpDebounce])
  // 进行下拉的判断, 调用下拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullDown) return

    const handlePullDown = pos => {
      if (pos.y > 50) {
        pullDownDebounce()
      }
    }
    bScroll.on('touchEnd', handlePullDown)

    return () => {
      bScroll.off('touchEnd', handlePullDown)
    }
  }, [pullDown, bScroll, pullDownDebounce])
  // 每次渲染都要刷新实例,防止无法滚动
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })
  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
    },
    // 给外界暴露getBScroll方法, 提供bs实例
    getBScroll() {
      if (bScroll) {
        return bScroll
      }
    }
  }))
  // const PullUpdisplayStyle = pullUpLoading
  //   ? { display: '' }
  //   : { display: 'none' }
  const PullDowndisplayStyle = pullDownLoading
    ? { display: '' }
    : { display: 'none' }
  // UI
  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
      <PullDownLoading style={PullDowndisplayStyle}>
        <LoadingV2></LoadingV2>
      </PullDownLoading>
    </ScrollContainer>
  )
})
Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullUp: null,
  pullDown: null,
  pullUpLoading: false,
  pullDownLoading: false,
  bounceTop: true,
  bounceBottom: true
}
Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']), // 滚动的方向
  refresh: PropTypes.bool, //是否刷新
  onScroll: PropTypes.func, //滑动触发的回调函数
  pullUp: PropTypes.func, //上拉加载逻辑
  pullDown: PropTypes.func, //下拉加载逻辑
  pullUpLoading: PropTypes.bool, //是否显示上拉加载动画
  pullDownLoading: PropTypes.bool, //是否显示下拉加载动画
  bounceTop: PropTypes.bool, //是否支持向上吸顶
  bounceBottom: PropTypes.bool //是否支持向下吸顶
}

export default Scroll
