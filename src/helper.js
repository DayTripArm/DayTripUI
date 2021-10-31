export const isAuthorized = () => {
    return !(!localStorage.userType && !localStorage.id);
};

export const base64StringtoFile = (base64String, filename) => {
    let arr = base64String.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
};

export const downloadBase64File = (base64Data, filename) => {
    let element = document.createElement('a');
    element.setAttribute('href', base64Data);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

export const extractImageFileExtensionFromBase64 = (base64Data) => {
    return base64Data.substring("data:image/".length, base64Data.indexOf(";base64"))
};

export const image64toCanvasRef = (canvasRef, image64, pixelCrop, imgSrc) => {
    const canvas = canvasRef; // document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    const scaleX = imgSrc.naturalWidth / imgSrc.width;
    const scaleY = imgSrc.naturalHeight / imgSrc.height;

    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = image64;
    image.onload = () => {
        ctx.drawImage(
            image,
            pixelCrop.x * scaleX,
            pixelCrop.y * scaleY,
            pixelCrop.width * scaleX,
            pixelCrop.height * scaleY,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        )
    }
};

export const secondsToHourMinutes = (duration, hour_transl, min_transl) => {
    let trip_duration = duration * 2
    var hours = Math.floor(trip_duration / (60*60));
    trip_duration -= hours   * (60*60);
    var minutes  = Math.floor(trip_duration / (60));
    trip_duration -= minutes * (60);
    return (hours >=1 ? `${hours+hour_transl} `: "")+minutes+min_transl
}
