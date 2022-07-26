export function selectActiveUser(state){
    return state.auth.activeUser;
}

export function IsAuthenticated(state){
    return !!state.auth.token;
}