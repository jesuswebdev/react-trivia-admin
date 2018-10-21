import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as categoryActions from "../../../state/category/actions";
import * as questionActions from "../../../state/question/actions";
import * as uiNewQuestionActions from "../../../state/ui/new-question/actions";

class NewQuestion extends Component {
  state = {
    questionForm: {
      controls: {
        title: {
          name: "title",
          placeholder: "Cuerpo de la pregunta",
          value: ""
        },
        options: [
          { name: "option1", value: "", correct_answer: false },
          { name: "option2", value: "", correct_answer: false },
          { name: "option3", value: "", correct_answer: false },
          { name: "option4", value: "", correct_answer: false }
        ],
        correct_answer: {
          value: ""
        },
        category: {
          value: ""
        },
        difficulty: {
          value: ""
        }
      }
    }
  };

  componentDidMount() {
    this.props.fetchCategories();
  }

  componentWillUnmount() {
    this.props.redirectOnSent();
  }

  submitHandler = event => {
    event.preventDefault();

    const controls = { ...this.state.questionForm.controls };
    controls.options = [...controls.options].map(option => {
      if (option.name === controls.correct_answer.value) {
        option.correct_answer = true;
      } else {
        option.correct_answer = false;
      }
      return {
        text: option.value,
        correct_answer: option.correct_answer
      };
    });
    const question = {
      title: controls.title.value,
      options: controls.options,
      category: controls.category.value,
      difficulty: controls.difficulty.value
    };
    this.props.saveQuestion(question);
  };

  inputHandler = event => {
    if (/^option/.test(event.target.name)) {
      let options = [...this.state.questionForm.controls.options];
      options = options.map(option => {
        if (option.name === event.target.name) {
          option.value = event.target.value;
        }
        return option;
      });

      this.setState(state => {
        return {
          ...state,
          questionForm: {
            controls: {
              ...state.questionForm.controls,
              options
            }
          }
        };
      });
    } else {
      let controls = { ...this.state.questionForm.controls };
      controls[event.target.name].value = event.target.value;
      this.setState({ questionForm: { controls } });
    }
  };

  selectHandler = event => {
    let controls = { ...this.state.questionForm.controls };
    controls[event.target.name].value = event.target.value;
    this.setState({ questionForm: { controls } });
  };

  render() {
    if (this.props.saved) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="columns is-centered is-desktop">
        <div className="column is-8-desktop">
          <form onSubmit={this.submitHandler}>
            <div className="field">
              <label className="label">Cuerpo de la pregunta</label>
              <div className="control">
                <textarea
                  name={this.state.questionForm.controls.title.name}
                  className="textarea has-fixed-size"
                  type="text"
                  placeholder={
                    this.state.questionForm.controls.title.placeholder
                  }
                  onChange={this.inputHandler}
                  value={this.state.questionForm.controls.title.value}
                  disabled={this.props.pending}
                />
              </div>
            </div>
            {this.state.questionForm.controls.options.map((option, i) => {
              return (
                <div className="field" key={i}>
                  <label className="label">Respuesta N° {i + 1}</label>
                  <div className="control">
                    <input
                      name={option.name}
                      className="input"
                      type="text"
                      onChange={this.inputHandler}
                      value={option.value}
                      disabled={this.props.pending}
                    />
                  </div>
                </div>
              );
            })}

            <div className="select">
              <select
                name="difficulty"
                onChange={this.selectHandler}
                value={this.state.questionForm.controls.difficulty.value}
                disabled={this.props.pending}>
                <option disabled value="">
                  Elige una dificultad
                </option>
                <option value="easy">Facil</option>
                <option value="medium">Media</option>
                <option value="hard">Dificil</option>
              </select>
            </div>

            <div
              className={[
                "select",
                this.props.loadingCategories ? "is-loading" : ""
              ].join(" ")}>
              <select
                name="category"
                onChange={this.selectHandler}
                value={this.state.questionForm.controls.category.value}
                disabled={this.props.pending}>
                <option value="" disabled>
                  Elige una categoria
                </option>
                {this.props.categories.length > 0 &&
                  this.props.categories.map(cat => {
                    return (
                      <option value={cat._id} key={cat._id}>
                        {cat.title}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="select">
              <select
                name="correct_answer"
                onChange={this.selectHandler}
                value={this.state.questionForm.controls.correct_answer.value}
                disabled={this.props.pending}>
                <option disabled value="">
                  Elige la respuesta correcta
                </option>
                <option value="option1">Respuesta 1</option>
                <option value="option2">Respuesta 2</option>
                <option value="option3">Respuesta 3</option>
                <option value="option4">Respuesta 4</option>
              </select>
            </div>

            <button
              type="submit"
              className={[
                "button",
                "is-link",
                this.props.pending ? "is-loading" : ""
              ].join(" ")}
              disabled={this.props.pending}>
              Enviar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category.categories,
    loadingCategories: state.ui.newQuestion.loadingCategories,
    pending: state.ui.newQuestion.pending,
    saved: state.ui.newQuestion.saved
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => {
      dispatch(categoryActions.fetchCategories());
    },
    saveQuestion: (question) => {
      dispatch(questionActions.saveQuestionStart(question));
    },
    redirectOnSent: () => {
      dispatch(uiNewQuestionActions.redirectStart());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewQuestion);
