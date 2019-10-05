# Study-Buddy
**Project Title:** Study Buddy Scheduler 

**Team Members:** 
Andrew Miller
Josh Cosson 
Eric Choi
Eric Vongsay
Patrick Schroedl

**Project Description** 
Study Buddy is a scheduler application where the user can schedule a study session with their study group based on everyone’s conflicts and preferred time. The application will look at each user’s conflicts and preferred times, and make a suggestion on the best recommended study time. Once all users thumbs-up on the ‘chosen’ time slot, they are then able to add that slot to their personal calendar as well as call a lift. 

**APIs being used:** Open Street Maps and Lyft or Google Calendar

**Rough break down of tasks**
1. The application will allow the user to login. 
2. Users can then find or create a study group
3. Users will have the  option to pull their blocked times from Google Calendar to mark when they are not available. Users will additionally have the option to manually input their times of availability and the times they are not available. 
4. Once all users in a study group have specified when they are busy and when they prefer to meet,  the application’s cloud function will look at all conflicts and preferred times and suggest recommended study times. The UI will show the first, second and third best time-slots for a study session.  
5. Each user will have the ability to  thumbs-up on a timeslot, when one of the timeslots has been approved by all users it will be considered the chosen study time, and the options become available to add it to their own personal calendar as well as the option to call a lyft to arrive at the location. 

