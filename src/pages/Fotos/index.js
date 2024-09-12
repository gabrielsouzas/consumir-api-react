import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import * as actions from '../../store/modules/auth/actions';
import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import { Title, Form } from './styled';

export default function Fotos() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const id = get(match, 'params.id', '');
  const id = get(useParams(), 'id', '');

  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Foto[0].url', ''));
        setIsLoading(false);
      } catch (e) {
        toast.error('Erro ao obter imagem');
        setIsLoading(false);
        navigate('/');
      }
    };

    getData();
  }, [id, navigate]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(file);

    setFoto(fotoURL);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', file);

    try {
      setIsLoading(true);

      await axios.post('/fotos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Foto enviada com sucesso');

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const { status } = get(error, 'response', '');
      toast.error('Erro ao enviar foto');

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Fotos</Title>

      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="Foto" /> : 'Selecionar'}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}
