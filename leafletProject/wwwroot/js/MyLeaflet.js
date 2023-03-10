// var greenIcon = new LeafIcon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png' });

// L.marker([38.723979, 35.542873], { icon: greenIcon }).bindPopup("I am a green leaf.").addTo(map);
var map = new L.map('map').setView([38.713979, 35.532873], 13);

var Layer = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var layerGroup = [];

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
    title: "Konumun",
    clickable: true,
    draggable: true
}

$("#find_btn").click(function() { //user clicks button
    if ("geolocation" in navigator) { //check geolocation available 
        //try to get user current location using getCurrentPosition() method
        navigator.geolocation.getCurrentPosition(function(position) {
            // $("#result").html("Konum <br />Lat : " + position.coords.latitude + " </br>Lang :" + position.coords.longitude);

            if (map.hasLayer(layerGroup)) {
                map.removeLayer(layerGroup);

                var Marker = new L.marker([position.coords.latitude, position.coords.longitude], markerOptions).bindPopup("Bulunduğunuz Konum");

                var Circle = new L.circle([position.coords.latitude, position.coords.longitude], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 100
                }).bindPopup("Bulunduğunuz Alan");

                var layerGroup = L.layerGroup([Marker, Circle]);

                layerGroup.addTo(map);
            } else {
                var Marker = new L.marker([position.coords.latitude, position.coords.longitude], markerOptions).bindPopup("Bulunduğunuz Konum");

                var Circle = new L.circle([position.coords.latitude, position.coords.longitude], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 100
                }).bindPopup("Bulunduğunuz Alan");

                var layerGroup = L.layerGroup([Marker, Circle]);

                layerGroup.addTo(map);
            }
        });
    } else {
        console.log("Browser doesn't support geolocation!");
    }
});