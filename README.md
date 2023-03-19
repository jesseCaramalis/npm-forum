# npm-forum
This is a React Native forum application, built over a two day period as part of an online hackathon challenge.

As my first React Native build, this challenge had me rapidly upskilling and learning the basics of mobile development, as well as how my skills as React developer transfer over into this space.

## To Do Features

- Search bar
- Posting
- Commenting (add/remove)
- Likes
- Auth Register/Login modal
- T&C's

## Optimizations

- Fix sensitive touchable post components on feed screen - scrolling can accidentally result in opening a post.
- Extensively test comments/comment nesting within parameters of API.
- Rework comment system - currently all comments for a post are fetched and stored in state on screen load. Fine for small scale but with increased use will slow down.
  - load initial comment and ~3 replies, then have expand button to load the rest.
- Better abstraction with styles, parts of FeedScreen, and types.
- Abstracting fetchComments to a seperate file in /api currently breaks comment functionality
