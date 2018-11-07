import mapKeys from 'lodash/mapKeys';
import { FETCH_POST, FETCH_POSTS } from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_POST:
            const post = action.paylod;
            return { ...state, [post.id]: post };
        case FETCH_POSTS:
            return { ...state, ...mapKeys(action.paylod, '_id') }
        default:
            return state;
    }
}