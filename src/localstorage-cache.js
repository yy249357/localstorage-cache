/*
* @Author: yankang
* @Date:   2019-12-07 20:10:26
* @Last Modified by:   yankang
* @Last Modified time: 2019-12-07 20:14:07
*/

if(window.localStorage) {
    var aa= 1024 * 1024 * 5 - unescape(encodeURIComponent(JSON.stringify(localStorage))).length;
    console.log((aa/1024).toFixed(0) + 'KB');
}

function zeroFill(num) {
    return num < 10 ? '0' + num : num
}
var Storge = {
    get: function(key) {
        // console.log(localStorage.getItem(key))
        return JSON.parse(localStorage.getItem(key)) || {}
    },
    set: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    remove: function(key) {
        localStorage.removeItem(key)
    }
}
var imgFile = Storge.get('img')
var imgDate = imgFile.date

var img = document.getElementById('img')
var date = new Date()
console.log(imgDate)
todaysDate = (date.getMonth() + 1).toString() + zeroFill(date.getDate()).toString()
// img.setAttribute("crossOrigin",'Anonymous')
if (typeof imgDate === 'undefined' || imgFile.date < todaysDate) {
    img.addEventListener('load', function(e) {
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, img.width, img.height)
        var imgFile = new Object()
        // toDataUrl会使体积变大很多
        // 默认为PNG格式。图片的分辨率为96dpi
        imgFile.imgData = canvas.toDataURL('image/png', 0.6)
        console.log(imgFile.imgData.length) // 262142  262142
        imgFile.date = todaysDate
        // Storge.remove('img')
        Storge.set('img', imgFile)
    }, false)
    img.setAttribute('src', './moon.jpeg')
} else {
    img.setAttribute('src', imgFile.imgData)
    // img.setAttribute('src', './222.jpg')
}