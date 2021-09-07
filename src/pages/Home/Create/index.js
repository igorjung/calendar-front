// Dependencies
import React, { useState } from 'react';
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

// Color Schema
import colors from '~/styles/colors';

// Components
import Modal from '~/components/Modal';
import Button from '~/components/Button';

export default function CreateEvents({ open, onClose, onRefresh }) {
  // States
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
      await api.post(`/events`, data);
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

  return (
    <Modal name="Adicionar Evento" open={open} onClose={onClose}>
      <S.Content>
        {loading ? (
          <ReactLoading
            type="spin"
            color={colors.tertiary}
            height={20}
            width={20}
          />
        ) : (
          <Formik
            initialValues={{
              name: '',

              start_day: moment().format('YYYY-MM-DD'),
              start_hour: moment().format('hh:mm'),

              end_day: moment().format('YYYY-MM-DD'),
              end_hour: moment()
                .add(1, 'hours')
                .format('hh:mm'),

              description: '',

              all_day: false,
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
                    <strong>Confirmar</strong>
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
CreateEvents.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};
