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