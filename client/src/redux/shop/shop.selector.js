import {createSelector} from "reselect";

const selectorShop = state => state.shop;

export const selectShopCollections = createSelector(
	[selectorShop],
	shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
	[selectShopCollections],
	collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam => createSelector(
	[selectShopCollections],
	collections => (collections ? collections[collectionUrlParam] : null)
);

export const selectIsCollectionLoaded = createSelector(
	[selectorShop],
	shop => !(!!shop.collections)
);

export const selectIsCollectionFetching = createSelector(
	[selectorShop],
	shop => shop.isFetching
);

