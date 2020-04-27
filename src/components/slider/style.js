import styled from 'styled-components'
import style from '../../assets/global-style'
export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
  margin: auto;
  .before {
    position: absolute;
    top: -300px;
    width: 100%;
    height: 400px;
    background: ${style['theme-color']};
  }
  .slider-container {
    position: relative;
    width: 98%;
    height: 160px;
    margin: auto;
    overflow: hidden;
    border-radius: 6px;

    .slider-nav {
      position: absolute;
      height: 100%;
      width: 100%;
      display: block;
    }
    .swiper-pagination-bullet-active {
      background: ${style['theme-color']};
    }
  }
`
