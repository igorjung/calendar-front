// Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Components
import CreateEvent from '../Create';

// Styles
import * as S from './styles';
import * as I from '~/styles/icons';

export default function Filter({ onSetDate }) {
  const [day, setDay] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleRefresh = () => {
    setModalOpen(false);
    setDay(new Date());
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day]);

  return (
    <S.Container visible={visible}>
      <CreateEvent
        open={modalOpen}
        onClose={handleClose}
        onRefresh={handleRefresh}
      />
      {visible ? (
        <>
          <S.Controller type="button" onClick={() => setVisible(!visible)}>
            <I.IconMenu size={20} />
          </S.Controller>
          <S.Button type="button" onClick={() => setModalOpen(true)}>
            <I.IconAdd size={24} />
            <strong>Adicionar Evento</strong>
          </S.Button>
          <S.CalendarStyled locale="pt-br" onChange={setDay} value={day} />
        </>
      ) : (
        <>
          <S.Controller type="button" onClick={() => setVisible(!visible)}>
            <I.IconMenu size={20} />
          </S.Controller>
        </>
      )}
    </S.Container>
  );
}

// Props
Filter.propTypes = {
  onSetDate: PropTypes.func.isRequired,
};
