import styled from "@vue-styled-components/core";

export const loginDiv = styled.div`
  width: 100%;
  height: 42px;
  margin-top: 20px;

  border-radius: 0px;
  position: relative;
`;

export const loginInput = styled.input`
  /* input */
  box-sizing: border-box;

  width: 100%;
  height: 42px;
  left: 0px;
  top: 0px;

  padding-left: 10px;

  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;

  &::placeholder {
    /* Label */
    width: 272px;
    height: 42px;
    left: 16px;
    top: 0px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    /* or 143% */
    display: flex;
    align-items: center;

    color: #adaebc;
  }
`;
