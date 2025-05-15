document.addEventListener('DOMContentLoaded', function() {
    const getLocationBtn = document.getElementById('get-location');
    const latitudeInput = document.getElementById('latitude');
    const longitudeInput = document.getElementById('longitude');
    const locationStatus = document.getElementById('location-status');
    const submitBtn = document.getElementById('submit-btn');
    const confirmCheckbox = document.getElementById('yousure');
    
    // Get location when button is clicked
    getLocationBtn.addEventListener('click', function() {
        locationStatus.textContent = "Requesting location...";
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                // Success callback
                function(position) {
                    latitudeInput.value = position.coords.latitude;
                    longitudeInput.value = position.coords.longitude;
                    locationStatus.textContent = "Location acquired successfully!";
                    locationStatus.className = "success";
                    
                    // Enable submit button if checkbox is checked
                    if (confirmCheckbox.checked) {
                        submitBtn.disabled = false;
                    }
                },
                // Error callback
                function(error) {
                    let errorMessage;
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = "Location access denied. Please enable location services.";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = "Location information unavailable.";
                            break;
                        case error.TIMEOUT:
                            errorMessage = "Location request timed out.";
                            break;
                        default:
                            errorMessage = "An unknown error occurred.";
                    }
                    locationStatus.textContent = errorMessage;
                    locationStatus.className = "error";
                }
            );
        } else {
            locationStatus.textContent = "Geolocation is not supported by this browser.";
            locationStatus.className = "error";
        }
    });
    
    // Enable/disable submit button based on checkbox and location
    confirmCheckbox.addEventListener('change', function() {
        if (this.checked && latitudeInput.value && longitudeInput.value) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    });
    
    // Form submission
    document.getElementById("submit-report").addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Validate that we have location data
        if (!latitudeInput.value || !longitudeInput.value) {
            locationStatus.textContent = "Please get your location before submitting.";
            locationStatus.className = "error";
            return;
        }
        
        // Here you would normally send the data to your server
        console.log("Submitting data:", {
            latitude: latitudeInput.value,
            longitude: longitudeInput.value,
            // Add other form data here
        });
        
        // Redirect to thank you page or show confirmation
        alert("Thank you for your submission!");
        window.location.href = "../index.html";
    });
});