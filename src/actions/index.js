

//export const GET_ALL_Qs = 'get_all_qs';
//export const GET_CATEGORY_Qs = 'get_category_questions';
//export const SEARCH_KEYWORD = 'search_keyword';
//export const GET_ANSWER = 'get_answer';
//export const UPDATE_ANSWER = 'update_answer';
//export const CREATE_QUESTION = 'create_question';
export const GET_USERS = 'get_users';
export const UPDATE_USER = 'update_user';
export const ADD_USER = 'add_user';
export const DELETE_USER = 'delete_user';
export const REQUEST_USER_DATA = 'request_user_data';
export const GET_HOME_PAGE = 'get_home_page';
export const HOME_PAGE_REQUEST = 'home_page_request';
export const GET_CURRENT_USER = 'get_current_user';
//export const REQUESTING_CURRENT_USER = 'requesting_current_user';
export const REQUEST_CATEGORIES = 'category_request';
export const GET_CATEGORIES = 'get_categories';
export const TOGGLE_CATEGORY = 'toggle_category';
//export const ADD_CATEGORY = 'add_categry';
//export const DELETE_CATEGORY = 'delete_category';
export const SET_CURRENT_CATEGORY = 'set_current_category';

const api_root = "http://localhost:60824/api";

//export function getAllQs() {

//}

//export function getCategory(category) {

//}

//export function searchKeyword(keyword) {

//}

//export function getAnswer(id) {

//}

//export function updateAnswer(id, question) {

//}

//export function createQuestion(question) {

//}

function return_users(json) {
    return {
        type: GET_USERS,
        payload: json
    };
}

function request_users() {
    return {
        type: REQUEST_USER_DATA
    };
}


export function get_users() {

    return function (dispatch) {
        dispatch(request_users());

        return fetch(api_root + "/People")
            .then(
                response => response.json(),
                error => console.log('An error occurred', error)
            )
            .then(json =>
                dispatch(return_users(json))
            );
    };
}

function confirm_add(user) {
    return {
        type: ADD_USER,
        payload: user
    };
}

export function add_user(user) {
    return function (dispatch) {
        dispatch(request_users());

        return fetch(api_root + "/People", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            credentials: "include",
            body: JSON.stringify(user)
        })
            .then(
                response => response.json(),
                error => console.log('An error occurred', error)
            )
            .then(() =>
                dispatch(confirm_add(user))
            );
    };
}

function confirm_update(user) {
    return {
        type: UPDATE_USER,
        payload: user
    };
}

export function update_user(user) {
    return function (dispatch) {
        dispatch(request_users());

        return fetch(api_root + "/People?id=" + user.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            credentials: "include",
            body: JSON.stringify(user)
        })
            .then(
                response => console.log('response', response.json()),
                error => console.log('An error occurred', error)
            )
            .then(() =>
                dispatch(confirm_update(user))
            );
    };
}

function return_homepage(json) {
    return {
        type: GET_HOME_PAGE,
        payload: json
    };
}

function request_homepage() {
    return {
        type: HOME_PAGE_REQUEST
    };
}

export function get_homepage() {

    return function (dispatch) {
        dispatch(request_homepage());

        return fetch(api_root + "/Data")
            .then(
                response => response.json(),
                error => console.log('An error occurred', error)
            )
            .then(json =>
                dispatch(return_homepage(json))
            );
    };
}

export function update_homepage(data) {
    return function (dispatch) {
        dispatch(request_homepage());

        fetch(api_root + "/Data/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            credentials: "include",
            body: JSON.stringify(data)
        })
        .then(
            response => console.log('response', response.json()),
            error => console.log('An error occurred', error)
        ).then(json => {
            console.log(json);
            dispatch(return_homepage(data));
        });

    };
}

function fetched_currentUser(json) {
    return {
        type: GET_CURRENT_USER,
        payload: json
    };
}

export function get_currentUser() {

    return function (dispatch) {
        
        return fetch(api_root + "/User", { credentials: "include" })
            .then(
                response => response.json(),
                error => console.log('An error occurred', error)
            )
            .then(json =>
                dispatch(fetched_currentUser(json))
        );

    };
}

function return_cats(json) {
    return {
        type: GET_CATEGORIES,
        payload: json
    };
}

function request_cats() {
    return {
        type: REQUEST_CATEGORIES
    };
}

export function get_cats() {

    return function (dispatch) {
        dispatch(request_cats());

        return fetch(api_root + "/Category")
            .then(
                response => response.json(),
                error => console.log('An error occurred', error)
            )
            .then(json =>
                dispatch(return_cats(json))
            );
    };
}

export function toggle_cats(id) {
    return {
        type: TOGGLE_CATEGORY,
        payload: id
    };
}

export function create_cat(parent, name) {
    return function (dispatch) {
        dispatch(request_cats());

        const data = { parent: parent, categoryName: name };
        return fetch(api_root + "/Category/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            credentials: "include",
            body: JSON.stringify(data)
        })
            .then(
                response => console.log(response.json()),
                error => console.log('An error occurred', error)
            )
            .then(json => {
                console.log(json);
                dispatch(get_cats());
            });
    };
}

export function delete_cat(categoryId) {
    return function (dispatch) {
        dispatch(request_cats());

        return fetch(api_root + "/Category/" + categoryId, {
            method: "DELETE",
            credentials: "include"
        })
            .then(
                response => console.log(response.json()),
                error => console.log('An error occurred', error)
            )
            .then(json => {
                console.log(json);
                dispatch(get_cats());
            });
    };
}

export function current_cat(categories) {
    return {
        type: SET_CURRENT_CATEGORY,
        payload: categories
    };
}