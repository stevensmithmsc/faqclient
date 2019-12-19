
export const REQUESTING_QUESTIONS = 'requestingQuestions';
export const SET_SEARCHSTRING = 'setSearchString';
export const RECIEVED_PAGE = 'receivedPageOfQuestions';
export const GET_ANSWER = 'get_answer';
export const UPDATE_ANSWER = 'update_answer';
export const CREATE_QUESTION = 'create_question';
export const DELETE_QUESTION = 'delete_question';
export const FEEDBACK_USEFUL = 'set_useful_feedback';
export const FEEDBACK_COMMENT = 'set_feedback_comment';
export const GET_FEEDBACK = 'get_feedback';
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
export const UPLOAD_IMAGE = 'upload_image_success';
export const UPLOAD_FAILED = 'upload_image_failure';
export const RECIEVE_IMAGES = 'recieve_image_details';
export const REQUESTING_REPORT_DATA = 'request_report_data';
export const UPDATE_SYSTEM_REP_DATA = 'update_system_report_data';
export const UPDATE_CATS_REP_DATA = 'update_categories_report_data';
export const UPDATE_SYS_AUTH_REP_DATA = 'update_system_and_author_report_data';
export const UPDATE_AUTH_REP_DATA = 'update_users_report_data';
export const TOGGLE_SEARCH_CATS = 'toggle_search_within_categories';

const api_root = process.env.REACT_APP_API;

function request_questions() {
    return {
        type: REQUESTING_QUESTIONS
    };
}

function return_questions(json) {
    return {
        type: RECIEVED_PAGE,
        payload: json
    };
}

export function update_searchstring(cats, keyword) {
    return {
        type: SET_SEARCHSTRING,
        payload: { cats, keyword }
    };
}

export function get_page(pageNum, searchString = "") {
    return function (dispatch) {
        dispatch(request_questions());
        console.log("Search String:", searchString);
        let queryTerms = searchString.split("&");
        if (pageNum !== 1) {
            queryTerms.push("page=" + pageNum);
        }
        queryTerms = queryTerms.filter(t => t !== "" && t !== null);
        console.log("Query Terms:", queryTerms);
        const queryString = queryTerms.length > 0 ? "?" + queryTerms.join("&") : "";
        console.log("Query String:", queryString);
        const url = api_root + '/Questions' + queryString;
        console.log("Url:", url);
        return fetch(url)
            .then(
                response => response.json(),
                error => console.log('An error occurred', error)
            )
            .then(json =>
                dispatch(return_questions(json))
            );
    };
}

export function get_background_page(pageNum, searchString = "") {
    return function (dispatch) {

        let queryTerms = searchString.split("&");
        if (pageNum !== 1) {
            queryTerms.push("page=" + pageNum);
        }
        queryTerms = queryTerms.filter(t => t !== "" && t !== null);

        const queryString = queryTerms.length > 0 ? "?" + queryTerms.join("&") : "";
        const url = api_root + '/Questions' + queryString;

        return fetch(url)
            .then(
                response => response.json(),
                error => console.log('An error occurred', error)
            )
            .then(json =>
                dispatch(return_questions(json))
            );
    };
}

function returnAnswer(json) {
    return {
        type: GET_ANSWER,
        payload: json
    };
}

export function getAnswer(id) {
    return function (dispatch) {
        return fetch(api_root + "/Questions/" + id, { credentials: "include" })
            .then(
                response => response.json(),
                error => console.log('An error occurred', error)
            )
            .then(json =>
                dispatch(returnAnswer(json))
            );
    };
}

function confirmQuestionUpdate(question) {
    return {
        type: UPDATE_ANSWER,
        payload: question
    };
}

export function updateAnswer(question) {
    return function (dispatch) {
        fetch(api_root + "/Questions/" + question.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            credentials: "include",
            body: JSON.stringify(question)
        })
            .then(
                response => console.log('Response', response.json()),
                error => console.log('An error occurred', error)
            )
            .then(() =>
                dispatch(confirmQuestionUpdate(question))
            );
    };
}

function confirmNewQuestion(question) {
    return {
        type: CREATE_QUESTION,
        payload: question
    };
}

export function createQuestion(question) {
    return function (dispatch) {
        fetch(api_root + "/Questions/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            credentials: "include",
            body: JSON.stringify(question)
        })
            .then(
                response => response.json(),
                error => console.log('An error occurred', error)
            )
            .then(json =>
                dispatch(confirmNewQuestion(json))
            );
    };
}

function confirmQuestionDeletion(question) {
    return {
        type: DELETE_QUESTION,
        payload: question.id
    };
}

