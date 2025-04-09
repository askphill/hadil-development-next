// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from 'next-iron-session';

const { SESSION_COOKIE_PASSWORD, NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN, NODE_ENV } = process.env;

export default function withSession(handler) {
  return withIronSession(handler, {
    password: SESSION_COOKIE_PASSWORD,
    cookieName: `next_iron_session::${NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`,
    cookieOptions: {
      // the next line allows to use the session in non-https environements like
      // Next.js dev mode (http://localhost:3000)
      secure: NODE_ENV === 'production',
    },
  });
}
