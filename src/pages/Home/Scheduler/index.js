// Dependencies
import React, { useState, useEffect } from 'react';
import Scheduler, {
  SchedulerData,
  ViewTypes,
  DATE_FORMAT,
} from 'react-big-scheduler';
import { toast } from 'react-toastify';
import moment from 'moment';
import PropTypes from 'prop-types';

// Services
import api from '~/services/api';

import 'react-big-scheduler/lib/css/style.css';

// Styles
import * as S from './styles';

export default function SchedulerComponent({ date, profile }) {
  const [schedulerData, setSchedulerData] = useState(
    new SchedulerData(moment().format(DATE_FORMAT), ViewTypes.Week)
  );

  const getEvents = async () => {
    try {
      const { data: events } = await api.get(
        `/events?userId=${profile.id}&start=${date.start_at}&end=${date.end_at}`
      );

      if (events && events.length) {
        const eventList = events.map(event => ({
          id: event.id,
          start: event.start_at,
          end: event.end_at,
          resourceId: `r${event.id}`,
          title: event.name,
          bgColor: '#D9D9D9',
        }));

        const resourceList = events.map(event => ({
          id: `r${event.id}`,
          name: event.name,
        }));

        console.log(eventList, resourceList);

        const newSchedulerData = new SchedulerData(
          moment().format(DATE_FORMAT),
          ViewTypes.Week
        );
        newSchedulerData.setEvents(eventList);
        newSchedulerData.setResources(resourceList);
        setSchedulerData(newSchedulerData);
      }
    } catch (err) {
      if (!err.response || err.response.data.error === undefined) {
        toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      } else {
        toast.error(`${err.response.data.error}`);
      }
    }
  };

  useEffect(() => {
    if (date && profile) {
      getEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <S.Container>
      <Scheduler
        schedulerData={schedulerData}
        prevClick={e => console.log(e)}
        nextClick={e => console.log(e)}
        onSelectDate={e => console.log(e)}
        onViewChange={e => console.log(e)}
        eventItemClick={e => console.log(e)}
      />
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
    id: PropTypes.number,
  }),
};

SchedulerComponent.defaultProps = {
  date: null,
  profile: null,
};
