let searchInputElement = document.getElementById("searchInput");
let searchResultsElement = document.getElementById("searchResults");

let spinnerElement = document.getElementById("spinner");

function createAndAppend(eachResult) {
    let {
        title,
        link,
        description
    } = eachResult;
    let titleElement = document.createElement("a");
    titleElement.classList.add("result-title");
    titleElement.textContent = title;
    titleElement.href = link;
    titleElement.target = "_blank";
    searchResultsElement.appendChild(titleElement);

    let brElement = document.createElement("br");
    searchResultsElement.appendChild(brElement);

    let linkElement = document.createElement("a");
    linkElement.textContent = link;
    linkElement.classList.add("result-url");
    linkElement.href = link;
    linkElement.target = "_blank";
    searchResultsElement.appendChild(linkElement);

    let brElement2 = document.createElement("br");
    searchResultsElement.appendChild(brElement2);

    let descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    descriptionElement.classList.add("link-description");
    searchResultsElement.appendChild(descriptionElement);
}


function searchEngine(event) {
    if (event.key === "Enter") {
        spinnerElement.classList.toggle("d-none");
        searchResultsElement.textContent = "";
        let searchItem = searchInputElement.value;
        let options = {
            method: "GET"
        };
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchItem;
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsondata) {
                spinnerElement.classList.toggle("d-none");
                let data = jsondata;
                console.log(data);
                let {
                    search_results
                } = data;
                //createAndAppend(search_results[0]);
                for (let eachResult of search_results) {
                    createAndAppend(eachResult);
                }
            });
    }
}







searchInputElement.addEventListener("keydown", searchEngine)