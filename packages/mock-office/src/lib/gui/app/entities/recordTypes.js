import { isNil } from 'ramda';

export const Server = ({
  id,
  name,
  port,
  type,
  secure,
  scenario,
  running,
  behaviours,
  fallbackUrl,
  recordMode
}) => ({
  id: !isNil(id) ? id : null,
  name: !isNil(name) ? name : 'New Server',
  port: !isNil(port) ? port : 3000,
  type: !isNil(type) ? type : 'http',
  secure: isNil(secure) ? secure : false,
  scenario: !isNil(scenario) ? scenario : null,
  running: !isNil(running) ? running : false,
  behaviours: !isNil(behaviours) ? behaviours : [],
  fallbackUrl: !isNil(fallbackUrl) ? fallbackUrl : '',
  recordMode: !isNil(recordMode) ? recordMode : false
});

export const Reaction = ({ params, interval, reuse, quantity, delay }) => ({
  params: !isNil(params) ? params : null,
  interval: !isNil(interval) ? interval : null,
  reuse: !isNil(reuse) ? reuse : null,
  quantity: !isNil(quantity) ? quantity : null,
  delay: !isNil(delay) ? delay : null
});
