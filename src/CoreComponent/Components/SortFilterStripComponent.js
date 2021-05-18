import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import styles from "./css/SortFilterStripComponent.css";
import LabelWithIcon from "../../general/IconWithLabel";
import CoreMessages from "../../Mpp/Messages/MppMessage";
import Icon from "../../general/Icon";
import MobileFilter from "../../FilterComponent/Components/MobileFilter";
import {
  PUBLIC_IMAGES_PATH,
  GRID_VIEW,
  LIST_VIEW,
  VIEW_PRODUCT
} from "../../Utils/Constants";
import SortModalComponent from "../../FilterComponent/Components/SortModalComponent";

export default class SortFilterStripComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      showFilterModal: false,
      showSort: false
    };
  }
  toggleFilterModal = () => {
    this.setState(prevState => ({
      showFilterModal: !prevState.showFilterModal
    }));
  };

  onClickSort = () => {
    this.setState(prevState => ({ showSort: !prevState.showSort }));
  };

  toggleProductView = () => {
    let viewOfProduct =
      this.props.productView === GRID_VIEW ? LIST_VIEW : GRID_VIEW;
    localStorage.setItem(VIEW_PRODUCT, viewOfProduct);
    if (this.props.onChangeProductView) {
      this.props.onChangeProductView(viewOfProduct);
    }
  };
  outSIdeClickOnSortModal = e => {
    if (!this.sortModalRef.contains(e.target)) {
      this.setState({ showSort: false });
    }
  };
  closeSortModal = () => {
    this.setState({ showSort: false });
  };
  render() {
    return (
      <div className={styles.base}>
        {this.state.showFilterModal && (
          <MobileFilter
            items={this.props.filters}
            closeFilterModal={this.toggleFilterModal}
            history={this.props.history}
            location={this.props.location}
            getUpdatedFilters={this.props.getUpdatedFilters}
            clearTempFilters={this.props.clearTempFilters}
            currenciesList={this.props.currenciesList}
          />
        )}
        <div className={styles.labelWrapper}>
          <LabelWithIcon
            icon={<Icon image={`${PUBLIC_IMAGES_PATH}/Filter.svg`} size={12} />}
            label={<FormattedMessage {...CoreMessages.filterStrip} />}
            onClick={() => this.toggleFilterModal()}
            fontSize={14}
          />
        </div>
        <div className={styles.labelWrapper}>
          <LabelWithIcon
            icon={<Icon image={`${PUBLIC_IMAGES_PATH}/sort.svg`} size={12} />}
            label={<FormattedMessage {...CoreMessages.sortStrip} />}
            onClick={() => this.onClickSort()}
            fontSize={14}
          />
        </div>
        <div className={styles.labelWrapper}>
          <LabelWithIcon
            icon={
              this.props.productView == LIST_VIEW ? (
                <Icon image={`${PUBLIC_IMAGES_PATH}/Listview.svg`} size={12} />
              ) : (
                <Icon image={`${PUBLIC_IMAGES_PATH}/grid.svg`} size={12} />
              )
            }
            label={
              this.props.productView == LIST_VIEW ? (
                <FormattedMessage {...CoreMessages.viewListStrip} />
              ) : (
                <FormattedMessage {...CoreMessages.viewGridStrip} />
              )
            }
            onClick={() => this.toggleProductView()}
            fontSize={14}
          />
        </div>
        {this.state.showSort && (
          <div
            className={styles.sortModal}
            onClick={e => this.outSIdeClickOnSortModal(e)}
          >
            <div ref={element => (this.sortModalRef = element)}>
              <SortModalComponent
                history={this.props.history}
                location={this.props.location}
                closeSortModal={this.closeSortModal}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

SortFilterStripComponent.propTypes = {
  onClickFilter: PropTypes.func,
  onClickSort: PropTypes.func,
  toggleProductView: PropTypes.func,
  productView: PropTypes.oneOf([GRID_VIEW, LIST_VIEW])
};
