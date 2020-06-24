/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const listItems = document.querySelector('.student-list').children;
const itemsPerPage = 10;




/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     x Keep in mind that with a list of 54 students, the last page
       will only display four.
     x Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
function showPage(items, page) {
    const startIndex = (page * itemsPerPage)-itemsPerPage;// (page parameter * items per page) - items per page
    const endIndex = page * itemsPerPage;//page parameter * items per page

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



/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
function appendPageLinks(list) {
    const div = document.createElement('div');
    const ul = document.createElement('ul');
    const pageCount = Math.ceil(list.length / itemsPerPage);
    div.appendChild(ul);

    //TODO Finish this, point 5 in treehouse
    function createLiWithLink(pageNumber) {
        // 'A' element with pagenumber
        const link = document.createElement('a');
        link.setAttribute('href', '#');
        link.value = pageNumber;
        //first page must be selected initially
        if(pageNumber === 1) {
            link.className = 'active';
        }
        // Clickevent: Remove all 'active' classes from A elements and add the class to the clicked element
        link.addEventListener('click', (e) => {
            //Remove all active classes
            const activeElements = document.getElementsByClassName('active');
            for(let i = 0; i<activeElements.length; i++) {
                activeElements[i].className = '';
            }
            // add class 'active' to clicked element
            e.target.className = 'active';
        });
        const li = document.createElement('li');
        li.appendChild(link);
        return li;
    }

    for(let i = 1; i<=pageCount; i++) {
        ul.appendChild(createLiWithLink(i));
    }

}





// Remember to delete the comments that came with this file, and replace them with your own code comments.
