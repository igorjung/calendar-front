// Dependencies
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import Switch from 'react-switch';
import moment from 'moment';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import 'moment/locale/pt-br';

// Utils
import divisions from '~/utils/divisions';

// Services
import api from '~/services/api';

// Styles
import * as S from './styles';
import * as F from '~/styles/form';
import * as I from '~/styles/icons';

// Color Schema
import colors from '~/styles/colors';

// Components
import Modal from '~/components/Modal';
import Button from '~/components/Button';

export default function EditEvents({ open, onClose, onRefresh, eventId }) {
  // States from Redux
  const profile = useSelector(state => state.user.profile);

  // States
  const [event, setEvent] = useState(null);
  const [guests, setGuests] = useState([]);
  const [users, setUsers] = useState([]);
  const [guestLoading, setGuestLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validators
  const Schema = Yup.object().shape({
    name: Yup.string().required('Esse campo é obrigatório'),
    description: Yup.string(),
    start_day: Yup.string().required(),
    start_hour: Yup.string().when('all_day', (all_day, field) =>
      all_day ? field.required() : field
    ),
    end_day: Yup.string().when('all_day', (all_day, field) =>
      all_day ? field.required() : field
    ),
    end_hour: Yup.string().when('all_day', (all_day, field) =>
      all_day ? field.required() : field
    ),
    all_day: Yup.bool(),
  });

  // Functions
  const getEvent = async () => {
    setGuestLoading(true);
    try {
      const { data } = await api.get(`/events/${eventId}`);
      setEvent(data);
    } catch (err) {
      if (!err.response || err.response.data.error === undefined) {
        toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      } else {
        toast.error(`${err.response.data.error}`);
      }
    }
    setGuestLoading(false);
  };

  const getUsers = async () => {
    setGuestLoading(true);
    try {
      const { data } = await api.get(`/users`);
      const list = [];
      data.forEach(user => {
        const isGuest = guests.find(guest => guest.user.id === user.id);
        if (user.id !== profile.id && !isGuest) {
          console.log(user, guests, isGuest);
          list.push(user);
        }
      });
      setUsers(list);
    } catch (err) {
      if (!err.response || err.response.data.error === undefined) {
        toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      } else {
        toast.error(`${err.response.data.error}`);
      }
    }
    setGuestLoading(false);
  };

  const handleSubmit = async values => {
    moment.locale('pt-br');

    setLoading(true);
    try {
      let start_at = moment(values.start_day).set({
        hour: values.start_hour.split(':')[0],
        minute: values.start_hour.split(':')[1],
      });
      let end_at = moment(values.end_day).set({
        hour: values.end_hour.split(':')[0],
        minute: values.end_hour.split(':')[1],
      });
      if (values.all_day) {
        start_at = start_at.startOf('day');
        end_at = end_at.endOf('day');
      }

      const data = {
        name: values.name,
        start_at: start_at.format(),
        end_at: end_at.format(),
        description: values.description,
        all_day: values.all_day,
      };
      console.log(data);
      await api.put(`/events/${eventId}`, data);
      onRefresh();
    } catch (err) {
      if (!err.response || err.response.data.error === undefined) {
        toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      } else {
        toast.error(`${err.response.data.error}`);
      }
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/events/${eventId}`);
      onRefresh();
    } catch (err) {
      if (!err.response || err.response.data.error === undefined) {
        toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      } else {
        toast.error(`${err.response.data.error}`);
      }
    }
    setLoading(false);
  };

  const getGuests = async () => {
    setGuestLoading(true);
    try {
      const { data } = await api.get(`/guests?eventId=${eventId}`);
      setGuests(data);
    } catch (err) {
      if (!err.response || err.response.data.error === undefined) {
        toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      } else {
        toast.error(`${err.response.data.error}`);
      }
    }
    setGuestLoading(false);
  };

  const handleDeleteGuest = async id => {
    setGuestLoading(true);
    try {
      await api.delete(`/guests/${id}`);
      getGuests();
    } catch (err) {
      if (!err.response || err.response.data.error === undefined) {
        toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      } else {
        toast.error(`${err.response.data.error}`);
      }
    }
    setGuestLoading(false);
  };

  const handleAddGuest = async userId => {
    setGuestLoading(true);
    try {
      const data = {
        user_id: userId,
        event_id: event.id,
      };
      await api.post(`/guests`, data);
      getGuests();
    } catch (err) {
      if (!err.response || err.response.data.error === undefined) {
        toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      } else {
        toast.error(`${err.response.data.error}`);
      }
    }
    setGuestLoading(false);
  };

  useEffect(() => {
    if (eventId) {
      getEvent();
      getGuests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  useEffect(() => {
    if (profile) {
      getUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, guests]);

  return (
    <Modal name="Editar Evento" open={open} onClose={onClose}>
      <S.Content>
        {loading || !event ? (
          <ReactLoading
            type="spin"
            color={colors.tertiary}
            height={20}
            width={20}
          />
        ) : (
          <Formik
            initialValues={{
              name: event.name || '',

              start_day: event.start_at
                ? moment(event.start_at).format('YYYY-MM-DD')
                : '',
              start_hour: event.start_at
                ? moment(event.start_at).format('hh:mm')
                : '',

              end_day: event.end_at
                ? moment(event.end_at).format('YYYY-MM-DD')
                : '',
              end_hour: event.end_at
                ? moment(event.end_at).format('hh:mm')
                : '',

              description: event.description || '',

              all_day: event.all_day || false,

              userId: '',
            }}
            validationSchema={Schema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              handleChange,
              handleBlur,
              setFieldValue,
              errors,
              touched,
            }) => (
              <F.Container>
                <F.Row>
                  <F.Column>
                    <label>
                      <strong>Nome</strong>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={values.name}
                      error={errors.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name && <span>{errors.name}</span>}
                  </F.Column>
                </F.Row>

                {values.all_day ? (
                  <>
                    <F.Row columns={2}>
                      <F.Column>
                        <label>
                          <strong>Dia Todo</strong>
                        </label>
                        <Switch
                          onChange={e => {
                            setFieldValue('all_day', e);
                          }}
                          checked={values.all_day || false}
                          onColor={colors.secondary}
                          offColor={colors.tertiary}
                        />

                        {errors.all_day && touched.all_day && (
                          <span>{errors.all_day}</span>
                        )}
                      </F.Column>
                      <F.Column>
                        <label>
                          <strong>Dia Inicial</strong>
                        </label>
                        <input
                          id="start_day"
                          name="start_day"
                          type="date"
                          value={values.start_day}
                          error={errors.start_day}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.start_day && touched.start_day && (
                          <span>{errors.start_day}</span>
                        )}
                      </F.Column>
                    </F.Row>
                  </>
                ) : (
                  <>
                    <F.Row>
                      <F.Column>
                        <label>
                          <strong>Dia Todo</strong>
                        </label>
                        <Switch
                          onChange={e => {
                            setFieldValue('all_day', e);
                          }}
                          checked={values.all_day || false}
                          onColor={colors.secondary}
                          offColor={colors.tertiary}
                        />

                        {errors.all_day && touched.all_day && (
                          <span>{errors.all_day}</span>
                        )}
                      </F.Column>
                    </F.Row>
                    <F.Row columns={2}>
                      <F.Column>
                        <label>
                          <strong>Dia Inicial</strong>
                        </label>
                        <input
                          id="start_day"
                          name="start_day"
                          type="date"
                          value={values.start_day}
                          error={errors.start_day}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.start_day && touched.start_day && (
                          <span>{errors.start_day}</span>
                        )}
                      </F.Column>
                      <F.Column>
                        <label>
                          <strong>Hora Inicial</strong>
                        </label>
                        <select
                          id="start_hour"
                          name="start_hour"
                          type="text"
                          value={values.start_hour}
                          error={errors.start_hour}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          {divisions &&
                            divisions.map(division => (
                              <option key={division} value={division}>
                                {division}
                              </option>
                            ))}
                        </select>
                        {errors.start_hour && touched.start_hour && (
                          <span>{errors.start_hour}</span>
                        )}
                      </F.Column>
                    </F.Row>
                    <F.Row columns={2}>
                      <F.Column>
                        <label>
                          <strong>Dia Final</strong>
                        </label>
                        <input
                          id="end_day"
                          name="end_day"
                          type="date"
                          value={values.start_day}
                          error={errors.start_day}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.start_day && touched.start_day && (
                          <span>{errors.start_day}</span>
                        )}
                      </F.Column>
                      <F.Column>
                        <label>
                          <strong>Hora Final</strong>
                        </label>
                        <select
                          id="end_hour"
                          name="end_hour"
                          type="text"
                          value={values.end_hour}
                          error={errors.end_hour}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          {divisions &&
                            divisions.map(division => (
                              <option key={division} value={division}>
                                {division}
                              </option>
                            ))}
                        </select>
                        {errors.end_hour && touched.end_hour && (
                          <span>{errors.end_hour}</span>
                        )}
                      </F.Column>
                    </F.Row>
                    <F.Row>
                      <F.Column>
                        <label>
                          <strong>Descrição</strong>
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          type="text"
                          value={values.description}
                          error={errors.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.description && touched.description && (
                          <span>{errors.description}</span>
                        )}
                      </F.Column>
                    </F.Row>
                  </>
                )}

                <F.Separator />
                <F.SubTitle>Convidados</F.SubTitle>

                {guestLoading ? (
                  <ReactLoading
                    type="spin"
                    color={colors.tertiary}
                    height={20}
                    width={20}
                  />
                ) : (
                  <>
                    <F.Row columns={2}>
                      <F.Column>
                        <select
                          id="userId"
                          name="userId"
                          type="text"
                          value={values.userId}
                          error={errors.userId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="" />
                          {users &&
                            users.map(user => (
                              <option key={user.id} value={user.id}>
                                {user.name}
                              </option>
                            ))}
                        </select>
                        {errors.userId && touched.userId && (
                          <span>{errors.userId}</span>
                        )}
                      </F.Column>
                      <F.Column>
                        <Button
                          loading={guestLoading}
                          background={colors.secondary}
                          disabled={!values.userId}
                          color="#fff"
                          type="submit"
                          onClick={() => handleAddGuest(values.userId)}
                        >
                          <strong>Adicionar</strong>
                        </Button>
                      </F.Column>
                    </F.Row>

                    {guests && guests[0] && (
                      <F.List>
                        {guests.map(item => (
                          <F.Item key={item.id}>
                            <strong>{item.user.name}</strong>
                            <button
                              type="button"
                              onClick={() => handleDeleteGuest(item.id)}
                            >
                              <I.IconTrash size={20} />
                            </button>
                          </F.Item>
                        ))}
                      </F.List>
                    )}
                  </>
                )}

                <F.Footer>
                  <Button
                    loading={false}
                    background="#ddd"
                    color="#666"
                    type="button"
                    onClick={onClose}
                  >
                    <strong>Cancelar</strong>
                  </Button>
                  <Button
                    loading={loading}
                    background={colors.secondary}
                    color="#fff"
                    type="submit"
                  >
                    <strong>Salvar</strong>
                  </Button>
                  <Button
                    loading={loading}
                    background={colors.warning}
                    color="#fff"
                    type="button"
                    onClick={handleDelete}
                  >
                    <strong>Deletar</strong>
                  </Button>
                </F.Footer>
              </F.Container>
            )}
          </Formik>
        )}
      </S.Content>
    </Modal>
  );
}

// Props
EditEvents.propTypes = {
  open: PropTypes.bool.isRequired,
  eventId: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

EditEvents.defaultProps = {
  eventId: null,
};
