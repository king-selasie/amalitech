Access Key Manager:
This repository includes an access key manager for a school management program that supports several tenants; NodeJS, Express, and MongoDB were used in its development.

Installation:
Prerequisites:
Node.js and npm installed on your machine.
MongoDB instance running locally or on the cloud (e.g., MongoDB Atlas).
A code editor such as VS Code

Steps:
Clone the repository:
git clone https://github.com/your-username/access-key-manager.git
cd access-key-manager

Set up environment variables:
Create a .env file in the backend directory and add the following variables:
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret

Ensure your current IP address is on your Atlas cluster's IP whitelist:

Find your current public IP address by searching "what is my IP" on Google or visiting WhatIsMyIP.com.
Go to your MongoDB Atlas account and navigate to your cluster.
Click on the "Network Access" tab.
Click on "Add IP Address" and either add your current IP address automatically or enter it manually.
Confirm the addition.

Start the backend server:
cd backend
npm start

Features Implemented
⚪ Admin:

Login with email and password.
Revoke a user password.
See all keys generated on the platform (active, expired, revoked).
Retrieve a school's active access key using school email.
⚪ IT personnel:

Signup and login using email and password.
Verify account after signing up.
Reset account password.
Generate new active key if no active key is available.
See all keys granted to user on the platform (active, expired, revoked).
See details of each key (status, date of procurement, expiry date).

Live url -
