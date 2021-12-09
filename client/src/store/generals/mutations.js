export function loginStart (state) {
  state.loggingIn = true
}
export function loginStop (state, errorMessage) {
  state.loggingIn = false
  state.loginError = errorMessage
}

export function updateAccessToken (state, sessionInfo) {
  if (sessionInfo) {
    state.sessionInfo = sessionInfo
    // state.userFullName = sessionInfo.name + ' ' + sessionInfo.lastName
  } else {
    state.sessionInfo = {}
  }
}
export function logout (state) {
  state.userInfo = {}
}
export function setCurrentModule (state, payload) {
  state.currentModel = payload.currentModel
  state.currentModule = payload.currentModule
}
export function googleBtnShow (state) {
  state.isContacts = true
}

export function googleBtnHide (state) {
  state.isContacts = false
}

export function tabInfoSales (state) {
  state.listCustomerInfo = true
}

export function tabInfoDependents (state) {
  state.listCustomerInfo = false
}

export function showAll (state) {
  state.customShowListable = 'Todos'
}

export function showNextMonth (state) {
  state.customShowListable = 'Mes Siguiente'
}

export function showCurrentMonth (state) {
  state.customShowListable = 'Mes Actual'
}
export function login (state, sessionInfo) {
  localStorage.setItem('sessionInfo', JSON.stringify(sessionInfo))
  state.sessionInfo = sessionInfo
}
