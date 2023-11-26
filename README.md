# About this Project

A documentation system frontend POC. Also a study of next.js of verison 13 and 14 (which has big change from 12 and below)

# Confusions that I have made in this Project

## General:

- Have difficulty moving from methodologies in react-react-app to next-app, has to distinguish between client and server component.

## On OAuth

- There is no easy way of sharing the frontend login state to the backend. Those information can only be retrieved in client component.

- If the login strategy is database-based (instead of jwt), there should be some chance of using `prisma` adaptor with `NextAuth` to get user state in server component?

- (Cont'd) Since I haven't figured out an easy wa to get the login status, to me there is zero advantage of using `NextAuth`.

- (Cont'd) I do the google login on my own without `NextAuth` as I want more control (in fact `NextAuth` return much fewer user data than a usual google login implementation).

## On Client Component

- Hooks must be differentiated into server and client hooks.

- ApiClient (instance of `axios`) should be wrapped inside a client-side hook in order to attach userData (token, email, etc) taken from other hooks (redux, zustand, etc).

## On Middleware

- The middleware in `Next.js` sucks, you can't expect to accomplish something easy in `Express` in the middleware of `Next.js`.

- For example, as simple as modifying `NextRequest` object in the middleware before passing to the next handler is not feasible in `Next.js`.

- Therefore if we have verified the token in the backend (again, `jwtwebtoken` fails in Edge Runtime, we need to consider `jose`), we cannot pass the payload through modifying `NextRequest` object nor through modifying the header. There are all **_to no avails_**.

- Instead, we need to pass user data right before we make the request like `userEmail`.
