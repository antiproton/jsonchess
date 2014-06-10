jsonchess
=========

A simple protocol for playing chess over WebSockets or other full duplex connections.
This project documents the messages sent between the server and clients and provides
Javascript classes and protocol constants to be used on both ends.

Classes
-------

###Move

Behaves exactly the same as a Move object from the
[chess](http://github.com/lightsquaredev/chess) library and has a toJSON which outputs
jsonchess-conformant JSON.

The class is closed behind fromMove (generate an instance based on a chess Move) and
fromJson (generate an instance based on jsonchess JSON)

Constants
---------

 - CHALLENGE_TIMEOUT: the number of seconds before an un-accepted challenge expires
 - TIME_FOR_MOVES_BEFORE_CLOCK_START: a time limit on each otherwise untimed move at
 the beginning of the game.  E.g. if the clocks start after Black's first move, then
 White has this many seconds to make the first move and then Black has this many
 seconds to make their first move.  This is to prevent games from just hanging around
 in memory if they are abandoned.