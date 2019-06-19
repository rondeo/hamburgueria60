import { css } from 'styled-components';

export default css`
  @keyframes ripple {
    0% {
      width: 0;
      height: 0;
      opacity: 1;
    }
    75% {
      opacity: 1;
    }
    100% {
      padding-top: 150%;
      width: 150%;
      opacity: 0;
    }
  }
  & {
    user-select: none;
    position: relative;
    overflow: hidden;
    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);

    &::before {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      padding-top: 0;
      width: 0;
      border-radius: 100%;
      background-color: rgba(0, 0, 0, 0.05);
      transform: translate(-50%, -50%);
      animation-duration: 0.3s;
      animation-timing-function: ease-out;
      content: '';
    }

    ${props =>
      props.ripple &&
      `& {
      box-shadow: 0 17px 50px 0 rgba(0, 0, 0, 0.19);
      &::before {
        animation-name: ripple;
      }
    }`}
  }
`;
