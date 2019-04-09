export const reactionToResponse = reaction => ({
  id: reaction.id,
  status: reaction.status,
  params: reaction.params,
  schedule: reaction.schedule,
  type: reaction.type
});

export const expectationToResponse = behaviour => ({
  id: behaviour.id,
  status: behaviour.status
});

export const serverToResponse = server => ({
  running: server.isLive(),
  type: server.type,
  port: server.port,
  expectations: server.expectations.map(expectationToResponse),
  fallbackUrl: server.fallbackUrl,
  recordMode: server.recordMode
});
