import React from "react";
import PropTypes from "prop-types";
const validatorCreator = (Component, errorFunc, ErrorComponent) => {
  return class ValidatedClass extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hasError: false
      };
    }
    componentDidMount() {
      const hasError = errorFunc(this.props.value);
      if (hasError) {
        this.setState({ hasError: true });
        if (this.props.onInvalid) {
          this.props.onInvalid(this.props.value);
        }
      } else {
        this.setState({ hasError: false });
        if (this.props.onValid) {
          this.props.onValid(this.props.value);
        }
      }
    }

    componentDidUpdate(prevProps) {
      if (prevProps.value !== this.props.value) {
        const hasError = errorFunc(this.props.value);
        if (hasError) {
          this.setState({ hasError: true });
          if (this.props.onInvalid) {
            this.props.onInvalid(this.props.value);
          }
        } else {
          this.setState({ hasError: false });
          if (this.props.onValid) {
            this.props.onValid(this.props.value);
          }
        }
      }
    }

    render() {
      return (
        <React.Fragment>
          <Component {...this.props} />
          {this.state.hasError === true ? <ErrorComponent /> : null}
        </React.Fragment>
      );
    }
  };
};

validatorCreator.propTypes = {
  handlerName: PropTypes.string
};

export default validatorCreator;
