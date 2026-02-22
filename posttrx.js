import http from 'k6/http';
import { check } from 'k6';
import { OPTIONS, BASE_URL } from './config.js';
import { login } from './auth.js';
import { products } from './data.js';

export const options = OPTIONS;

// login sekali
export function setup() {
  return login();
}

export default function (token) {

  // beda produk tiap VU
  const product = products[__VU % products.length];

  // transId unique
  const uniqueTransId =
    `${product.transId}${__VU}${__ITER}`;

  const payload = JSON.stringify({
    nama: product.nama,
    harga: 3000.00, // float
    TrxDate: new Date().toISOString(),
    transId: uniqueTransId
  });

  const res = http.post(
    `${BASE_URL}/api/posttrx`,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  check(res, {
    'posttrx status 200': (r) => r.status === 200,
  });
}
