import {NameSpace} from '../../const';
import {Nullable, State} from '../../types/state';
import {Offer, Offers} from '../../types/offer';
import {City} from '../../types/city';
import {Comments} from '../../types/comment';

export const getOffers = (state: State): Offers => state[NameSpace.Offer].offers.items;
export const getOffersCount = (state: State): number => state[NameSpace.Offer].offers.items.length;
export const getOffersLoadingStatus = (state: State): boolean => state[NameSpace.Offer].offers.loading;
export const getOffer = (state: State): Nullable<Offer> => state[NameSpace.Offer].offer.data;
export const getOfferLoadingStatus = (state: State): boolean => state[NameSpace.Offer].offer.loading;
export const getCity = (state: State): City => state[NameSpace.Offer].city;
export const getHoverCardId = (state: State): number => state[NameSpace.Offer].hoverCardId;
export const getComments = (state: State): Comments => state[NameSpace.Offer].offerComments.items;
export const getOffersNearby = (state: State): Offers => state[NameSpace.Offer].offersNearby.items;