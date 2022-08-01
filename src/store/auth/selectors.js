export function selectActiveUser(state) {
  return state.auth.activeUser;
}

export function selectIsAuthenticated(state) {
  return !!state.auth.token;
}

export function selectRegistrationErrors(state) {
  return state.auth.registrationErrors;
}
export function selectLoginError(state) {
  return state.auth.loginError;
}
