import axios from "axios";
// import { type } from "express/lib/response";

export const GET_USER = "GET_USER";

export const getUser = (uid) => {
    console.log("uid on user.action : " + uid);
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};
