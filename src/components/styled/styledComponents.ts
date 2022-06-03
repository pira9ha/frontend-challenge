import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { boxShadow, CardGradient } from './styleElements';

export const Header = styled.nav`
  height: 64px;
  background-color: ${props => props.theme.basicBlue};
  display: flex;
  align-items: center;
  padding: 0 62px;
  position: sticky;
  top: 0;
  z-index: 10;
  ${boxShadow}
`;

export const NavigationLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-align: center;
  height: 100%;
  color: ${props => props.theme.inactiveLink};
  text-decoration: none;
  padding: 0 23px;

  &:hover,
  &.active {
    color: ${props => props.theme.background};
    text-decoration: none;
    background-color: ${props => props.theme.activeNav};
  }
`;

export const CustomSvg = styled.svg`
  position: absolute;
  bottom: 0;
  right: 0;
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
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  flex-wrap: wrap;
  gap: 48px;
  padding-top: 48px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 35px;
    padding-top: 35px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 780px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

export const CardWrapper = styled.div`
  max-width: 320px;
`;

export const CardWrapperFirstChild = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
`;

export const Card = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

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

export const LostCatContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  top: 50%;
  right: 50%;
  transform: translate(50%);
  color: rgba(33, 150, 243, 0.6);

  & .text-waiting {
    margin-top: 15px;
    font-weight: 600;
    font-size: 21px;
    text-orientation: sideways;
  }
`;

export const Loader = styled.div`
  margin-top: 48px;
  margin-bottom: 31px;

  @media (max-width: 1280px) {
    margin-top: 35px;
  }
`;

export const Modal = styled(LostCatContainer)`
  border-radius: 10px;
  padding: 20px;
  transform: translate(0);
  position: fixed;
  bottom: 15px;
  top: auto;
  right: 15px;
  background-color: ${props => props.theme.background};
  text-align: center;
  z-index: 99;
  box-shadow: 0 0 20px 10px rgba(18, 46, 65, 0.1);

  & img {
    width: 150px;
  }
`;

export const Button = styled.button`
  position: absolute;
  cursor: pointer;
  top: 15px;
  right: 15px;
  border: 0;
  background-color: transparent;
  padding: 0;

  & svg {
    width: 30px;
    height: 30px;
  }

  & .close-button_cross {
    stroke: ${props => props.theme.basicBlue};
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
  }
`;
