// ==============================
// BASE CONFIG
// ==============================

export const BASE_URL =
  'https://api-aft-tanamduit.dev.internal.rayain.net';

export const CREDENTIALS = {
  username: 'raya-app',
  password: 'ghVGJDu6327nIH^8r3ohifen*@!'
};

// ==============================
// STRESS TEST CONFIG
// ==============================

export const OPTIONS = {
  scenarios: {
    stress_test: {
      executor: 'ramping-vus',

      startVUs: 1,

      stages: [
        { duration: '30s', target: 20 },  // naik
        { duration: '1m', target: 50 },   // stabil
        { duration: '1m', target: 100 },  // peak
        { duration: '30s', target: 0 },   // turun
      ],

      gracefulRampDown: '30s',
    },
  },

  thresholds: {
    http_req_failed: ['rate<0.01'],   // error <1%
    http_req_duration: ['p(95)<1000'] // 95% request < 1s
  }
};
