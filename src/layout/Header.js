import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Layout } from 'antd';

const NavigationHeader = props => {
  const { Header } = Layout;

  return (
    <Header>
      <Link to="/" style={{ color: 'white' }}>
        React Trivia Admin
      </Link>
      <Menu theme="dark" mode="horizontal" />
    </Header>
  );
};

export default NavigationHeader;
