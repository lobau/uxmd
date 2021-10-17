# About UXMD

UXMD is a simple tool allowing anybody with some markdown knowledge to quickly draft UX flows.

In UXMD, you define each state of your user journey. Any time a user is faced with a new set of actions, this is a new state. For example, a new page the user visit is a new state, but opening a popover is also a new state, since it offers new affordances, alongside a way to close the popover.
Real-time Collaboration

Any change you make to the markup is instantly saved. Just bookmark the link and you can come back at any time. Share the link and collaborate in real-time.

## Create a new state

To create a new state, enter a new line, followed by / and a unique tag (no space, no special characters)

```
/state_tag
# The big title
A short description

/another_state
# Another state
A short description
```

## Link states

To link states, just name a state, and in a button of another state, write the same name.

```
/state_a
# First State
[Button](#state_b)

/state_b
# Second State
[Button](#state_a)
```

# Installing and running
You'll need to install postgres.

After you have it installed, create a .env file containing postgresql credential
```
PG_USER=uxmd
PG_PASSWORD=1u2x3m4d5
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=uxmd
```

Connect to your PostgreSQL database. If you need to set up your user:
```psql
CREATE USER uxmd PASSWORD '1u2x3m4d5';
CREATE DATABASE uxmd;
GRANT ALL ON DATABASE uxmd TO uxmd;
```

Create the Documents table
```
CREATE TABLE Documents(id SERIAL PRIMARY KEY, route VARCHAR, body VARCHAR);
```

Install all the dependencies using
```
yarn install
```

Then you can run the local dev server using
```
yarn dev
```

It will use nodemon, which autoreload the server when you save changes to files (it will not reload the page tho)
