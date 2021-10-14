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
Create a .env file containing postgresql credential
```
PG_USER=postgres_user
PG_PASSWORD=postgres_password
PG_HOST=postgres_host
PG_PORT=5432
PG_DATABASE=database_name
NODE_ENV=development
```

Connect to your PostgreSQL database and create the Documents table
```
CREATE TABLE Documents(id SERIAL PRIMARY KEY, route VARCHAR, body VARCHAR);
```

Install all the dependencies using
```
npm install
```

Then you can run the local dev server using
```
npm run dev
```

It will use nodemon, which autoreload the server when you save changes to files (it will not reload the page tho)
