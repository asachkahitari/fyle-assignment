const BASE_URL = "https://api.github.com/users/";
const main = document.querySelector("#main");
let currentPage = 1;
let reposPerPage = 10;
let repoFetched = false;

// Function to show loader
const showLoader = () => {
    const loader = document.createElement("div");
    loader.classList.add("loader");
    main.appendChild(loader);
};

// Function to hide loader
const hideLoader = () => {
    // if(repoFetched){
    //     const loader = document.querySelector(".loader");
    //     if (loader) {
    //         loader.remove();
    //     }
    // }
    const loader = document.querySelector(".loader");
    if (loader) {
        loader.remove();
    }
};

async function calTotalRepos(username) {

    if(username == null) return 0;
    let page = 1;
    let allRepos = [];

    while (true) {
        const response = await fetch(`${BASE_URL}${username}/repos?per_page=${reposPerPage}&page=${page}`);

        // Check if the response headers contain rate limit information
        const remainingRequests = response.headers.get('X-RateLimit-Remaining');
        const resetTimestamp = response.headers.get('X-RateLimit-Reset');

        if (remainingRequests === '0') {
            // If no remaining requests, wait until the rate limit resets
            const resetTimeInSeconds = Math.ceil((resetTimestamp - Date.now() / 1000) || 60);
            console.log(`Rate limit exceeded. Waiting for ${resetTimeInSeconds} seconds.`);
            await new Promise(resolve => setTimeout(resolve, resetTimeInSeconds * 1000));
        }

        const data = await response.json();

        if (data.length === 0) {
            break;  
        }

        allRepos = allRepos.concat(data);
        page++;
    }
    return allRepos.length;
}

const getUser = async(username) => {
    showLoader();
    const response = await fetch(BASE_URL + username);
    const data = await response.json();
    // console.log(data)
    const card = `
    <div class="main-card">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <img class="pl-2" src="${data.avatar_url}" alt="picsum photo">
                </div>
                <div class="col-md-8 text-center">
                    <h1>${data.name}</h1>
                    <h4>${data.bio}</h4>
                    <span class="location"><img src="location_2838912.png" alt=""><p>${data.location}</p></span>
                    <p>${data.blog}</p>
                </div>
            </div>
            <div class="row">
                <span class="location pl-5"><img src="clip_10536881.png" alt=""><p class= "pt-2">${data.html_url}</p></span>
            </div>
            <div id= "repos" class="row">

            </div>
        </div>
    </div>
    `
    main.innerHTML = card;
    await getRepos(username, currentPage);
    hideLoader();
}


getUser("taylorotwell")

const formSubmit = () => {
    const searchBox = document.querySelector("#search");
    if(searchBox.value != ""){
        getUser(searchBox.value);
        searchBox.value = "";
    }
    return false;
}

const getRepos = async(username, page) => {

    const reposPerPageSelect = document.getElementById("reposPerPage");
    reposPerPage = reposPerPageSelect.options[reposPerPageSelect.selectedIndex].value;

    const repos = document.querySelector("#repos")
    repos.innerHTML = '';

    
    // showLoader();

    const response = await fetch(`${BASE_URL}${username}/repos?per_page=${reposPerPage}&page=${page}`)
    const data = await response.json()

    const totalRepos = await calTotalRepos(username);
    console.log(totalRepos);

    console.log(data);
    data.forEach(
        (item) => {
            // console.log(item);
            const div = document.createElement("div");
            div.classList.add("w-400")
            // div.classList.add("p-2")
            div.classList.add("mx-2")

            const heading = document.createElement("h3");
            heading.innerText = item.name;

            const para = document.createElement("p");
            para.innerText = item.description ? item.description : 'No description available';

            const span = document.createElement("span");

            const topics = item.topics || [];
            // console.log(topics);
            topics.forEach(
                (topic) => {
                    const top = document.createElement("p");
                    top.innerText = topic;
                    span.appendChild(top);
                    // console.log(topic);
                }
            )
            div.appendChild(heading);
            div.appendChild(para);
            div.appendChild(span);

            const repoLink = document.createElement("a");
            repoLink.href = item.html_url;
            repoLink.target = "_blank"; // Open the link in a new tab
            repoLink.appendChild(div);

            repos.appendChild(repoLink);

            // repos.appendChild(div);


        }
    );
    // repoFetched = true;
    // hideLoader();
    addPaginationControls(username, totalRepos);

}

const addPaginationControls = (username, totalRepos) => {
    let paginationContainer = document.querySelector(".pagination");
    
    if (!paginationContainer) {
        paginationContainer = document.createElement("div");
        paginationContainer.classList.add("pagination");
        main.appendChild(paginationContainer);
    }

    paginationContainer.innerHTML = ''; // Clear existing pagination controls

    const totalPages = Math.ceil(totalRepos / reposPerPage);
    // console.log(totalPages);
    // console.log(totalRepos);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        pageButton.addEventListener("click", () => changePage(username, i));
        paginationContainer.appendChild(pageButton);
    }
};


const changePage = (username, newPage) => {
    currentPage = newPage;
    getRepos(username, currentPage);
};

