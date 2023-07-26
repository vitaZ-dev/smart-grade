import styled from '@emotion/styled';

const CustomInput = styled.input`
  border: 1px solid var(--primary-border-color);
  width: ${({ length }) =>
    length === 'long'
      ? '180px'
      : length === 'middle'
      ? '140px'
      : length === 'short'
      ? '100px'
      : 'auto'};
  height: 35px;
  padding: 10px;
  font-size: 14px;
  background: var(--white);
  ::placeholder {
    color: var(--search-ph-color);
  }
`;

const CustomDropdown = styled.div`
  position: relative;
  cursor: pointer;
  border: 1px solid var(--primary-border-color);
  width: ${({ length }) =>
    length === 'long'
      ? '180px'
      : length === 'middle'
      ? '140px'
      : length === 'short'
      ? '100px'
      : 'auto'};
  height: 35px;
  font-size: 14px;
  background: var(--white);
  display: flex;
  align-items: center;
  > div {
    width: 100%;
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    > span {
      &.placeholder {
        color: var(--search-ph-color);
      }
    }
    &:hover {
      svg.reset {
        visibility: ${props => (props.value ? 'visible' : 'hidden')};
        opacity: ${props => (props.value ? 1 : 0)};
      }
    }
    > svg {
      font-size: 12px;
      color: var(--search-ph-color);
      transition: 0.2s all ease-in-out;
      &.reset {
        font-size: 16px;
        background: var(--white);
        position: absolute;
        right: 8px;
        visibility: hidden;
        opacity: 0;
      }
    }
  }
  > ul {
    position: absolute;
    max-height: ${props => (props.open ? '330px' : 0)};
    top: 34px;
    left: -1px;
    transition: 0.2s all ease-in-out;
    overflow: auto;
    border-bottom: ${props => (props.open ? '1px solid var(--primary-border-color)' : null)};
    > li {
      background: var(--white);
      width: ${({ length }) =>
        length === 'long'
          ? '180px'
          : length === 'middle'
          ? '140px'
          : length === 'short'
          ? '100px'
          : 'auto'};
      height: 35px;
      border: 1px solid var(--primary-border-color);
      border-top: none;
      padding: 10px;
      font-size: 14px;
      display: flex;
      align-items: center;
      &.active {
        background: var(--main-bg-color);
      }
      &:last-of-type {
        border-bottom: ${props => (props.open ? 'none' : null)};
      }
    }
  }
`;

export { CustomInput, CustomDropdown };
