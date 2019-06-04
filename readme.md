
# ExploderDude

## Background and Overview
An interactive, multi-player Bomberman-inspired game where you are able to connect with and play with up to three other online friends.

We created ExploderDude as a throwback, retro browser-based game to use to play with friends. 

## Functionality and MVP
We are building a basic Bomberman game with multi-player functionaity being our highest order MVP. 

Players will be able to visit our site, create a session without logging in, send given link to up to three other friends, and be able to play a game with these friends. 

Once the game starts, four players will interact with the board by laying bombs, destroying perishable objects and picking up powerups, with the main goal of being the last man standing by eliminating all other players. 

## Technologies and Technical Challenges
ExploderDude was built using a MongoDB and Express backend, with a frontend relying on React/Node.js with Canvas.

#### Backend: MongoDB/Express
Our backend holds our high scores as well as our WebSocket API that will enable our multi-player functionality. Additionally, we will use MongoDB to hold all of our bonus feature content.

#### Frontend: React/Node.js and Canvas
We will be heavily utilizing Canvas to render all of our actual game components. Our React frontend will handle a few main components before deferring to a single 'canvas' element that will contain the bulk of our code.

#### Technical Challenges
* Reading data from MongoDB database to connect sockets for multi-player
* Integrating sprite animation for a smoother user experience
* Working on a single project with multiple collaborators (being able to resolve merge conflicts)

## Items Accomplished Over the Weekend
* All team members read and watched Github and MERN tutorials
* Set up project repo and MongoDB
* Generate game and other required class objects (grid, bombs, powerups, etc)
* Establish Git and project collaboration/workflow between team members
* Created project proposal document

## Group Members and Work Breakdown

#### Friday, May 10
* Team members read and watch MERN stack tutorials
* Team maps out game and minimum required functionality

#### Saturday, May 11
* AJ and Jinfull setup required modules/scripts and React skeleton
* Cameron and Stefan create grid where game will be rendered upon

#### Sunday, May 12
* AJ works on project architecture
* Jinfull works on creating bomb and powerup classes
* Cameron and Stefan continue to build board and board logic

#### May 13
* Work on game logic

#### May 14 
* Investigate WebSocket API to integrate multi-player

#### May 15
* Testing
