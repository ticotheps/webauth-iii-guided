# Notes

The main difference between using sessions and tokens for auth: where the state is kept.

- When using SESSIONS, state is kept in the SERVER.
- When using TOKENS, state is kept in the client via the TOKEN. 

## Responsibilities

### Server

= produce the token (state is NOT stored in the server)
= send the token to the client
- read, decode, and verify the token
= make the payload available to the rest of the API

### Client

- store the token (remember that the client also keeps the state)
- send the token on every request
- destroy the token on logout

## Common Token Types

- auth token
= access/authorization token 
    - short lived; it could be 60 mins, but you trust this
- refresh token (authentication access only; no authorization access)
    - long lived; perhaps 9 hours