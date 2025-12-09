import { baseurl, pythonURI, fetchOptions } from './config.js';

console.log("login.js loaded");

// Global logout function
window.logout = function() {
    // Clear localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');

    // Redirect to login page
    window.location.href = baseurl + '/login';
};

document.addEventListener('DOMContentLoaded', function() {
    console.log("Base URL:", baseurl); // Debugging line
    getCredentials(baseurl) // Call the function to get credentials
        .then(data => {
            console.log("Credentials data:", data); // Debugging line
            const loginArea = document.getElementById('loginArea');
            if (data) { // Update the login area based on the data
                const displayName = data.name || data.username || 'User';
                const infoLines = [];

                if (data.role) {
                    infoLines.push(`Role: ${data.role}`);
                }
                if (data.student_id) {
                    infoLines.push(`Student ID: ${data.student_id}`);
                }
                if (data.github_id) {
                    infoLines.push(`GitHub: ${data.github_id}`);
                }

                const infoHtml = infoLines.length > 0
                    ? `<div class="roles-list" style="padding: 8px 16px; color: #888; font-size: 0.95em;">
                        ${infoLines.join('<br>')}
                       </div>
                       <hr style="margin: 4px 0;">`
                    : '';

                loginArea.innerHTML = `
                    <div class="dropdown">
                        <button class="dropbtn">${displayName}</button>
                        <div class="dropdown-content hidden">
                            ${infoHtml}
                            <a href="${baseurl}/prototyperoomcode">Hardware Havoc</a>
                            <a href="javascript:void(0)" onclick="logout()">Logout</a>
                        </div>
                    </div>
                `;

                // Add click event listener for dropdown toggle
                const dropdownButton = loginArea.querySelector('.dropbtn');
                const dropdownContent = loginArea.querySelector('.dropdown-content');

                dropdownButton.addEventListener('click', (event) => {
                    event.preventDefault(); // Prevent redirection
                    if (dropdownContent.classList.contains('hidden')) {
                        dropdownContent.classList.remove('hidden');
                    } else {
                        dropdownContent.classList.add('hidden');
                    }
                });

                // Add event listener to hide dropdown when clicking outside
                document.addEventListener('click', (event) => {
                    if (!dropdownButton.contains(event.target) && !dropdownContent.contains(event.target)) {
                        dropdownContent.classList.add('hidden'); // Hide dropdown
                    }
                });
            } else {
                // User is not authenticated, then "Login" link is shown
                loginArea.innerHTML = `<a href="${baseurl}/login">Login</a>`;
            }
            // Set loginArea opacity to 1
            loginArea.style.opacity = "1";
        })
        .catch(err => {
            console.error("Error fetching credentials: ", err);
            // Show login link on error
            const loginArea = document.getElementById('loginArea');
            if (loginArea) {
                loginArea.innerHTML = `<a href="${baseurl}/login">Login</a>`;
            }
        });
});

function getCredentials(baseurl) {
    // Check for JWT token in localStorage
    const authToken = localStorage.getItem('access_token');

    if (!authToken) {
        console.log("No auth token found");
        return Promise.resolve(null);
    }

    // Call the integrated backend's /api/auth/me endpoint
    const URL = pythonURI + '/api/auth/me';
    return fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            console.warn("HTTP status code: " + response.status);
            // Token might be invalid, clear it
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            return null;
        }
        return response.json();
    })
    .then(data => {
        if (data === null) return null;
        console.log("User data from /api/auth/me:", data);
        // The response has format: { user: { id, username, email, ... } }
        return data.user;
    })
    .catch(err => {
        console.error("Fetch error: ", err);
        // Return null instead of throwing to handle the error gracefully
        return null;
    });
}
