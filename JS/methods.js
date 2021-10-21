const searchResultCount = document.getElementById("search-result-count");
const searchItemShower = document.getElementById("search-item-shower");
const searchField = document.getElementById("search-text");
const searchResult = document.getElementById("search-result");
const spinner = document.getElementById("spinner");
const search_button = document.getElementById("button-addon2");
let searchText;

search_button.addEventListener("click", () => {
  searchText = searchField.value;
  searchField.value = "";
  spinner.style.display = "flex";
  searchResultCount.style.display = "none";
  searchItemShower.style.display = "none";
  searchResult.textContent = "";
  fetchData(searchText);
});

const fetchData = (searchText) => {
  fetch(`https://openlibrary.org/search.json?q=${searchText}`)
    .then((data) => data.json())
    .then((data) => showResult(data));
};

const showResult = (data) => {
  console.log(data);
  spinner.style.display = "none";
  searchResultCount.style.display = "block";
  searchItemShower.style.display = "block";
  /** Set total search result count */
  const totalBookFound = data.num_found;

  if (totalBookFound != 0)
    searchResultCount.innerText = `Total Book Found: ${totalBookFound}`;
  else searchResultCount.innerText = "No Result Found";
  searchItemShower.innerText = `Search Results for: \"${searchText}\"`;
  /**Set search result */

  for (let x = 0; x < data.docs.length; x++) {
    const cover_i = data.docs[x].cover_i;
    const subtitle = data.docs[x].subtitle;
    const title = data.docs[x].title;
    const bookName = (subtitle === undefined)? title : subtitle;
    const author_name = data.docs[x].author_name;
    const firstPublished = (data.docs[x].first_publish_year === undefined)?Unknown: data.docs[x].first_publish_year;
    

    //******get the author name */
    let authorName = "by ";
    if (author_name != undefined) {
      for (let i = 0; i < author_name.length; i++) {
        authorName += author_name[i];
        if (i < author_name.length - 1) {
          authorName += " ,";
        }
      }
    } else {
      authorName += "Unknow Author";
    }
    /************************************************************************************************ */
    const cover_url = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `<div class="card">
    <img style="height:15rem" src="${cover_url}" class="img-fluid p-3" alt="">
    <div class="card-body">
        <h5 class="card-title fw-bold">${bookName}</h5>
        <p class="card-text ">${authorName}</p>
        <p class="fs-6 fw-light"> First published in ${firstPublished}</p>
    </div>
    </div>`;
    searchResult.appendChild(div);
  }
};
