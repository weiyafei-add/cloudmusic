import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import style from '../assets/global-style'
import { prefixStyle } from '../api/utils'

const ProgressWrapper = styled.div`
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background-color: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: ${style['theme-color']};
    }
    .progress-btn-wrapper {
      position: absolute;
      top: -13px;
      left: -15px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 3px solid ${style['border-color']};
        background: ${style['theme-color']};
      }
    }
  }
`

function ProgressBar(props) {
  const progressBar = useRef()
  const progress = useRef()
  const progressBtn = useRef()
  const [touch, setTouch] = useState({})
  // const progressBtnWidth = 16
  const { percentChanges, percent } = props
  const _changePercent = () => {
    const barWidth = progressBar.current.clientWidth
    // 新的计算进度
    const curPercnet = progress.current.clientWidth / barWidth
    // 把新的进度传给回调函数并执行
    percentChanges(curPercnet)
  }
  // 监听percent
  useEffect(() => {
    if (percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = progressBar.current.clientWidth
      const offsetWidth = percent * barWidth
      progress.current.style.width = `${offsetWidth}px`
      progressBtn.current.style.transform = `translate3d(${offsetWidth}px,0,0)`
    }
  }, [percent])
  // 处理进度条的偏移
  const _offset = (offsetWidth) => {
    progress.current.style.width = `${offsetWidth}px`
    progressBtn.current.style.transform = `translate3d(${offsetWidth}px,0,0)`
  }

  const progressTouchStart = (e) => {
    const startTouch = {}
    startTouch.initiated = true // 为true表示滑动开始
    startTouch.startX = e.touches[0].pageX // 滑动开始横向坐标
    startTouch.left = progress.current.clientWidth // 当前progress长度
    setTouch(startTouch)
  }
  const progressTouchMove = (e) => {
    if (!touch.initiated) return
    // 滑动距离
    const deltaX = e.touches[0].pageX - touch.startX
    const barWidth = progressBar.current.clientWidth
    // 边界处理
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth)
    _offset(offsetWidth)
  }
  const progressTouchEnd = (e) => {
    const endTouch = JSON.parse(JSON.stringify(touch))
    endTouch.initiated = false
    setTouch(endTouch)
    _changePercent()
  }
  const progressClick = (e) => {
    const rect = progressBar.current.getBoundingClientRect()
    const barWidth = progressBar.current.clientWidth
    const offsetWidth = Math.min(Math.max(0, e.pageX - rect.left), barWidth)

    _offset(offsetWidth)
    _changePercent()
  }
  return (
    <ProgressWrapper>
      <div className="bar-inner" ref={progressBar} onClick={progressClick}>
        <div className="progress" ref={progress}></div>
        <div
          className="progress-btn-wrapper"
          ref={progressBtn}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </ProgressWrapper>
  )
}

export default React.memo(ProgressBar)
