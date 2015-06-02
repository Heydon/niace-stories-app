niace-stories-app
=================

The alpha application for NIACE, running on Meteor.

# Dev site

http://inspire-me-dev.herokuapp.com/

# Live site(s)

These both point to the same heroku instance

- http://inspire-me-live.herokuapp.com/
- http://inspire-me.org.uk

# Travis Status
[![Travis status](https://travis-ci.org/Heydon/niace-stories-app.svg)](https://travis-ci.org/Heydon/niace-stories-app)

## Setup

- Clone Repo
- Install [meteor](https://www.meteor.com/)
- Run meteor

### workflow

The branches of the repo are monitored by Travis-CI, the develop branch will deploy to [the dev site](http://inspire-me-dev.herokuapp.com/) and the master branch will deploy to [_the live site_](http://inspire-me.org.uk). Please keep this in mind.

1. make sure your develop and master branches are up-to-date and checkout into develop
2. branch off develop with a helpful branch name and commit changes
3. push branch to remote and create a pull request
4. employ peer code review, (if the size of the team allows)
5. merge to develop and when it's deployed; test on [the dev site](http://inspire-me-dev.herokuapp.com/)
6. when happy merge develop into master, using a PR or from the command line.
7. if travis is happy it will be deployed to [_the live site_](http://inspire-me.org.uk)

### Commands ( with testing and such )
```bash
curl https://install.meteor.com/ | sh
npm install
npm run jshint
npm run test
cd app
meteor
```

### exporting database ready to be consumed by offline app
```bash
MONGOHQ_URL=mongodb://username:password@host:port/dbname ./scripts/packageOfflineDatabase.js
```

### Clean database and re-import fixtured stories
#### ***This will wipe the database of stories and themes***

```bash
# make sure the meteor server is running and in a new terminal
meteor mongo
# once attached to the mongo DB
db.stories.drop();
db.themes.drop();
exit

# stop meteor then cd back into the repo's root
# ( replace 150 with as many stories as needed )
cat app/private/data/themes.json | ./scripts/fillout.js 150 > app/private/data/stories.json

# then restart meteor
cd app
meteor
```

The app should report that it's loading the fixtured stories and themes from the private/data folder
