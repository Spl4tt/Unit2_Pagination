/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/***
 * Declarations
***/
const listItems = document.querySelector('.student-list').children;
const itemsPerPage = 10;


/**
 * Function to show clicked page. Shows as many items on the page as declared in 'itemsPerPage'
 * @param items - All items in the ul
 * @param page -  page to show
 */
function showPage(items, page) {
    const startIndex = (page * itemsPerPage)-itemsPerPage;// (page parameter * items per page) - items per page
    const endIndex = page * itemsPerPage;// page parameter * items per page

    // loop over all items, hide the ones not needed
    for(let i = 0; i<items.length; i++) {
        if(i>=startIndex && i<endIndex) {
            //show
            items[i].style.display = '';
        }
        else {
            //hide
            items[i].style.display = 'none';
        }
    }
}


/**
 * creates page buttons on the bottom of the page with click listener to change pages
 * @param list - All items in the ul
 */
function appendPageLinks(list) {
    const divPage = document.querySelector('.page');
    const div = document.createElement('div');
    div.className = 'pagination';
    divPage.appendChild(div);
    const ul = document.createElement('ul');
    const pageCount = Math.ceil(list.length / itemsPerPage);
    div.appendChild(ul);

    // Creates the "button" li with given pagenumber.
    function createLiWithLink(pageNumber) {
        // 'a' element with pagenumber
        const link = document.createElement('a');
        link.setAttribute('href', '#');
        link.textContent = pageNumber;
        //Apply class to first button, so that the style applies
        if(pageNumber === 1) {
            link.className = 'active';
        }
        // Clickevent: Remove all 'active' classes from 'a' elements and add the class to the clicked element
        link.addEventListener('click', (e) => {
            // Remove all active classes
            const activeElements = document.getElementsByClassName('active');
            for(let i = 0; i<activeElements.length; i++) {
                activeElements[i].classList.remove('active');
            }
            // add class 'active' to clicked element
            e.target.classList.add('active');
            // load page with selected items
            showPage(list, pageNumber);
        });
        // Create 'li' element and append the link, then return it
        const li = document.createElement('li');
        li.appendChild(link);
        return li;
    }

    for(let i = 1; i<=pageCount; i++) {
        ul.appendChild(createLiWithLink(i));
    }
}

/**
 * removes the pagination, if it exists
 */
function removePagination() {
    const divPagination = document.querySelector('.pagination');
    if(divPagination) {
        divPagination.parentNode.removeChild(divPagination);
    }
}

/**
 * Creates the pagination with given list of items
 * @param list
 * @param page
 */
function refreshPagination(list, page) {
    appendPageLinks(list);
    showPage(list, page);
    removeNoResultsLi();
    // Show "No results" message as li if nothing is in the list
    if(list.length === 0) {
        const liNoResults = document.createElement('li');
        liNoResults.className = 'no-results-class';
        liNoResults.textContent = 'No Results';
        listItems[0].parentNode.appendChild(liNoResults);
    }
}

/**
 * Remove "No results" li, if any exist
 */
function removeNoResultsLi() {
    const ul = document.querySelector('.student-list');
    const listNoResultsClass = ul.getElementsByClassName('no-results-class');
    while(listNoResultsClass.length > 0) {
        ul.removeChild(listNoResultsClass[0]);
    }
}

/**
 * Create the search bar with all functionality
 */
function createSearch() {
    // Select the div that will contain the search
    const divPageHeader = document.querySelector('.page-header');
    // Create search div that contains input and button
    const divStudentSearch = document.createElement('div');
    divStudentSearch.className = 'student-search';
    // create search input
    const inputStudentSearch = document.createElement('input');
    inputStudentSearch.type = 'text';
    inputStudentSearch.setAttribute('placeholder', 'Search for students...');

    // Search function called by input keyup event and search button press
    function search(searchText) {
        // Array of results
        const listResults = [];
        if(searchText.length === 0) {
            // if no seach text is given, refresh pagination with original full list
            showPage(listItems, 1);
            removePagination();
            refreshPagination(listItems, 1);
        } else {
            // Search all items with given string
            for (let i = 0; i < listItems.length; i++) {
                listItems[i].style.display = 'none';
                if (listItems[i].textContent.toLowerCase().includes(searchText.toLowerCase())) {
                    listItems[i].style.display = '';
                    // Push to array listResults
                    listResults.push(listItems[i]);
                }
            }
            // Remove old pagination and read with new list of matched items
            removePagination();
            refreshPagination(listResults, 1);
        }
    }

    // Keyup event: every keystroke starts the search
    inputStudentSearch.addEventListener('keyup', () => {
        search(inputStudentSearch.value);
    });

    // Create search button
    const btnSearch = document.createElement('button');
    btnSearch.textContent = 'Search';
    btnSearch.addEventListener('click', () => {
        search(inputStudentSearch.value);
    });

    // Add input and button to search div
    divStudentSearch.appendChild(inputStudentSearch);
    divStudentSearch.appendChild(btnSearch);

    // Add new search div to page
    divPageHeader.appendChild(divStudentSearch);
}

// Show first page initially
refreshPagination(listItems, 1);
// Create the search field
createSearch();