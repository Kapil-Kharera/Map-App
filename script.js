
const map = document.getElementById("map");

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        const { latitude, longitude } = position.coords;
        const { timestamp } = position;
        console.log(latitude, longitude, timestamp);
        console.log(`https://www.google.com.pt/maps/@${latitude},${longitude}`);

        var map = L.map('map').setView([29.17162171686164, 75.73536437989269], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([29.17162171686164, 75.73536437989269]).addTo(map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();
    }, function () {
        alert('Could not get your position');
    });

}

