# About this Project

A documentation system frontend POC. Also a study of next.js of verison 13 and 14 (which has big change from 12 and below)

# Confusions that I have made in this Project

## On OAuth

- Have difficulty moving from methodologies in react-react-app to next-app, has to distinguish between client and server component.

- There is no easy way of sharing the frontend login state to the backend. Those information can only be retrieved in client component.

- If the login strategy is database-based (instead of jwt), there should be some chance of using `prisma` adaptor with `NextAuth` to get user state in server component?

- (Cont'd) Since I haven't figured out an easy way the get the login status, to me there is zero advantage of using `NextAuth`.

- (Cont'd) I do the google login on my own without NextAuth as I want more control (in fact `NextAuth` return much fewer user data than a usual google login implementation).

- Hooks must be differentiated into server and client hooks.

- ApiClient (instance of `axios`) should be wrapped inside a client-side hook in order to attach userData (token, email, etc) taken from other hooks (redux, zustand, etc).
