![lunchcorgi](/client/assets/lunchcorgi.jpg)

awkwardalpacas - LunchCorgi
===========================

Contributers
------------

Charlie McBride
Christian Brandalise
Jamie Skinner
Brian Small
Tyler Lambe

Stack
-----
 
Mongo, Express, Angular, Node

 - NOTE -
The project does not use Mongoose for purposes of ORM.  However there are some methods in the project which do use Mongoose so the references and 'requires' are still in there.

Database
--------

The MongoDB stores Users and Events in collections. Users have an id assigned by Mongo, name, password, and eventIDs from events document. Events have an id assigned by Mongo, a description, a location, a creatorID corresponding to the userID of the event creator, and a list of userIDs of people who have joined the event.
 
To get started with the database, there must be at least one user and one event.  Start by using the "Sign Up" to add one user then create one or more events. 
 
Unless the project is upgraded to be used with Gulp or Grunt, the Mongo server must be started before the Node.js server is started.  Otherwise, Node.js server will produce 'process.nextTick()' error.

To install mongodb:
brew update
brew install mongodb
sudo mkdir -p /data/db
sudo chown -R `id -u` /data/db

To launch mongodb:
mongod --port 27017

Server
------

Start the Node.js server with 'npm start' or with 'nodemon server/server.js'.
 
Views
-----

Sign up, sign in, events view.  There are no users' views, but this is an excellent area for expansion.
