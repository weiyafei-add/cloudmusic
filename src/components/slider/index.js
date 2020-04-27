import React, { useEffect, useState } from 'react'

// 导入自身样式
import { SliderContainer } from './style'
// 导入swiper组件以及样式
import 'swiper/css/swiper.css'
import Swiper from 'swiper'

function Slider(props) {
  const [sliderSwiper, setSliderSwpier] = useState(null)
  const { bannerList } = props

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      let sliderSwiper = new Swiper('.slider-container', {
        loop: true, //是否循环
        autoplay: {
          //是否自动播放
          delay: 3000, //轮询时长
          disableOnInteraction: false // 触碰后继续轮询
        },
        pagination: { el: '.swiper-pagination' }
      })
      setSliderSwpier(sliderSwiper)
    }
  }, [bannerList.length, sliderSwiper])

  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {bannerList.map(slider => {
            return (
              <div className="swiper-slide" key={slider.imageUrl}>
                <div className="slider-nav">
                  <img
                    src={slider.imageUrl}
                    width="100%"
                    height="100%"
                    alt="推荐"
                  />
                </div>
              </div>
            )
          })}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  )
}

export default React.memo(Slider)
