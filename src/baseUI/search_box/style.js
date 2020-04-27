import styled from 'styled-components'
import style from '../../assets/global-style'

export const SearchBoxWrapper = styled.div`
  width: 100%;
  height: 40px;
  background: ${style['theme-color']};
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  align-items: center;
  .back {
    color: #fff;
    font-size: 24px;
    margin-right: 10px;
  }
  input {
    flex: 1;
    color: ${style['highlight-background-color']};
    background: ${style['theme-color']};
    width: 100%;
    border: none;
    outline: none;
    height: 20px;
    &::placeholder {
      color: ${style['font-color-light']};
      padding-left: 5px;
    }
    border-bottom: 1px solid ${style['font-color-light']};
  }
  .clear {
    ${style.extendClick()}
    color: ${style['font-color-light']};
  }
`
