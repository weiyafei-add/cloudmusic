import React, { forwardRef, useImperativeHandle, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import style from '../../assets/global-style'
import { CSSTransition } from 'react-transition-group'

const confirmFadeIn = keyframes`
  0%{
    opacity:0
  }
  100%{
    opacity:1
  }
`
const confirmZoom = keyframes`
  0%{
    transform:scale(0)
  }
  50%{
    transform:scale(1.1)
  }
  100%{
    transform:scale(1)
  }
`

const ConfirmContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${style['background-color-shadow']};
  z-index: 1000;
  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    .confirm_content {
      background: #fff;
      width: 270px;
      border-radius: 10px;
    }
    .text {
      line-height: 60px;
      color: ${style['font-color-desc-v2']};
      text-align: center;
    }
    .operator {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .operator_btn {
        flex: 1;
        text-align: center;
        line-height: 40px;
        border-top: 1px solid ${style['border-color']};
      }
      .operator_btn.left {
        border-right: 1px solid ${style['border-color']};
      }
    }
  }
  &.confirm-fade-enter-active {
    animation: ${confirmFadeIn} 0.3s;
    .confirm_content {
      animation: ${confirmZoom} 0.3s;
    }
  }
`
const Confirm = forwardRef((props, ref) => {
  const [isShow, setIsShow] = useState(false)
  const { text, cancelBtnText, confirmBtnText } = props
  const { handleConfirm } = props
  useImperativeHandle(ref, () => ({
    show() {
      setIsShow(true)
    },
  }))
  return (
    <CSSTransition
      in={isShow}
      timeout={300}
      classNames="confirm-fade"
      appear={true}
    >
      <ConfirmContainer
        onClick={(e) => e.stopPropagation()}
        style={isShow ? { display: 'block' } : { display: 'none' }}
      >
        <div>
          <div className="confirm_content">
            <p className="text">{text}</p>
            <div className="operator">
              <div
                className="operator_btn left"
                onClick={() => setIsShow(false)}
              >
                {cancelBtnText}
              </div>
              <div className="operator_btn" onClick={() => handleConfirm()}>
                {confirmBtnText}
              </div>
            </div>
          </div>
        </div>
      </ConfirmContainer>
    </CSSTransition>
  )
})

export default React.memo(Confirm)
