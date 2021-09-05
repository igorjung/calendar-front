// Dependencies
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

// Components
import Header from '~/components/Header';
import Filter from './Filter';
import Scheduler from './Scheduler';

// Styles
import * as S from './styles';

export default function Home() {
  // States from Redux
  const profile = useSelector(state => state.user.profile);

  const [date, setDate] = useState({
    start_at: moment()
      .startOf('day')
      .format('YYYY-MM-DDThh:mm:ss'),
    end_at: moment()
      .endOf('day')
      .format('YYYY-MM-DDThh:mm:ss'),
  });

  return (
    <S.Wrapper>
      <Header profile={profile} />
      <S.Container>
        <Filter onSetDate={setDate} />
        <Scheduler date={date} profile={profile} />
      </S.Container>
    </S.Wrapper>
  );
}
