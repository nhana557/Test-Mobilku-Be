require("dotenv").config()
const { google } = require('googleapis')
const fs = require('fs')
const { Module } = require("module")

const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI,
)

oAuth2Client.setCredentials({
    refresh_token: process.env.DRIVE_REFRESH_TOKEN
})

const uploadGoogleDrive = async(filename, mimeType, path) =>{
    try {
        const drive = google.drive({
            version: "v3",
            auth: oAuth2Client
        })

        const response = await drive.files.create({
            requestBody: {
                name: filename,
                mimeType: mimeType,
                parents: ['1QO-waprZAe4SODG5OlANNzhwCy9vIxtb']
            },
            media: {
                mimeType: mimeType,
                body: fs.createReadStream(path)
            }
        });

        await drive.permissions.create({
            fileId: response.data.id,
            requestBody: {
                role: "reader",
                type: 'anyone'
            }
        })

        const result = await drive.files.get({
            fileId: response.data.id,
            fields: 'webViewLink, webContentLink'
        })

        return {
            id: response.data.id,
            gdLink: result.data.webViewLink
        }

    } catch (error) {
        console.log(error)
    }
};

module.exports = uploadGoogleDrive
