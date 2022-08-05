
# File Uploads Server

A file upload / download web application with the requirements specified below. The main purpose of this project is to allow users to upload multiple files.

* Users can only upload CSS, JavaScript and HTML file. File size must be between 1 KB and 10MB,
it can be verified before or after uploading.
*  Users can edit file names for each file before uploading. The physical name of the uploaded file on the server should be the edited name.
*  The user must be able to see the original and edited file names after submitting. The user can download these files. The downloaded file name should be original file name + underscore + edited file name +underscore + downloaded date + extension. 


## Deployment

Install all the required libs
```bash
  npm install
```

Start the nodejs server, the server will run on a random unused port as prompted.

```bash
  npm start
```
