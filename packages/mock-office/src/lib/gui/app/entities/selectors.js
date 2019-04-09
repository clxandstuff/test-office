import { createSelector } from 'reselect';

export const serverSelector = (state, id) =>
  state.entities.servers.entities[id];
export const behaviourSelector = (state, id) =>
  state.entities.behaviours.entities[id];
export const reactionSelector = (state, id) =>
  state.entities.reactions.entities[id];
export const allServersSelector = createSelector(
  state => state.entities.servers.ids,
  state => state.entities.servers.entities,
  (ids, entities) => ids.map(id => entities[id])
);
