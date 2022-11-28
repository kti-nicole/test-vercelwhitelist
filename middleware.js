import { ipAddress, next } from '@vercel/edge';
//import { BlockList } from 'net';

export default function middleware(request) {
  const ip = ipAddress(request);
  const url = new URL(request.url);
  const ipList = new BlockList;

  //Imperva IPs
  ipBlocklist.addSubnet('199.83.128.0', 21, 'ipv4');
  ipBlocklist.addSubnet('198.143.32.0', 19, 'ipv4');
  ipBlocklist.addSubnet('149.126.72.0', 21, 'ipv4');
  ipBlocklist.addSubnet('103.28.248.0', 22, 'ipv4');
  ipBlocklist.addSubnet('45.64.64.0', 22, 'ipv4');
  ipBlocklist.addSubnet('185.11.124.0', 22, 'ipv4');
  ipBlocklist.addSubnet('192.230.64.0', 18, 'ipv4');
  ipBlocklist.addSubnet('107.154.0.0', 16, 'ipv4');
  ipBlocklist.addSubnet('45.60.0.0', 16, 'ipv4');
  ipBlocklist.addSubnet('45.223.0.0', 16, 'ipv4');
  ipBlocklist.addSubnet('2a02:e980::', 29, 'ipv6');

  //Nicole testing
  ipBlocklist.addAddress('207.216.164.103');

  //The blocklist contains our whitelisted IPs, so if not on blocklist then allow
  if (!ipBlocklist.check(ip)) {
    return next();
  } else {
    url.pathname = '/blocked.html';
    return Response.redirect(url);
  }
}