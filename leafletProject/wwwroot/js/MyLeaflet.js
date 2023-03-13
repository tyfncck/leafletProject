// var greenIcon = new LeafIcon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png' });

// L.marker([38.723979, 35.542873], { icon: greenIcon }).bindPopup("I am a green leaf.").addTo(map);
var map = new L.map('map').setView([38.713979, 35.532873], 13);

var Layer = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

$('.leaflet-control-attribution').hide()

let layerGroup = [];
let Marker = null;
let Circle = null;

(Layer).addTo(map);

var LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: 'leaf-shadow.png',
        iconSize: [38, 95],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76]
    }
});

var markerOptions = {
    title: "Konum",
    clickable: true,
    draggable: false
}

$("#find_btn").click(function() {
    if ("geolocation" in navigator) { //konum durumu kontrolü
        navigator.geolocation.getCurrentPosition(function(position) {
            if (layerGroup !== null) {

                if (Marker !== null) {
                    map.removeLayer(Marker);
                }
                map.removeLayer(layerGroup);

                Marker = new L.marker([position.coords.latitude, position.coords.longitude], markerOptions).bindPopup("Konumun");

                // Circle = new L.circle([position.coords.latitude, position.coords.longitude], {
                //     color: 'red',
                //     fillColor: '#f03',
                //     fillOpacity: 0.5,
                //     radius: 100
                // }).bindPopup("Alanın");

                layerGroup = L.layerGroup([Marker]);

                layerGroup.addTo(map);
                $("#result").html("Konum <br />Lat : " + position.coords.latitude + " </br>Lang :" + position.coords.longitude); //
            }
        });
    } else {
        console.log("Tarayıcı Desteklemiyor!!!");
    }
});

map.on('click', (event) => {
    if (Marker !== null) {
        map.removeLayer(Marker);
    }
    Marker = L.marker([event.latlng.lat, event.latlng.lng]).addTo(map);
    $("#result").html("Konum <br />Lat : " + event.latlng.lat + " </br>Lang :" + event.latlng.lng);
});

$.ajax({
    url: 'Home/GetAreas',
    success: function(data) {
        console.log(data)
        $(data).each(function(index, item) {
            var Ltd = item.latitude;
            var Lng = item.longitude;
            L.circle([Ltd, Lng], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 100
            }).bindPopup(item.description).addTo(map);
        });
    }
});