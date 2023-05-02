# How to run 

- To run this project first one you must run 'npm install' to get all dependences packeges  after download 
- Setting the environment variables like:
     
     env: {
        URI: database
        BASE_URL: localhost
     }

#  Techs that use to develop
- React 
- NextJs
- MongoDB (Mongoose)
- Axios
- SASS

- INSONIA
- MongoCompass
- VSCODE

# Deploy 
- https://onesight-calendar-app-chalenge.vercel.app/

# The TEST

Now, the first phase, the Onesight technical test:

On this test you'll create a SPA with a calendar + details view and a confirm/remove functionality based on DynamoDB (preferably) or any other NoSQL tech (like Firebase or Mongo).
The expected result should have 3 functionalities/views/pages:

1 page with a calendar (you can use any calendar package)
1 page with the appointment details
1 modal or view where you can either create or edit/remove an appointment

On the calendar you should be able to create appointments by clicking on a day, after clicking there should be a new view or modal with some fields (eg: name, notes) and a button to save the new event/appointment.

After creating you can click on the appointment and either cancel it or approve it, if you approve the background of the appointment must become green on the calendar, if you cancel it the background must become red and the text strike-through.