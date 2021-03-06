// @flow
// import splitsterInit, {
//   server as serverInit,
//   SplitsterClient,
//   SplitsterServer,
// } from 'splitster'

import { init } from 'splitster'

import type { Action } from './actions'

/**
 * Create server (serverInit)
 * then change from server (server splitster)
 * to save (SaveResults)
 * and then to client (client splitster)
 */
const splitsterReducer = (
  state: SplitsterClient | SaveResults | SplitsterServer = {},
  action: Action,
) => {
  switch (action.type) {
    case 'splitster/INIT_SERVER':
      // $FlowFixMe
      return init(
        action.payload.config,
        action.payload.user,
        action.payload.userId,
        action.payload.def || state,
      )
    case 'splitster/INIT_CLIENT':
      // $FlowFixMe
      return init(
        action.payload.config,
        action.payload.user,
        action.payload.userId,
        state,
      )
    case 'splitster/SERVER_TO_SAVE':
    case 'splitster/CLIENT_TO_SAVE':
      // $FlowFixMe
      return state.getSaveResults(action.payload.includeVersion)
    case 'splitster/SET':
      // $FlowFixMe
      return state.set(
        action.payload.testId,
        action.payload.variantId,
        action.payload.cookies,
      )
    default:
      return state
  }
}

export default splitsterReducer
