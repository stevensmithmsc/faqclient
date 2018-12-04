

//export const GET_ALL_Qs = 'get_all_qs';
//export const GET_CATEGORY = 'get_category';
//export const SEARCH_KEYWORD = 'search_keyword';
//export const GET_ANSWER = 'get_answer';
//export const UPDATE_ANSWER = 'update_answer';
//export const CREATE_QUESTION = 'create_question';
export const GET_USERS = 'get_users';
export const UPDATE_USER = 'update_user';
export const ADD_USER = 'add_user';
export const DELETE_USER = 'delete_user';
export const REQUEST_USER_DATA = 'request_user_data';

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