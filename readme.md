# Stat Tracker

### Project Description:

* #### Create an application that allows users to track personal statistics for their activities
* #### A user can track any activity they want
* #### Create an API with the following endpoints:
  * GET /api/activities - List all activities being tracked
  * POST /api/activities - Add new activity to track
  * GET /api/activities/{id} - List the current stats track for the activity
  * PUT /api/activities/{id} - Update a currently tracked activity
  * DELETE /api/activities/{id} - Delete activity and all tracked data
  * POST /api/activities/{id}/stats - Add activity stat for a given day
  * DELETE /api/stats/{id} - Delete activity stat for a given dat
* #### Use MongoDB to store and serve the data
* #### Build a frontend that consumes the API using html, CSS, and JavaScript
