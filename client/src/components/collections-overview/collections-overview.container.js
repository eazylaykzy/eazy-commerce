import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import {selectIsCollectionFetching} from "../../redux/shop/shop.selector";
import WithSpinner from '../with-spinners/with-spinners';
import CollectionsOverview from './collections-overview';

const mapStateToProps = createStructuredSelector({
	isLoading: selectIsCollectionFetching
});

const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview));

export default CollectionsOverviewContainer;