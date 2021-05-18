import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ShowPrice from "./ShowPrice";
import { getCurrenciesList } from "../HeaderFooter/Actions/HeaderAction";

const mapDispatchToProps = dispatch => {
  return {};
};
const mapStateToProps = (state, ownProps) => {
  return {
    currenciesList: state.headerReducer.currenciesList,
    ...ownProps
  };
};
const ShowPriceContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ShowPrice)
);
export default ShowPriceContainer;
