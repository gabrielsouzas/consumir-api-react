import React from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { isEmail } from 'validator';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Substitui o history
  const location = useLocation(); // Substitui o location

  /** Redireciona para a rota anterior caso exista, se não vai para a home (/) */
  const prevPath = get(location, 'state.prevPath', '/'); // Obtendo prevPath da nova maneira

  /* VERSÂO REACT-ROUTER-DOM 5 */
  /** Redireciona para a rota anterior caso exista, se não vai para a home (/) */
  // const prevPath = get(props, 'location.state.prevPath', '/');
  // const history = get(props, 'history');

  const isLoading = useSelector((state) => state.auth.isLoading);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido.');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha inválida');
    }

    if (formErrors) return;

    /** Ao invés de colocar a interação com a API aqui, é usado o Redux para fazer isso
     *  O método loginRequest faz a requisição de cadastro/alteração para a API no arquivo saga.js
     */
    dispatch(actions.loginRequest({ email, password, prevPath, navigate }));
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Sua senha"
        />
        <button type="submit">Acessar</button>
      </Form>
    </Container>
  );
}
