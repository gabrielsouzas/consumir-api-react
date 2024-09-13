import React from 'react';
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaCircle,
  FaPowerOff,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../store/modules/auth/actions';
import { Nav } from './styled';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    navigate('/');
  };

  return (
    <Nav>
      <Link to="/" title="Home">
        <FaHome size={24} />
      </Link>
      <Link to="/register" title="Criar/Editar Usuário">
        <FaUserAlt size={24} />
      </Link>
      {isLoggedIn ? (
        <Link onClick={handleLogout} to="/logout" title="Fazer Logoff">
          <FaPowerOff size={24} />
        </Link>
      ) : (
        <Link to="/login" title="Fazer Login">
          <FaSignInAlt size={24} />
        </Link>
      )}

      {isLoggedIn && (
        <FaCircle size={24} color="green" title="Usuário Logado" />
      )}
    </Nav>
  );
}
