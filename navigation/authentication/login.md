---
layout: page
title: Login
permalink: /login
search_exclude: true
show_reading_time: false
---
<style>
    .submit-button {
        width: 100%;
        transition: all 0.3s ease;
        position: relative;
    }
    .login-container {
        display: flex;
        /* Use flexbox for side-by-side layout */
        justify-content: space-between;
        /* Add space between the cards */
        align-items: flex-start;
        /* Align items to the top */
        gap: 20px;
        /* Add spacing between the cards */
        flex-wrap: nowrap;
        /* Prevent wrapping of the cards */
    }

    .login-card,
    .signup-card {
        flex: 1 1 calc(50% - 20px);
        max-width: 45%;
        box-sizing: border-box;
        background: #1e1e1e;
        border-radius: 15px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        padding: 20px;
        color: white;
        overflow: hidden;
    }

    .login-card h1 {
        margin-bottom: 20px;
    }

    .signup-card h1 {
        margin-bottom: 20px;
    }

    .form-group {
        position: relative;
        margin-bottom: 1.5rem;
    }

    input {
        width: 100%;
        box-sizing: border-box;
    }
</style>
<br>
<div class="login-container">
    <!-- Python Login Form -->
    <div class="login-card">
        <h1 id="pythonTitle">User Login</h1>
        <hr>
        <form id="pythonForm" onsubmit="loginBoth(); return false;">
            <div class="form-group">
                <input type="text" id="uid" placeholder="Username" required>
            </div>
            <div class="form-group">
                <input type="password" id="password" placeholder="Password" required>
            </div>
            <p>
                <button type="submit" class="large primary submit-button">Login</button>
            </p>
            <p id="message" style="color: red;"></p>
        </form>
    </div>
    <div class="signup-card">
        <h1 id="signupTitle">Sign Up</h1>
        <hr>
        <form id="signupForm" onsubmit="signup(); return false;">
            <div class="form-group">
                <input type="text" id="signupUid" placeholder="Username" required>
            </div>
            <div class="form-group">
                <input type="email" id="signupEmail" placeholder="Email" required>
            </div>
            <div class="form-group">
                <input type="password" id="signupPassword" placeholder="Password" required>
            </div>
            <div class="form-group">
                <input type="text" id="signupStudentId" placeholder="Student ID (Optional)">
            </div>
            <div class="form-group">
                <input type="text" id="signupGithubId" placeholder="GitHub ID (Optional)">
            </div>
            <p>
                <button type="submit" class="large primary submit-button">Sign Up</button>
            </p>
            <p id="signupMessage" style="color: green;"></p>
        </form>
    </div>
