import React from 'react';
import { connect } from 'react-redux';
import CategoryProvider from './category-provider/CategoryProvider';
import CategoryList from './category-list/CategoryList';

const Category = ({ user }) => {
  return (
    <CategoryProvider
      user={user}
      render={props => <CategoryList {...props} />}
    />
  );
};

export default connect(({ user }) => ({ user }))(Category);
