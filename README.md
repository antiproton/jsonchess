jsonchess
=========

jsonchess is a client/server protocol for playing chess online.  This project provides some JavaScript
code to define protocol constants and assist with the implementation on
both ends.

The protocol has no formal specification and there are currently no plans to
write one; these modules have been developed up to the point where there is
sufficient clarity as to how the client and server projects communicate, which
values are arbitrary and which ones need to match up, etc.  Defining the seams
between [lightsquare](http://github.com/jsonchess/lightsquare) and
[lightsquared](http://github.com/jsonchess/lightsquared) is the only purpose of
the protocol at the moment -- more specification (e.g. exactly what the messages
mean and when it's valid to send them) will be added if and when there is a need
for other projects to use the protocol.

Message format
--------------

The basic format of all messages exchanged on the protocol is a JSON
object with a `topic` field and an optional `data`
field. The topics look like URL paths:

`/game/123/move`

The whole message sent by the server when the move e4 is played in the
game with id "123" looks like this:

	{	
		"topic": "/game/123/move",
		"data": {	
			"from": 12,
			"to": 28,
			"index": 0,
			"time": 1407781765400
		}
	}

Feeds
-----

For basic updates, the protocol has a concept of "feeds", which are streams of
data represented by a name.  The purpose of this is mostly just to provide some
way for the client to indicate which updates it is and isn't interested in, for
performance reasons.

The currently defined feeds are:

- `random_games` - a small number of games selected from the currently active
	games on the site.  The client receives a small data structure containing
	the current position, and the last move played, if applicable.
- `users_online` - the client receives updates when a user connects or disconnects,
	and receives the full list of online users upon activating the feed.
- `seeks` - the client receives updates when a new seek is created (if the seek
	options would allow the player to accept) and when a seek expires.  (The client
	requests the full seek list separately.)

Each JavaScript file in this repo is described briefly below.

glicko2
-------

Constants related to the glicko2 rating system.

gameRestoration
---------------

Constants related to the game restoration module.

constants
---------

General constants.

Move
----

Methods for converting between various jsonchess structures, and Move objects
with getters and setters.  The Move interface is designed to be compatible with
Moves from the [chess](http://github.com/gushogg-blake/chess) library.

Premove
-------

Checks the validity of a premove and outputs a jsonchess premove structure from
toJSON.

chatMessageTypes
-----------

The types of message that can be sent on the server-wide chatroom; e.g. messages
from other users, messages coming from admin, automatically generated server messages
etc.