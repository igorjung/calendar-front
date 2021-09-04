// Dependencies
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import PropTypes from 'prop-types';

// Services
import api from '~/services/api';

// Components
import EditEvent from '../Edit';

// Styles
import * as S from './styles';
import * as I from '~/styles/icons';

export default function SchedulerComponent({ date, profile }) {
  const [divisions, setDivisions] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getDivisions = () => {
    const divisionList = [];
    for (let time = 0; time < 24; time++) {
      divisionList.push({
        id: time,
        time: `${time}:00`,
      });
    }

    setDivisions(divisionList);
  };

  const getEvents = async () => {
    try {
      const { data } = await api.get(
        `/events?userId=${profile.id}&start=${date.start_at}&end=${date.end_at}`
      );

      const eventList = [];
      divisions.forEach(division => {
        let eventItem = {
          time: division.time,
          isEvent: false,
          id: '',
          name: '',
          description: '',
        };

        data.forEach(event => {
          const divisionTime = moment(event.start_at).set({
            hour: division.id,
            minute: 0,
            second: 0,
            millisecond: 0,
          });
          if (moment(divisionTime).isBetween(event.start_at, event.end_at)) {
            eventItem = {
              time: division.time,
              isEvent: true,
              id: event.id,
              name: event.name,
              description: event.name,
            };
          }
        });

        eventList.push(eventItem);
      });

      setEvents(eventList);
    } catch (err) {
      if (!err.response || err.response.data.error === undefined) {
        toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      } else {
        toast.error(`${err.response.data.error}`);
      }
    }
  };

  const handleEvent = data => {
    setEventId(data.id);
  };

  const handleClose = () => {
    setEventId(null);
    setModalOpen(false);
  };

  const handleRefresh = () => {
    setEventId(null);
    setModalOpen(false);
    getEvents();
  };

  useEffect(() => {
    if (date && profile && divisions) {
      getEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, divisions]);

  useEffect(() => {
    if (eventId) {
      setModalOpen(true);
    }
  }, [eventId]);

  useEffect(() => {
    getDivisions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.Container>
      <EditEvent
        open={modalOpen}
        onClose={handleClose}
        onRefresh={handleRefresh}
        eventId={eventId}
      />
      <S.Header>
        <S.Title>
          <I.IconCalendar size={20} />
          <h2>{moment(date.start_at).format('MMMM D, YYYY')}</h2>
        </S.Title>
      </S.Header>
      <S.Body>
        <S.Division>
          {divisions &&
            divisions.map(division => (
              <li key={division.id}>
                <p>{division.time}</p>
                <hr />
              </li>
            ))}
        </S.Division>
        <S.Grid>
          {events &&
            events.map(event => (
              <li key={event.time}>
                {event.isEvent && (
                  <S.Item type="button" onClick={() => handleEvent(event)}>
                    <strong>{event.name}</strong>
                  </S.Item>
                )}
              </li>
            ))}
        </S.Grid>
      </S.Body>
    </S.Container>
  );
}

// Props
SchedulerComponent.propTypes = {
  date: PropTypes.shape({
    start_at: PropTypes.string,
    end_at: PropTypes.string,
  }),
  profile: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }),
};

SchedulerComponent.defaultProps = {
  date: null,
  profile: null,
};
