import { useState, useEffect } from 'react';
import { http, getAuthHeaders } from '../utils';
import { connect } from 'react-redux';

const QuestionsProvider = ({ render, user, pending }) => {
  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoading] = useState(false);
  const [errorLoadingQuestions, setError] = useState(false);

  const getQuestions = async ({ pending, search }) => {
    try {
      setLoading(true);
      setError(false);
      const { data } = await http.get(
        `/questions${pending ? '/pending' : ''}${
          search ? `?search=${search}` : ''
        }`,
        {
          headers: getAuthHeaders(user.token)
        }
      );
      setQuestions(data);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const editQuestion = async (id, props = {}) => {
    try {
      const { data: question } = await http.patch(`/questions/${id}`, props, {
        headers: getAuthHeaders(user.token)
      });
      console.log('question', question);
      const newQuestions = questions
        .map(q => {
          if (q._id === id) {
            if (['rejected', 'approved'].includes(props.state || '')) {
              return null;
            }
            return { ...q, ...question };
          }
          return q;
        })
        .filter(notNull => notNull);
      return setQuestions(newQuestions);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  //   const deleteCategory = async id => {
  //     try {
  //       await http.delete(`/category/${id}`, {
  //         headers: getAuthHeaders(user.token)
  //       });
  //       const newCategories = categories.filter(c => {
  //         return c._id !== id;
  //       });
  //       return setCategories(newCategories);
  //     } catch (error) {
  //       console.error(error);
  //       throw error;
  //     }
  //   };

  useEffect(() => {
    getQuestions({ pending });
  }, []);

  return render({
    questions,
    loadingQuestions,
    errorLoadingQuestions,
    editQuestion,
    getQuestions
  });
};
export default connect(({ user }) => ({ user }))(QuestionsProvider);
