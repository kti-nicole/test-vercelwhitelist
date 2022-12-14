import { ipAddress, next } from '@vercel/edge';
var ipRangeCheck = require("./ip-range-check");

export default function middleware(request) {
  const ip = ipAddress(request);
  const url = new URL(request.url);
  const ipWhitelist = ["199.83.128.0/21",
                       "198.143.32.0/19",
                       "149.126.72.0/21",
                       "103.28.248.0/22",
                       "45.64.64.0/22",
                       "185.11.124.0/22",
                       "192.230.64.0/18",
                       "107.154.0.0/16",
                       "45.60.0.0/16",
                       "45.223.0.0/16",
                       "2a02:e980::/29",
                       "207.216.164.103"]

  if (ipRangeCheck(ip, ipWhitelist)) {
    return next();
  } else {
    url.pathname = '/blocked.html';
    return Response.redirect(url);
  }
}