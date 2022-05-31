import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { boxShadow, CardGradient } from './styleElements';

export const Header = styled.header`
  height: 64px;
  background-color: #2196F3;
  display: flex;
  align-items: center;
  padding: 0 62px;
  position: sticky;
  top: 0;
  z-index: 10;
  ${boxShadow}
`;

export const NavigationLink = styled(NavLink)`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  padding: 23px;
  
  &:hover,
  &.active {
    color: white;
    text-decoration: none;
    background-color: #1E88E5;
  }
`;

export const CustomSvg = styled.svg`
  position: absolute;
  bottom: 0;
  right: 0;
  transition: opacity 300ms ease;
`;

export const Heart = styled.button`
  border: 0;
  padding: 0;
  width: fit-content;
  height: fit-content;
  background-color: transparent;
  cursor: pointer;
  display: none;
  position: absolute;
  bottom: 28px;
  right: 28px;
  z-index: 2;
  
  & .inactive,
  & .clicked {
    opacity: 0;
  }

  & .liked {
    opacity: 1;
  }
  
  &:hover {
    & .inactive {
      opacity: 1;
    }
    & .active,
    & .clicked {
      opacity: 0;
    }
  }
  
  &:active {
    & .clicked {
      opacity: 1;
    }
    & .active,
    & .inactive {
      opacity: 0;
    }
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  margin-bottom: 48px;
`;

export const Card = styled.div`
  position: relative;
  width: 225px;
  height: 225px;
  background-color: #7c7c7c;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.14);
    cursor: pointer;
    ${boxShadow}, 0 9px 18px rgba(0, 0, 0, 0.18);

    &::after {
      ${CardGradient}
    }

    & ${Heart} {
      display: inline;
    }
  }
`;

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
