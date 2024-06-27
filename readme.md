
# Canvas Admin (Admin Dashboard)

## Introduction

Canvas admin is an LTI tool that allows administrators at Georgia Tech to quickly and conveniently perform administrative tasks\
These tasks include:
- Overview of incremental and full enroller updates. Also includes functionality to abort current incremental updates
- Managing sites - isolating course sections, creating sandbox test courses, checking course information, creating webWork courses
- Search history for enroller processes
- View tableau reports
- Account roles - viewing admin roles and other information

## Technologies
- React JS (version ^16) for front-end
- Express JS and Node JS (version LTS) for back-end
- Instructure UI design components (for Canvas LMS)
- Canvas API 
- Buzz API 
- AWS SDK
- Docker

## Running application
- Application can be run via Docker and Traefik proxy - configuration files are already set up in this repository
- Virtual host (ie. dev.127.0.0.1.nip.io) can be configured in docker-compose.yml file
- ```docker-compose up --build```

## Running application in local environment
- Generate self signed ssl certificate and place them in ./certs folder
- ```openssl req -newkey rsa:2048 -nodes -keyout dev.127.0.0.1.nip.io.key -x509 -days 365 -out dev.127.0.0.1.nip.io.crt```
- Run ```docker-compose -f docker-compose.dev.yml up --build```

## Installation
- This application is designed to be installed and tested within Canvas
- Ensure .env file is configured with required LTI Key and LTI Secret
- Use canvas-admin-installation.xml file (https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-configure-an-external-app-for-a-course-using-XML/ta-p/1080)

