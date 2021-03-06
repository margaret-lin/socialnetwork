export default function reducer(
    state = { onlineUsers: [], notification: [] },
    action
) {
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

    if (action.type == "ONLINE_USERS") {
        state = {
            ...state,
            onlineUsers: action.onlineUsers
        };
    }

    if (action.type == "CONNECTED_USER") {
        state = {
            ...state,
            onlineUsers: [...state.onlineUsers, action.connectedUser]
        };
    }

    if (action.type == "DISCONNECT_USER") {
        state = {
            ...state,
            onlineUsers: state.onlineUsers.filter(
                user => user.id != action.disconnectUser
            )
        };
    }

    if (action.type == "SHOW_NOTIFICATION") {
        state = {
            ...state,
            notification: [...state.notification, action.user]
        };
    }

    return state;
}
