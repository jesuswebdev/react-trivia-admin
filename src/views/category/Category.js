import React from 'react';
import CategoryProvider from './category-provider/CategoryProvider';
import CategoryList from './category-list/CategoryList';

const Category = () => {
  return (
    <CategoryProvider>
      {(categories, loading, error) => (
        <CategoryList categories={categories} loading={loading} error={error} />
      )}
    </CategoryProvider>
  );
};

export default Category;
