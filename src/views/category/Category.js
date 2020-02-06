import React from 'react';
import { CategoryProvider } from '../../providers';
import CategoryList from './category-list/CategoryList';

const Category = () => {
  return <CategoryProvider render={props => <CategoryList {...props} />} />;
};

export default Category;
