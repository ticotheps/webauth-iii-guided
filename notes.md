# Notes

The main difference between using sessions and tokens for auth: where the state is kept.

- When using SESSIONS, state is kept in the SERVER.
- When using TOKENS, state is kept in the TOKEN (client).

## Responsibilities

### Server

= produce the token
= send the token to the client

- read, decode, and verify the token
= make the payload available to the rest of the API

### Client

- store the token
- send the token on every request
- destroy the token on logout

## Common Token Types

- auth token
= access/authorization token - could be 60 mins, you trust this
- refresh token
    - long lived, perhaps 9 hours