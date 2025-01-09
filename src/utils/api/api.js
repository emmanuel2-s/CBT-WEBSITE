// import superagentPromise from 'superagent-promise';
// import _superagent, { patch, search } from 'superagent';
// import { notifyError } from '../toaster';

// const superagent = superagentPromise(_superagent, window.Promise);

// export const API_ROOT = "https://localhost:7027/api/"; //https://localhost:7027/swagger/index.html
// export const INITIAL_API_ROOT = "https://localhost:7027/";
// // export const API_ROOT = process.env.REACT_APP_API_URL;
// // export const INITIAL_API_ROOT = process.env.REACT_APP_INITIAL_API_URL;

// let token = null;
// const responseBody = (res) => res.body;

// // const getAuthToken = () => {
// //   const auth = JSON.parse(window.sessionStorage.getItem('auth'));
// //   const auth2 = auth ? auth : JSON.parse(window.localStorage.getItem('oldAuth'));
// //   const token = auth2 ? auth2.token : null;
// //   return token;
// // }

// const getAuthToken = () => {
//     const auth = JSON.parse(window.sessionStorage.getItem('auth'));
//     const token = auth ? auth.token : null;
//     return token;
// }

// export const tokenPlugin = req => {
//     req.set('Accept', 'application/json');
//     token = getAuthToken();

//     req.set("ngrok-skip-browser-warning", true)

//     if (token) {
//         req.set('Authorization', `Bearer ${token}`);
//     }

//     req.on('error', (error) => {
//         // if (error.status === undefined) {
//         //
//         // alert(error)
//         console.log(error)
//         // }

//     });

//     req.on('response', function (res) {
//         if (res.status === 401) {
//             // redirect to login page here
//             window.sessionStorage.removeItem('auth')
//             token = null;
//             // localStorage.setItem("lastAccessedUrl", window.location.pathname);
//             window.location.href = `${window.location.origin}/home`;
//         }
//         if (res.body.error) {
//             notifyError(res.body.errorMessage);
//         }

//         if (res.body?.message && Array.isArray(res.body.message) && res.body.message.length > 0) {
//             notifyError(res.body.message.join(", "));
//         }
//     });

// }

// const requests = {
//     del: url =>
//         superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
//     get: url =>
//         superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
//     put: (url, body) =>
//         superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
//     post: (url, body) =>
//         superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
//     patch: (url, body) =>
//         superagent.patch(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
// };


// const Auth = {
//     logError: (data) =>
//         requests.post('log/error', { data }),
//     isAuth: () => {
//         const token = getAuthToken();
//         return !!token;
//     },
//     saveAdminAuthData: (_user) => {
//         window.sessionStorage.setItem('auth', JSON.stringify(_user));
//         token = _user.token;
//     },
//     saveAuthData: (_user) => {
//         window.sessionStorage.setItem('auth', JSON.stringify(_user));
//         const Selectedlocation = { locationId: _user?.location[0]?.id, locationName: _user?.location[0]?.locationName }
//         window.localStorage.setItem("selectedLocation", JSON.stringify(Selectedlocation));
//         token = _user.token;
//     },

//     logout: () => {
//         window.sessionStorage.removeItem('auth')
//         token = null
//     },

//     currentUser: () => JSON.parse(window.sessionStorage.getItem('auth')),

//     login: (username, password) =>
//         requests.put('Account/login', { username, password }),
//     register: (data) =>
//         requests.post('Account/register', data),
// }


// const User = {
//     save: (data) =>
//         requests.post('auth/create/new/user', data),
//     load: (page, limit, search) =>
//         requests.get(`auth/get/alluser/?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`),
//     view: (id) =>
//         requests.get(`auth/get/singleuser/${id}`),
//     edit: (id, data) =>
//         requests.patch(`auth/edit/user/${id}`, data),
//     disable: (id) =>
//         requests.patch(`auth/disableuser/${id}`),
//     enable: (id) =>
//         requests.patch(`auth/enableUser/${id}`),
// }


// const api = {
//     Auth,
//     User,
// }

// export default api;




import superagentPromise from "superagent-promise";
import _superagent from "superagent";
import axios from "axios";
import { notifyError, notifySuccess } from "../toaster";

