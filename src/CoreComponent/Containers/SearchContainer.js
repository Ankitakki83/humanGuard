import { connect } from "react-redux";
import SearchComponent from "../Components/SearchComponent";
import { searchProduct } from "../Actions/SearchAction";
import { withRouter } from "react-router-dom";
import { displayToast } from "../../Toast/Actions/ToastAction";
const mapDispatchToProps = dispatch => {
  return {
    searchProduct: value => {
      dispatch(searchProduct(value));
    },
    displayToast: message => {
      return dispatch(displayToast(message));
    }
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  };
};

const SearchContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchComponent)
);

export default SearchContainer;
