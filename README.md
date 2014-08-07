jsonchess
=========

jsonchess is a client/server protocol for playing chess online.  This project
provides some JavaScript code to define protocol constants and assist with the
implementation on both ends.

The protocol consists of a core and several "modules".  For full documentation,
see [jsonchess.org][1].

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
with getters and setters.

Premove
-------

Checks the validity of a premove and outputs a jsonchess premove structure from
toJSON - see the [premove module][2].

[1]:http://jsonchess.org
[2]:http://jsonchess.org/modules/premove