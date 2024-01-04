import styled from 'styled-components'

export const Item = styled.div`
  height: 100%;
  margin-right: 10px;
  margin-bottom: 20px;
  padding: 6px;
  cursor: pointer;
  background: var(--qf-list-item-bg);
  width: -webkit-fill-available;
  display: flex;
  flex: 1;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--qf-list-item-hover);
    border-color: var(--qf-list-item-hover);
  }
`
