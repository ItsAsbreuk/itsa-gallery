gallery-itsafilemanager
========


Caution:
To make the upload work, you must take care of the following:
1. Always make the server respons content, otherwise the flash-uploader will not fire the 'uploadready'-event.
2. Set the backend confirm hte uploader-docs
3. The best way is to add extra postvars. But if you choose to send cookies, you need to set withHTML5Credentials=true.
   In order to make this work, you need to include: "Access-Control-Allow-Credentials: true" in the server's responseheader.