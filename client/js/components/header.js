import renderAuthForms from "./authForms.js";
import renderLogout from "./logout.js";

function renderHeader() {
    const header = document.getElementById("header-nav");

    const navUl = document.createElement("ul");

    navUl.classList.add("nav-list");

    // Create list items for each menu item
    const logo = document.createElement("li");
    const activities = document.createElement("li");
    const teams = document.createElement("li");
    const login = document.createElement("li");

    // Create a logo header
    const logoHeader = document.createElement("h1");
    logoHeader.textContent = "Colab Task Manager";
    logo.appendChild(logoHeader);

    // Set text content for menu items
    activities.textContent = "My Activities";
    teams.textContent = "My Teams";
    login.textContent = "Login";

    // Append list items to the navigation list
    navUl.append(logo, activities, teams, login);

    // Append navigation list to the header
    header.replaceChildren(navUl);

    // Add event listeners to menu items
    // activities.addEventListener("click", renderActivities);
    // teams.addEventListener("click", renderTeams);
    login.addEventListener("click", renderAuthForms);

    //Check login status and update UI
    loginStatus();
}

//Check login status and update UI
function loginStatus() {
    axios
        .get("/api/sessions/status")
        .then((response) => {
            const { name } = response.data;

            const logout = document.createElement("li");
            logout.textContent = "Logout";
            logout.addEventListener("click", renderLogout);

            const loginInfo = document.createElement("li");
            loginInfo.textContent = `Logged in as ${name}`;

            const navUl = document.querySelector(".nav-list");
            navUl.append(loginInfo, logout);
        })
        .catch((err) => {
            if (err.response && err.response.status === 401) {
                console.log("User is not logged in");
                loginInfo.textContent = "";
            } else {
                console.warn(
                    "An error occurred while checking login status:",
                    err
                );
            }
        });
}

export default renderHeader;
