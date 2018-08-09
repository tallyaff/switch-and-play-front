const CLOUD_NAME = 'adigonnen'

var UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

// on submit call to this function
// function uploadImg(elForm, ev) {
//     ev.preventDefault();
   
//     // A function to be called if request succeeds
//     function onSuccess(res) {
//         console.log('uploadedImg', res);
//         console.log('uploadedImg', res.url);
//     }

//     _doUploadImg(elForm, onSuccess);
// }

function uploadImg(img) {

    var formData = new FormData();
    formData.append('file', img)
    formData.append('upload_preset', 'ez0bhfgc');

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
    .then(function (response) {
        return response.json()
    })
    .catch(function (error) {
        console.error(error)
        throw error
    })
}

export default {
    uploadImg,
}