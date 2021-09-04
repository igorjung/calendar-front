// Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import moment from 'moment';

// Styles
import * as S from './styles';
import * as I from '~/styles/icons';

import 'react-calendar/dist/Calendar.css';

export default function Filter({ onSetDate }) {
  const [day, setDay] = useState(new Date());

  useEffect(() => {
    if (day) {
      const start_at = moment(day)
        .startOf('day')
        .utc()
        .format('YYYY-MM-DDThh:mm:ss');
      const end_at = moment(day)
        .endOf('day')
        .utc()
        .format('YYYY-MM-DDThh:mm:ss');

      onSetDate({
        start_at,
        end_at,
      });
    }
  }, [day, onSetDate]);

  return (
    <S.Container>
      <Calendar onChange={setDay} value={day} />
    </S.Container>
  );
}

// Props
Filter.propTypes = {
  onSetDate: PropTypes.func.isRequired,
};
