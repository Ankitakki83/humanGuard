import { connect } from "react-redux";
import SocialShare from "../Components/SocialShare";
import { showModal } from "../../Modals/Actions/ModalAction";
const mapDispatchToProps = dispatch => {
  return {
    showModal: modalType => {
      dispatch(showModal(modalType));
    }
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  };
};
const SocialShareContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialShare);
export default SocialShareContainer;
