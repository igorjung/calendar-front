// Dependencies
import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import moment from 'moment';
import 'moment/locale/pt-br';
import PropTypes from 'prop-types';

// Utils
import divisions from '~/utils/divisions';

// Services
import api from '~/services/api';

// Components
import EditEvent from '../Edit';

// Styles
import * as S from './styles';
import * as I from '~/styles/icons';

// Color Schema
import colors from '~/styles/colors';

export default function SchedulerComponent({ date, profile }) {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  moment.locale('pt-br');

  const getEvents = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/events?userId=${profile.id}&start=${date.start_at}&end=${date.end_at}`
      );

      const eventList = [];
      divisions.forEach(division => {
        let eventItem = {
          time: division,
          isEvent: false,
          id: '',
          name: '',
          description: '',
          isGuested: false,
          isFirst: false,
        };

        data.forEach(event => {
          const isGuested = event.user_id !== profile.id;
          const isNotFirst = eventList.filter(item => item.id === event.id)[0];

          const divisionTime = moment(event.start_at).set({
            hour: division.split(':')[0],
            minute: division.split(':')[1],
            second: 0,
            millisecond: 0,
          });

          if (
            moment(divisionTime).isSame(event.start_at) ||
            moment(divisionTime).isBetween(event.start_at, event.end_at)
          ) {
            eventItem = {
              time: division,
              isEvent: true,
              id: event.id,
              name: event.name,
              description: event.name,
              isGuested,
              isFirst: !isNotFirst,
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
    setLoading(false);
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
          <I.IconCalendar size={24} />
          <h2>{moment(date.start_at).format('D MMMM, YYYY')}</h2>
        </S.Title>
      </S.Header>
      <S.Body>
        <S.Division>
          {divisions &&
            divisions.map(division => (
              <li key={division}>
                <p>{division}</p>
                <hr />
              </li>
            ))}
        </S.Division>
        {loading ? (
          <ReactLoading
            type="spin"
            color={colors.tertiary}
            height={20}
            width={20}
          />
        ) : (
          <S.Grid>
            {events &&
              events.map(event => (
                <li key={event.time}>
                  {event.isEvent ? (
                    <S.Item
                      type="button"
                      isEvent={event.isEvent}
                      isGuested={event.isGuested}
                      disabled={event.isGuested}
                      onClick={() => handleEvent(event)}
                    >
                      {event.isFirst && (
                        <strong>
                          {event.name}
                          {event.isGuested && ' (convidado)'}
                        </strong>
                      )}
                    </S.Item>
                  ) : (
                    <S.Item type="button" isEvent={event.isEvent} disabled />
                  )}
                </li>
              ))}
          </S.Grid>
        )}
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
