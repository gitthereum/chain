module.exports = {
  initialState: { members: [] },
  /**
   * @param {*} state - copy of current state (you can mutate it)
   * @param {Object} action - user-specified payload
   * @param {Object} context
   * @param {{ id: string }} context.sender - user who invoked contract
   * @param {string} context.hash - the current sha of "my-block" branch (can use as random source)
   * @param {string} context.minerId - the ID of miner (can also use as random source)
   * @param {number} context.balance - the amount of money in contract
   * @param {(id: string, amount: number)} context.transferTo - send money
   * @return the next state
   */
  reducer(state, action, context) {
    state.members.push(context.sender.id);
    if (state.members.length >= 2) {
      const random =
        parseInt(context.hash.substr(0, 4), 16) ^
        parseInt(context.minerId.substr(0, 4), 16);
      const target = random % state.members.length;
      context.transferTo(state.members[target], context.balance);
      state.members = [];
    }
    return state;
  }
};
