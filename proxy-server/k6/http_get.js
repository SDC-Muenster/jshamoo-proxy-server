import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '60s', target: 1 },
    { duration: '60s', target: 10 },
    { duration: '60s', target: 100 },
    { duration: '60s', target: 1000 },
    { duration: '60s', target: 100 },
  ],
  rps: 1000,
};

export default function(){
  let id = Math.floor(Math.random() * 10000000 + 1);
  let res = http.get(`http://localhost:4000?id=${id}`);
  check(res, {
    'status was 200': (r) => r.status == 200,
    'transaction time OK': (r) => r.timings.duration < 200,
  });
}
