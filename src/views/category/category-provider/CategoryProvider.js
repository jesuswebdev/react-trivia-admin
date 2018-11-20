import { Component } from 'react';
import { connect } from 'react-redux';

import { http, getAuthHeaders } from '../../../utils';
import { fetchCategoriesSuccess } from '../../../state/category/actions';

class CategoryProvider extends Component {
  state = {
    loading: false,
    error: false
  };

  async componentDidMount() {
    try {
      this.setState({ loading: true, error: false });
      const { data } = await http.get('/category', {
        headers: getAuthHeaders()
      });
      this.props.getCategories(data);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false, error: true });
    }
  }

  render() {
    const { categories } = this.props;
    const { loading, error } = this.state;
    return this.props.children(categories, loading, error);
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategories: categories => {
      dispatch(fetchCategoriesSuccess(categories));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryProvider);
