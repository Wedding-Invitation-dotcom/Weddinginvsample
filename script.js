document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Thank you for your RSVP!");
});



document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('.collage img');

  const collageWidth = 600;  // match CSS
  const collageHeight = 600; // match CSS
  const imgWidth = 120;
  const imgHeight = 120;

  images.forEach(img => {
    const x = Math.floor(Math.random() * (collageWidth - imgWidth));
    const y = Math.floor(Math.random() * (collageHeight - imgHeight));
    const rotate = Math.floor(Math.random() * 21) - 10; // -10 to 10 deg

    img.style.setProperty('--x-offset', x + 'px');
    img.style.setProperty('--y-offset', y + 'px');
    img.style.setProperty('--rotate', rotate + 'deg');
  });
});


document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("directionsLink");

    button.addEventListener("click", function(e) {
        e.preventDefault();

        const destinationLat = 40.712776;  // Replace with your venue's latitude
        const destinationLng = -74.005974;  // Replace with your venue's longitude

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;

                    // Google Maps directions URL
                    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destinationLat},${destinationLng}&travelmode=driving`;

                    window.open(mapsUrl, "_blank");
                },
                function(error) {
                    alert("Could not get your location. Please allow location access or try again.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    });
});

document.addEventListener('click', (e) => {
  const rightNav = document.getElementById('rightNav');
  const menuBtn = document.querySelector('.menuBtn');

  if (rightNav.classList.contains('open') &&
      !rightNav.contains(e.target) &&
      e.target !== menuBtn) {
    rightNav.classList.remove('open');
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    rightNav.classList.remove('open');
    menuBtn.style.display = 'block';
  }
});

const weddingDate = new Date("2026-03-23T16:00:00").getTime();

const els = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

function updateFlip(id, value) {
  const el = els[id];
  const formatted = String(value).padStart(2, "0");

  if (el.textContent !== formatted) {
    el.textContent = formatted;
    el.parentElement.classList.add("flip");
    setTimeout(() => el.parentElement.classList.remove("flip"), 600);
  }
}

function updateCountdown() {
  const now = Date.now();
  const diff = weddingDate - now;

  if (diff <= 0) return;

  updateFlip("days", Math.floor(diff / (1000 * 60 * 60 * 24)));
  updateFlip("hours", Math.floor(diff / (1000 * 60 * 60) % 24));
  updateFlip("minutes", Math.floor(diff / (1000 * 60) % 60));
  updateFlip("seconds", Math.floor(diff / 1000 % 60));
}

setInterval(updateCountdown, 1000);
updateCountdown();

