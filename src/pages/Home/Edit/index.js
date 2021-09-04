// Dependencies
import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import Switch from 'react-switch';
import moment from 'moment';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

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
  // States
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  // Validators
  const Schema = Yup.object().shape({
    name: Yup.string().required('Esse campo é obrigatório'),
    description: Yup.string(),
    start_day: Yup.string(),
    start_hour: Yup.string(),
    end_day: Yup.string(),
    end_hour: Yup.string(),
    all_day: Yup.string(),
  });

  // Functions
  const handleSubmit = async values => {
    setLoading(true);
    try {
      let start_at = moment(values.start_day)
        .set({
          hour: values.start_hour.split(':')[0],
          minute: values.start_hour.split(':')[1],
        })
        .utc();

      let end_at = moment(values.end_day)
        .set({
          hour: values.end_hour.split(':')[0],
          minute: values.end_hour.split(':')[1],
        })
        .utc();

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

  const getEvent = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    if (eventId) {
      getEvent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  return (
    <Modal name="Editar Evento" open={open} onClose={onClose}>
      <S.Content>
        {loading || !event ? (
          <ReactLoading type="spin" color="#fff" height={20} width={20} />
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
                      <I.IconEmail />
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

                <F.Row columns={2}>
                  <F.Column>
                    <label>
                      <I.IconEmail />
                      <strong>Início</strong>
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
                      <I.IconEmail />
                      <strong>Início</strong>
                    </label>
                    <input
                      id="start_hour"
                      name="start_hour"
                      type="text"
                      value={values.start_hour}
                      error={errors.start_hour}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.start_hour && touched.start_hour && (
                      <span>{errors.start_hour}</span>
                    )}
                  </F.Column>
                </F.Row>

                <F.Row columns={2}>
                  <F.Column>
                    <label>
                      <I.IconEmail />
                      <strong>Final</strong>
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
                      <I.IconEmail />
                      <strong>Final</strong>
                    </label>
                    <input
                      id="end_hour"
                      name="end_hour"
                      type="text"
                      value={values.end_hour}
                      error={errors.end_hour}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.end_hour && touched.end_hour && (
                      <span>{errors.end_hour}</span>
                    )}
                  </F.Column>
                </F.Row>

                <F.Row>
                  <F.Column>
                    <label>
                      <I.IconEmail />
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

                <F.Row>
                  <F.Column>
                    <label>
                      <I.IconSwitch />
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
  eventId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};
