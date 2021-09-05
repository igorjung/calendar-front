import styled from 'styled-components';
import Calendar from 'react-calendar';

// Color Schema
import colors from '~/styles/colors';

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: ${({ visible }) => (visible ? '351px' : '40px')};
  height: 100%;

  @media (max-width: 990px) {
    max-width: ${({ visible }) => (visible ? '100%' : '40px')};
  }

  padding: 32px 0 64px 0;
  background-color: ${colors.primary};
  border-right: 1px solid rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const Controller = styled.button`
  position: absolute;
  top: 0;
  right: 0;

  width: 40px;
  height: 40px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  padding: 10px 20px;
  margin-bottom: 32px;
  background-color: ${colors.tertiary};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  border-radius: 30px;

  strong {
    margin-left: 8px;
    color: #fff;
  }
`;

export const CalendarStyled = styled(Calendar)`
  .react-calendar {
    width: 100%;
    max-width: 100%;
    background: white;
    border: 0;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }
  .react-calendar--doubleView {
    width: 700px;
  }
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: none;
  }
  .react-calendar__navigation button[disabled] {
    background-color: none;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  .react-calendar__month-view__weekNumbers {
    font-weight: bold;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
  }
  .react-calendar__month-view__days__day--weekend {
    color: ${colors.secondary};
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    text-align: center;
    padding: 0.75em 0.5em;
    background: none;
  }
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__tile--now {
    background: ${colors.secondary};
    color: #ffff;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: ${colors.secondary};
    opacity: 0.8;
  }
  .react-calendar__tile--hasActive {
    background: ${colors.tertiary};
    color: #ffff;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: ${colors.tertiary};
    color: #ffff;
  }
  .react-calendar__tile--active {
    background: ${colors.tertiary};
    color: #ffff;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${colors.tertiary};
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
`;
