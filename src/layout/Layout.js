import React from 'react';
import { Layout } from 'antd';
import Header from './Header';

const AppLayout = ({ children }) => {
  const { Content } = Layout;
  return (
    <Layout>
      <Header />
      <Content
        style={{
          minHeight: `${window.innerHeight - 64}px`,
          background: '#fff'
        }}>
        {children}
      </Content>
    </Layout>
  );
};

export default AppLayout;
