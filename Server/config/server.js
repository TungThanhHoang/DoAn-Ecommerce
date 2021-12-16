const ADMIN_JWT_SECRET = 'jfgewufhewfnwefnew'
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: ADMIN_JWT_SECRET
    },
  },
});
