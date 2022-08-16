## CAPA Tracker: <a target="_blank" href="https://capa-tracking-api.herokuapp.com/">Visit Live DEMO Here</a>!

Document and track CAPA reports with CAPA Tracker! This full-stack application allows users to create CAPA records, add information, update information, and delete entries. This application incorporates Google authentication.

 <tr>
    <td width="100%"  style="align:center;" valign="top">
            <img src="https://github.com/ubemacapuno/images-for-github-readme/blob/main/capa-tracker.gif?raw=true" width="100%"  alt="CAPA Tracker demo animation."/>
    </td>
  </tr>

## What are CAPAs?:

CAPA stands for Corrective Action Preventive Action, and is a process by which a manufacturing organization can make improvements to reduce non-conformances and process gaps. My background is in pharmaceutical and medical device quality assurance, and CAPA processes are required by the FDA in these industries. CAPA Tracker is an app that can help document and keep track of your organization's CAPAs! Read more about CAPAs <a href="https://en.wikipedia.org/wiki/Corrective_and_preventive_action#Medical_devices_and_FDA_compliance">HERE</a>.

## How It's Made:

**Tech used:** 

EJS templating language, Node/Express, Passport (Google authentication), MongoDB, HTML/CSS/JavaScript.

Install the dependencies either using NPM or Yarn:

Using NPM:

```bash
# Install dependencies
$ npm install

# Start development server
$ npm run dev
```

Using Yarn:

```bash
# Install dependencies
$ yarn

# Start development server
$ yarn dev
```

## Things to add:
- Create a `.env` file and add the following:
  - PORT: (can be any port example: 3000) 
  - DB_CONNECTION: `your database URI (Needed for connection to MongoDB database)` 
  - GOOGLE_CLIENT_ID: `Google Client ID from Google Cloud Credentials (Needed for OAuth)` 
  - GOOGLE_CLIENT_SECRET: `Google Client Secret from Google Cloud Credentials (Needed for OAuth)` 

## Optimizations:

This application is in a minimal viable product state and is not commercial-ready. 

In the future, I'd like to:
- Include pagination and filtering/sorting for the list of CAPAs in the dashboard.
- Include a search function
- Update Auth so that users can select organization-specific databases
- Update Auth so that users can have privileges (ex: user vs admin privileges)
- Refactor using components after learning more about EJS OR Refactor using a front-end JS framework (React/Svelte) and make components that way
- Add functionality to include attachment uploads
- Add functionality to support .csv export of CAPA data
- Add logic to warn users of expired/near-expired items
  

## Lessons Learned:
- Utilizing EJS templating for dynamic content
- Utilizing mongoose schemas
- Greater understanding of CRUD operations and routing
- Deploying full-stack applications to Heroku
- Incorporating Passport and Google Authentication, and authorized redirect URIs
- Add functionality to include attachment uploads
- Add functionality to support .csv export of CAPA data
