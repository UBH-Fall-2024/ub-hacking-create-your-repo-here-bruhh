# Spot&Park

Spot&Park is a website service designed to show available spaces in UB parking lots. Created for UB Fall 2024 Hackathon.

## Purpose

University parking lot capacity is frequently overwhelmed, leading students and faculty to circle the lots looking for any available space. Consequently, complaints about being late to classes or otherwise delayed from not being able to find parking are common.

This service is designed to minimize the amount of time spent searching for parking. It allows users to search parking lots in UB north campus and observe which spots are available for them to park in. Their status as a student or faculty member is taken into consideration for whether they can park in a given spot.

## Current capabilities

In it's current state, the system is only scaling for two parking lots, Jarvis A Lot and Jarvis B Lot. When parking, users will check in with the site to select the spot they parked in, and when they leave they will check out. We implemented the databases for Register and Login Page.

Currently, the application can be accessed by clicking on [Spot&Park](http://10.84.101.26:3000), which is just allowing our device to stream the website in place of a server.

## Desired capabilities

We plan to expand the system for all parking lots on UB campuses. Additionally, we hope to implement automatic tracking of parking, to replace the check-in and check-out functionality. The current idea for this is installing cameras on street lights in each parking lot and using computer vision to detect when a parking spot is taken or freed. 

Currently using our personal laptop for streaming the website, we plan to deploy it on the university server if the idea is receives appreciation and appropriate funding for further development. 

## Technology

The frontend of our site was built using React.js and CSS. The backend was built with PHP via phpMyAdmin and XAMPP, and the database is implementing mySQL.

### Members

Nate De Lucia,
Gurleen Rekhi,
Dharmi Khadela,
Nishanth Reddy Bonikela
