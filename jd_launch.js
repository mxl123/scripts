
var obj = JSON.parse($response.body)
delete obj.images
$done({body: JSON.stringify(obj)})