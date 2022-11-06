const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(logger('dev'));

//For use before db implementation
let tmpArray = []
//Store in env file for prod
let clientID = 'SYRGGbs36i7P28xlGFzonw'
let clientSecret = 'fExGeMR3lD1R4hLlSJ4-b7QveYw7SA'
let type = 'code'
//use crypto for production
let state = 'return'
let redirectURI = 'http://localhost:3000/callback'

app.get('/queryUser', async (req, res) => {
    console.log('Querying!')
    try {
        const code = req.query.code;
        console.log("code is ", code)
        const encodedHeader = Buffer.from(`${clientID}:${clientSecret}`).toString('base64')
        console.log('hellos')
        let response = await fetch('https://www.reddit.com/api/v1/access_token', {
            method: 'POST',
            body: `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/callback`,
            headers: { authorization: `Basic ${encodedHeader}`, 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        let body = await response.json();
        userIdentity = await fetch('https://oauth.reddit.com/api/v1/me', {
            method: 'GET',
            headers: { authorization: `bearer ${body.access_token}` }
        })
        userSubreddits = await fetch('https://oauth.reddit.com/subreddits/mine', {
            method: 'GET',
            headers: { authorization: `bearer ${body.access_token}` }
        })
        let subs = await userSubreddits.json()


        let userEntry = { [code]: [await userIdentity.json(), subs.data.children.map((subreddit) => subreddit.data.display_name)] }
        tmpArray.push(userEntry);
        res.send('success')

    }
    catch (error) {
        console.log(`Failed to fetch. ${error}`);
        res.send('failure')
    }

})

app.get('/getUserData', async (req, res) => {
    try {
        console.log('Finding User!')
        const code = req.query.code;
        for (let i = 0; i < tmpArray.length; i++) {
            if (code in tmpArray[i]) {
                res.send({ username: tmpArray[i][code][0].name, subreddits: tmpArray[i][code][1] })
            }
        }
    }
    catch (e) {
        res.send(e)
    }
})

app.listen(3001, () => {
    console.log(`Listening on ${PORT}`)
})