export function deleteQuestion(question) {
    return function (dispatch) {
        fetch(api_root + "/Questions/" + question.id, {
            method: "DELETE",
            credentials: "include"
        })
            .then(
                response => console.log('Response', response.json()),
                error => console.log('An error occurred', error)
            )
            .then(() =>
                dispatch(confirmQuestionDeletion(question))
            );
    };
}

function confirmUsefulness(id, isHelpful) {
    return {
        type: FEEDBACK_USEFUL,
        payload: { id, isHelpful }
    };
}

export function feedbackUseful(id, isHelpful) {
    return function (dispatch) {
        const feedback = { id, helpful: isHelpful===1 };
        fetch(api_root + "/Feedback/" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            credentials: "include",
            body: JSON.stringify(feedback)
        })
            .then(
                response => console.log('Response', response.json()),
                error => console.log('An error occurred', error)
            )
            .then(() =>
                dispatch(confirmUsefulness(id, isHelpful))
            );
    };    
}

function confirmComment(id, isHelpful, comment) {
    return {
        type: FEEDBACK_COMMENT,
        payload: { id, isHelpful, comment }
    };
}

export function feedbackComment(id, isHelpful, comment) {
    return function (dispatch) {
        const feedback = { id, helpful: isHelpful === 1, comment };
        fetch(api_root + "/Feedback/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            credentials: "include",
            body: JSON.stringify(feedback)
        })
            .then(
                response => console.log('Response', response.json()),
                error => console.log('An error occurred', error)
            )
            .then(() =>
                dispatch(confirmComment(id, isHelpful, comment))
            );
    };
}

function return_feedback(json) {
    return {
        type: GET_FEEDBACK,
        payload: json
    };
}

export function get_feedback(id) {
    return function (dispatch) {
        fetch(api_root + "/Feedback/" + id, { credentials: "include" })
            .then(
                response => response.json(),
                error => console.log('An error occurred', error)
            )
            .then(json =>
                dispatch(return_feedback(json))
            );
    };
}

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
        console.log(user);
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

function uploadSuccess(data) {
    return {
        type: UPLOAD_IMAGE,
        payload: data
    };
}

function uploadFail(error) {
    return {
        type: UPLOAD_FAILED,
        payload: error
    };
}

export function uploadDocumentRequest(image, caption) {
    let data = new FormData();
    data.append('UploadedImage', image, image.name);
    data.append('Caption', caption);

    return (dispatch) => {
        fetch(api_root + '/Image', {
            method: 'POST',
            body: data
        }).then(
            response => response.json(),
            error => dispatch(uploadFail(error))
        ).then(json => dispatch(uploadSuccess(json)));
 
    };
}

function recieveImages(data) {
    return {
        type: RECIEVE_IMAGES,
        payload: data
    };
}

export function getImages() {
    return (dispatch) => {
        fetch(api_root + '/Image')
         .then(
            response => response.json(),
            error => console.log('An error occurred', error)
        ).then(json => dispatch(recieveImages(json)));

    };
}

function requestReportData() {
    return {
        type: REQUESTING_REPORT_DATA
    };
}

function updateSystemReportData(data) {
    return {
        type: UPDATE_SYSTEM_REP_DATA,
        payload: data
    };
}

function updateCatReportData(data) {
    return {
        type: UPDATE_CATS_REP_DATA,
        payload: data
    };
}

function updateSysAuthReportData(data) {
    return {
        type: UPDATE_SYS_AUTH_REP_DATA,
        payload: data
    };
}

function updateAuthReportData(data) {
    return {
        type: UPDATE_AUTH_REP_DATA,
        payload: data
    };
}

export function getReportData(repNo) {
    return (dispatch) => {
        dispatch(requestReportData());
        fetch(api_root + "/Report/" + repNo, { credentials: "include" })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                console.log(response);
                throw new Error(`${response.status}: ${response.statusText}`);
            })
            .then(json => {
                switch (repNo) {
                    case 2:
                        dispatch(updateSystemReportData(json));
                        break;
                    case 3:
                        dispatch(updateCatReportData(json));
                        break;
                    case 4:
                        dispatch(updateSysAuthReportData(json));
                        break;
                    case 7:
                        dispatch(updateAuthReportData(json));
                        break;
                    default:
                        console.log(json);
                }
            })
            .catch(error => console.error(error));
    };
    
}

export function toggleSearchWithinCat(searchCats) {
    return {
        type: TOGGLE_SEARCH_CATS,
        payload: searchCats
    };
}
