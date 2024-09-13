import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AlunoContainer = styled.div`
  margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }
  /* Borda no topo somente onde tem uma div seguida de outra div */
  div + div {
    border-top: solid 1px #eee;
  }
`;

export const Nome = styled.span`
  width: 80px;
  margin: 0 10px;
  text-align: center;
`;

export const Email = styled.span`
  width: 200px;
  margin: 0 10px;
  text-align: center;
`;

export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const NovoAluno = styled(Link)`
  display: block;
  padding: 20px 0 10px 0;
`;
