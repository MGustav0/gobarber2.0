import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

/** Recupera o texto através da propriedade "children", e o restante das propriedades
 * coloca-se na variável "...rest"
 */

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? 'Enviando...' : children}
  </Container>
);

export default Button;
