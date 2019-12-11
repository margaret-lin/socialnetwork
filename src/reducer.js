export default function reducer(state = {}, action) {
    console.log("before state: ,", state);

    if (action.type == "RECEIVE_FRIENDS") {
        state = {
            ...state,
            friends: action.friends
        };
    }

    if (action.type == "ACCEPT_FRIENDS") {
        state = {
            ...state,
            friends: state.friends.map(user => {
                if (user.id == action.id) {
                    return {
                        ...user,
                        accepted: true
                    };
                } else {
                    return user;
                }
            })
        };
    }

    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            friends: state.friends.filter(user => user.id != action.id)
        };
    }

    if (action.type == "LOAD_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.chatMessages
        };
    }

    // if (action.type == "UPDATE_MESSAGES") {
    //     // let messages = state.chatMessages;
    //     // messages.push(action.newMessage);

    //     state = {
    //         ...state,
    //         chatMessages: action.chatMessages
    //     };
    // }

    console.log("after state: ,", state);

    return state;
}