const superagent = superagentPromise(_superagent, window.Promise);
// export const API_ROOT = "https://localhost:7027/api/";
export const API_ROOT = "/api";

let token = null;
const responseBody = (res) => res.body;

const getAuthToken = () => {
    const auth = JSON.parse(window.localStorage.getItem("auth"));
    const token = auth ? auth.token : null;
    return token;
};

export const tokenPlugin = (req) => {
    req.set("Accept", "application/json,application/octet-stream");
    token = getAuthToken();

    if (token) {
        req.set("Authorization", `Bearer ${token}`);
    }

    req.on("error", (error) => {
        if (error.status === undefined) {
            //
        }
    });

    req.on("response", function (res) {
        if (res.status === 200) {
            console.log({ res });

            // notifySuccess(res.body.message);
        }

        if (res.status === 401) {
            // redirect to login page here
            localStorage.clear();
            localStorage.setItem("lastAccessedUrl", window.location.pathname);
            window.location.href = `${window.location.origin}/`;
            window.localStorage.removeItem("auth");
        }

        if (res.status === 403) {
            // redirect to access deny page
            notifyError(res.body.errorMessage);
            window.location.href = `${window.location.origin}/403`;
        }

        if (res.body.error) {
            notifyError(res.body.message);
        }

        if (res.body.code === "SUCCESS" && req.method === "POST") {
            notifySuccess(res.body.message);
        }

        if (
            res.body?.message &&
            Array.isArray(res.body.message) &&
            res.body.message.length > 0
        ) {
            notifyError(res.body.message.join(", "));
        }
    });
};

const requests = {
    del: (url) =>
        superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    getQuery: (url, queryParams) =>
        superagent
            .get(`${API_ROOT}${url}`)
            .query(queryParams)
            .responseType("blob")
            .use(tokenPlugin),
    getQueryParams: (url, queryParams) =>
        superagent
            .get(`${API_ROOT}${url}`)
            .query(queryParams)
            .use(tokenPlugin)
            .then(responseBody),
    get: (url) =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    put: (url, body) =>
        superagent
            .put(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .then(responseBody),
    post: (url, body) =>
        superagent
            .post(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .then(responseBody),
    patch: (url, body) =>
        superagent
            .patch(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .then(responseBody),
};

const Auth = {
    isAuth: () => {
        const token = getAuthToken();
        return !!token;
    },
    saveAuthData: (data) => {
        window.localStorage.setItem("auth", JSON.stringify(data));
        token = data.token;
    },

    logout: () => {
        window.localStorage.removeItem("auth");
        window.location.reload();
        window.location.href = `${window.location.origin}/`;
    },

    currentUser: () => JSON.parse(window.localStorage.getItem("auth")),
    register: (data) => requests.post("/Account/register", data),
    login: (data) => requests.put("/Account/login", data),
    addRole: (name) => requests.post("/Account/add-role", { name }),
    getRoles: () => requests.get("/Account/all-roles")
};


const arms = {
    create: (data) => requests.post("/Arms", data),
    getAllArms: () => requests.get("/Arms"),
    getArmsById: (id) => requests.get(`/Arms/${id}`),
    updateArms: (id, data) => requests.put(`/Arms/${id}`, data),
    delete: (id) => requests.del(`/Arms/${id}`)
}

const classLevel = {
    create: (data) => requests.post("/ClassLevel", data),
    getAllClass: () => requests.get("/ClassLevel"),
    getClassById: (id) => requests.get(`/ClassLevel/${id}`),
    updateclass: (id, data) => requests.put(`/ClassLevel/${id}`, data),
    delete: (id) => requests.del(`/ClassLevel/${id}`)
}

const user = {
    load: () => requests.get("/users"),
    create: (data) => requests.post("/users", data),
    changePassword: (data) => requests.post("/users/change-password", data),
    resetPassword: (id, data) =>
        requests.post(`/users/${id}/reset-password`, data),
    del: (id) => requests.del(`/users/${id}`),
    isActive: (id, active, data) =>
        requests.put(`/users/${id}?active=${active}`, data),
};

const api = {
    Auth,
    user,
    arms,
    classLevel
};

export default api;
