import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';

/** O Redux precisa de funções geradoras em algumas ocasiões para funcionar corretamente */

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    // informa ao Redux que a operação foi bem-sucedida
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('Você fez login');

    /** Coloca no cabeçalho de todas as requisições o Bearer Token retornado */
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    // Redireciona o usuário para a rota anterior ou home
    const { navigate, prevPath } = payload;
    navigate(prevPath); // Chama a função navigate diretamente com prevPath
  } catch (e) {
    toast.error('Usuário ou senha inválidos.');

    yield put(actions.loginFailure());
  }
}

/* Busca o Token no LocalStorage e coloca no Header -> Authorization */
function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { id, nome, email, password, navigate } = payload;

  try {
    /** Se existir o ID, a requisição será de update */
    if (id) {
      yield call(axios.put, '/users', {
        email,
        nome,
        password: password || undefined,
      });
      toast.success('Conta alterada com sucesso!');
      yield put(actions.registerUpdatedSuccess({ nome, email, password }));
    } else {
      yield call(axios.post, '/users', {
        email,
        nome,
        password,
      });
      toast.success('Conta criada com sucesso!');
      yield put(actions.registerCreatedSuccess({ nome, email, password }));
      navigate('/login');
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      toast.error('Você precisa fazer login novamente.');
      yield put(actions.loginFailure());
      return navigate('/login');
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
