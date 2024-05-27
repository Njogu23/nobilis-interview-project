# Installation Guide

This guide will walk you through the steps to install and run the project on your local environment.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

* Ruby (version 3.1.3 recommended)
* Ruby on Rails (version 7.1.3 or higher)
* Node.js (version 18.2.0 or higher)
* npm (Node Package Manager, comes with Node.js)
* Git

## Installation Steps

 ### 1. Clone the repository:
 
 git clone https://github.com/Njogu23/nobilis-interview-project

 ### 2. Navigate to the project directory
 
 cd nobilis-interview-project

 ### 3. Install Ruby dependencies

 bundle install

 ### 4. Setup the database

 rails db:create
 rails db:migrate

 ### 5. Start the Rails Server

 rails server

 ### 6. Navigate to client directory

 cd client/

 ### 7. Install Node.js dependencies

 npm install

 or

 yarn install

 ### 8. Start React Server

 npm run dev

 

    




