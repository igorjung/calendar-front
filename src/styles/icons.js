import styled from 'styled-components';

// Icons
import {
  CalendarToday,
  Add,
  Person,
  Visibility,
  VisibilityOff,
  Close,
  Logout,
  Menu,
  Delete,
} from '@styled-icons/material';

// Color Schema
import colors from '~/styles/colors';

export const IconCalendar = styled(CalendarToday)`
  color: ${colors.tertiary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconUser = styled(Person)`
  color: ${colors.tertiary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconLogout = styled(Logout)`
  color: ${colors.warning};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconAdd = styled(Add)`
  color: #fff;
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconHidden = styled(VisibilityOff)`
  color: ${colors.tertiary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconVisible = styled(Visibility)`
  color: ${colors.tertiary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconClose = styled(Close)`
  color: ${colors.tertiary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconMenu = styled(Menu)`
  color: ${colors.tertiary};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;

export const IconTrash = styled(Delete)`
  color: ${colors.warning};
  height: ${props => (props.size ? `${props.size}px` : '18px')};

  @media (max-height: 990px) {
    height: ${props => (props.size ? `${props.size - 2}px` : '18px')};
  }
`;
