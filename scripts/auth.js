import http from 'k6/http';
import { check, fail } from 'k6';
import { BASE_URL, CREDENTIALS } from './config.js';

export function login() {

  const payload = JSON.stringify({
    username: CREDENTIALS.username,
    password: CREDENTIALS.password,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: '60s',
  };

  const res = http.post(
    `${BASE_URL}/api/Auth`,
    payload,
    params
  );

  // network error (VPN / connection issue)
  if (!res || res.status === 0) {
    fail('Login gagal: network error (status 0)');
  }

  // HTTP error
  if (res.status !== 200) {
    fail(`Login gagal dengan status ${res.status}`);
  }

  check(res, {
    'login success': (r) => r.status === 200,
  });

  let body;

  try {
    body = res.json();
  } catch (err) {
    fail('Response login bukan JSON');
  }

  if (!body.access_token) {
    fail('access_token tidak ditemukan');
  }

  return body.access_token;
}