</div>
<script type="module">
    import { login, pythonURI, javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

    // Function to handle integrated backend login
    window.loginBoth = function () {
        const username = document.getElementById("uid").value;
        const password = document.getElementById("password").value;

        if (!username || !password) {
            document.getElementById("message").textContent = "Username and password are required";
            return;
        }

        // Clear any previous messages
        document.getElementById("message").textContent = "";

        // Login to Prototype API (JWT-based)
        prototypeLogin(username, password);

        // Also login to Java backend
        javaLogin();
    }

    // Function to handle Prototype API login (JWT-based)
    function prototypeLogin(username, password) {
        const loginURL = `${pythonURI}/api/auth/login`;

        const loginOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                username: username,
                password: password
            })
        };

        fetch(loginURL, loginOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Invalid login credentials");
                }
                return response.json();
            })
            .then(data => {
                console.log("Prototype API login successful!", data);
                // Store JWT token in localStorage
                if (data.access_token) {
                    localStorage.setItem('access_token', data.access_token);
                }
                // Store user info
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
                // Redirect to Hardware Havoc
                window.location.href = '{{site.baseurl}}/prototyperoomcode';
            })
            .catch(error => {
                console.error("Prototype login failed:", error.message);
                document.getElementById("message").textContent = error.message;
            });
    }

    // Legacy Python login function (kept for compatibility)
    window.pythonLogin = function () {
        const options = {
            URL: `${pythonURI}/api/authenticate`,
            callback: pythonDatabase,
            message: "message",
            method: "POST",
            cache: "no-cache",
            body: {
                uid: document.getElementById("uid").value,
                password: document.getElementById("password").value,
            }
        };
        login(options);
    }
    // Function to handle Java login
    window.javaLogin = function () {
    const loginURL = `${javaURI}/authenticate`;
    const databaseURL = `${javaURI}/api/person/get`;
    const signupURL = `${javaURI}/api/person/create`;
    const userCredentials = JSON.stringify({
        uid: document.getElementById("uid").value,
        password: document.getElementById("password").value,
    });
    const loginOptions = {
        ...fetchOptions,
        method: "POST",
        body: userCredentials,
    };
    console.log("Attempting Java login...");
    fetch(loginURL, loginOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("Invalid login");
            }
            return response.json();
        })
        .then(data => {
            console.log("Login successful!", data);
            window.location.href = '{{site.baseurl}}/profile';
            // Fetch database after login success using fetchOptions
            return fetch(databaseURL, fetchOptions);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Spring server response: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Java database response:", data);
        })
        .catch(error => {
            console.error("Login failed:", error.message);
            // If login fails, attempt account creation
            if (error.message === "Invalid login") {
                alert("Login for Spring failed. Creating a new Java account...");
                const signupData = JSON.stringify({
                    uid: document.getElementById("uid").value,
                    email: document.getElementById("uid").value + "@gmail.com",
                    dob: "11-01-2024", // Static date, can be modified
                    name: document.getElementById("uid").value,
                    password: document.getElementById("password").value,
                    kasmServerNeeded: false,
                });
                const signupOptions = {
                    ...fetchOptions,
                    method: "POST",
                    body: signupData,
                };
                fetch(signupURL, signupOptions)
                    .then(signupResponse => {
                        if (!signupResponse.ok) {
                            throw new Error("Account creation failed!");
                        }
                        return signupResponse.json();
                    })
                    .then(signupResult => {
                        console.log("Account creation successful!", signupResult);
                        alert("Account Creation Successful. Logging you into Flask/Spring!");
                        // Retry login after account creation
                        return fetch(loginURL, loginOptions);
                    })
                    .then(newLoginResponse => {
                        if (!newLoginResponse.ok) {
                            throw new Error("Login failed after account creation");
                        }
                        console.log("Login successful after account creation!");
                        // Fetch database after successful login
                        return fetch(databaseURL, fetchOptions);
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Spring server response: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log("Java database response:", data);
                    })
                    .catch(newLoginError => {
                        console.error("Error after account creation:", newLoginError.message);
                    });
            } else {
                console.log("Logged in!");
            }
        });
};
    // Function to fetch and display Python data
    function pythonDatabase() {
        const URL = `${pythonURI}/api/id`;
        fetch(URL, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Flask server response: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                window.location.href = '{{site.baseurl}}/profile';
            })
            .catch(error => {
                document.getElementById("message").textContent = `Error: ${error.message}`;
            });
    }
    window.signup = function () {
        const signupButton = document.querySelector(".signup-card button");
        // Disable the button and change its color
        signupButton.disabled = true;
        signupButton.classList.add("disabled");

        const username = document.getElementById("signupUid").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
        const studentId = document.getElementById("signupStudentId").value.trim();
        const githubId = document.getElementById("signupGithubId").value.trim();

        // Sign up to Prototype API (integrated backend)
        const prototypeSignupURL = `${pythonURI}/api/auth/register`;

        // Build request body with optional fields
        const signupData = {
            username: username,
            email: email,
            password: password
        };

        // Add optional fields if provided
        if (studentId) {
            signupData.student_id = studentId;
        }
        if (githubId) {
            signupData.github_id = githubId;
        }

        const prototypeSignupOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(signupData)
        };

        fetch(prototypeSignupURL, prototypeSignupOptions)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                document.getElementById("signupMessage").innerText = "Sign up successful!";
                console.log("Prototype signup successful:", data);

                // Store JWT token
                if (data.access_token) {
                    localStorage.setItem('access_token', data.access_token);
                }
                // Store user info
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                }

                // Auto-login after 1 second
                setTimeout(() => {
                    window.location.href = '{{site.baseurl}}/prototyperoomcode';
                }, 1000);
            })
            .catch(error => {
                console.error("Prototype signup failed:", error);
                document.getElementById("signupMessage").innerText = "Sign up failed: " + error.message;
                signupButton.disabled = false;
                signupButton.classList.remove("disabled");
            });
    }
    function javaDatabase() {
        const URL = `${javaURI}/api/person/get`;
        fetch(URL, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Spring server response: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error("Java Database Error:", error);
            });
    }
</script>
