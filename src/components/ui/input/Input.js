import React, { Component } from 'react';

class Input extends Component {

    shouldComponentUpdate(nextProps) {
        if (nextProps.value !== this.props.value) {
            return true;
        }
        if (nextProps.loading !== this.props.loading) {
            return true;
        }
        if (nextProps.touched !== this.props.touched) {
            return true;
        }
        if (nextProps.dirty !== this.props.dirty) {
            return true;
        }
        if (nextProps.errors.length !== this.props.errors.length) {
            return true;
        }

        return false;
    }

    render() { 

        let inputClasses = ['input'];
        if (this.props.errors.length > 0 && this.props.touched) {
            inputClasses.push('is-danger');
        }

        if (this.props.errors.length === 0 && this.props.touched && this.props.dirty) {
            inputClasses.push('is-success');
        }

        let errorMessages = null;

        if (this.props.errors.length > 0) {
            errorMessages = this.props.errors.map(error => {

                let errorString = 'The ' + this.props.label.toLowerCase();
                if (error === 'minLength') {
                    errorString += ` should contain at least ${this.props.rules[error]} characters`
                }
                if (error === 'required') {
                    errorString += ' is required';
                }
                if (error === 'email') {
                    errorString += ' is not a valid email address'
                }

                return (
                    <p className="help is-danger" key={error}>
                        {errorString}
                    </p>
                );
            })
        }

        let canShowErrors = this.props.errors.length > 0 && this.props.touched;

        let iconLeft = null;
        let controlClass = 'control';
        
        if (this.props.type === 'email') {
            controlClass = 'control has-icons-left';
            iconLeft = (
                <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                </span>
            );
        }
        if (this.props.type === 'password') {
            controlClass = 'control has-icons-left';
            iconLeft = (
                <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                </span>
            );
        }

        return (
            <div className="field">
                <label className="label">{this.props.label}</label>
                <div className={controlClass}>
                    <input
                        className={inputClasses.join(' ')}
                        type={this.props.type}
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                        onChange={this.props.onChangeHandler}
                        onBlur={this.props.onBlurHandler}
                        value={this.props.value}
                        disabled={this.props.loading}
                    />
                    {iconLeft}
                </div>
                {canShowErrors ? errorMessages : null}
            </div>
        );
    }
}
 
export default Input;
