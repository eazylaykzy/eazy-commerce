import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import {selectIsCollectionLoaded} from "../../redux/shop/shop.selector";
import WithSpinner from '../../components/with-spinners/with-spinners';
import CollectionPage from './collection';

const mapStateToProps = createStructuredSelector({
	isLoading: selectIsCollectionLoaded
});

const CollectionPageContainer = connect(mapStateToProps)(WithSpinner(CollectionPage));

export default CollectionPageContainer;