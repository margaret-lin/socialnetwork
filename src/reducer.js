export default function reducer(state = {}, action) {
    console.log("state: ,", state);

    if (action.type == "RECEIVE_FRIENDS") {
        state = {
            ...state,
            friends: action.friends
        };
    }

    if (action.type == "ACCEPT_FRIENDS") {
        state = {
            ...state,
            accepted: action.accepted
        };
    }

    if (action.type == "UNFRIEND") {
        state = {
            ...state
        };
    }

    return state;
}
