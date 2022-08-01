export function selectActiveUser(state) {
  return state.auth.activeUser;
}

export function selectIsAuthenticated(state) {
  return !!state.auth.token;
}
