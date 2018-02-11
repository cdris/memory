# Memory

## Game Rules
Memory games are single player games backed up by the server. The most recent turn or guess for a game name will be saved on the server.  

#### Rules:

 * Click any blue tile to view its letter
 * Click a second blue tile to try and find a match
 * If both tiles match, they will turn green and their values will remain visible
 * If both tiles do not match, the values of both tiles will be visible for one second before they are hidden again
 * If you make another guess (click another blue tile) while an incorrect match is still visible, the values of the incorrect match will immediately be hidden
 * Score is the number of guesses made, the lower the better

## Attribution
Game structure is heavily structured based on code here:
[NatTuck/hangman2](https://github.com/NatTuck/hangman2)  
Game form is based on quick start here: [reactjs Forms](https://reactjs.org/docs/forms.html)

## Development Instructions

Prerequisites:

 * Erlang / OTP ~ 20.2
 * Elixir ~ 1.5
 * NodeJS ~ 9.4

To start your Phoenix server:

 * Install dependencies with `mix deps.get`
 * Install Node.js dependencies with `cd assets && npm install`
 * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Deployment Instructions

Instructions to deploy to an Ubuntu 16.04 VPS:

As root:

 * Install Erlang and Elixir packages.
 * Create a new Linux user account, "memory".
 * Add a nginx config for the new site. See "memory.nginx" for an example.

As the new user:

 * Check out this git repository to ~/src/memory
 * Run the deploy script.
   * You may need to answer "Y" and press return.
 * Run the start script to start your server.

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix

Ready to run in production? Please
[check our deployment guides](http://www.phoenixframework.org/docs/deployment).

