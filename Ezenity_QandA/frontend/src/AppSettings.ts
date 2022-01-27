export const server = 'http://localhost:45516';

export const webAPIUrl = `${server}/api`;

export const authSettings = {
  domain: 'project-ezenity-dev.auth0.com',
  client_id: 'UsgHJDFO4DBvjHKZL51TMvm6M7uuDh4j',
  redirect_uri: window.location.origin + '/signin-callback',
  scope: 'openid profile QandAAPI email',
  audience: 'https://qanda',
};
