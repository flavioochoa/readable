import * as types from './Types';

export function set_categories (categories) {
    return {
        type: types.SET_CATEGORIES, 
        categories
    }
}

export function set_current_category(category) {
    return {
        type: types.SET_CURRENT_CATEGORY,
        category
    }
}