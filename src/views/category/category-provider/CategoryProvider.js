import { useState, useEffect } from 'react';
import { http, getAuthHeaders } from '../../../utils';

const CategoryProvider = ({ render, user }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getCategories = async () => {
    try {
      setLoading(true);
      setError(false);
      const { data } = await http.get('/category', {
        headers: getAuthHeaders(user.token)
      });
      setCategories(data);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const editCategory = async (id, props) => {
    try {
      const { data: category } = await http.patch(`/category/${id}`, props, {
        headers: getAuthHeaders(user.token)
      });
      const newCategories = categories.map(c => {
        if (c._id === category._id) {
          return { ...c, ...category };
        }
        return c;
      });
      return setCategories(newCategories);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteCategory = async id => {
    try {
      await http.delete(`/category/${id}`, {
        headers: getAuthHeaders(user.token)
      });
      const newCategories = categories.filter(c => {
        return c._id !== id;
      });
      return setCategories(newCategories);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return render({ categories, loading, error, editCategory, deleteCategory });
};
export default CategoryProvider;
