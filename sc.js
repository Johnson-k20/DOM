

//  Step 1: Select the DOM Elements 
 //  use document.getElementById() to select the elements we want to interact with.
const myHeader = document.getElementById('myHeader');
const changeTextBtn = document.getElementById('changeTextBtn');
const itemForm = document.getElementById('itemForm');
const itemInput = document.getElementById('itemInput');
const itemList = document.getElementById('itemList');
const removeBtn = document.getElementById('removeBtn');
const itemCountSpan = document.getElementById('itemCount');



// 1. Change header text when button is clicked
// We define an array of alternative titles to cycle through.
const titleOptions = [
  "Hello World!",
  "DOM Manipulation Header",
  "Learning Javascript!",
  "Gomycode Playground"
];
let currentTitleIndex = 0; // Tracks which title is currently active

// We attach a 'click' event listener to the text switcher button.
changeTextBtn.addEventListener('click', function() {
  // Cycle the index (increments and wraps back to 0 at the end of the array)
  currentTitleIndex = (currentTitleIndex + 1) % titleOptions.length;
  
  // Set the text content of the <h1> header element
  myHeader.textContent = titleOptions[currentTitleIndex];
});

// 2. Change header color on mouse movement

// We listen for the 'mousemove' event directly on the <h1> header element.
myHeader.addEventListener('mousemove', function(event) {
  // event.offsetX and event.offsetY represent the pointer's position relative to the header.
  const xCoord = event.offsetX;
  const yCoord = event.offsetY;

  // We convert the coordinates into numbers between 0 and 255.
  // We divide the coordinate by the element's width/height to get a ratio, then multiply by 255.
  const red = Math.round((xCoord / myHeader.offsetWidth) * 255);
  const green = Math.round((yCoord / myHeader.offsetHeight) * 255);
  const blue = 150; // Keep blue constant at 150

  // Apply the dynamic RGB color directly to the header element's text color style
  myHeader.style.color = `rgb(${red}, ${green}, ${blue})`;
});

// We clear the color styling when the mouse cursor leaves the header element.
myHeader.addEventListener('mouseleave', function() {
  myHeader.style.color = ''; // Clears the inline color style, reverting back to default
});


// 3. Add new list items from the form input

// We listen to the form's 'submit' event.
itemForm.addEventListener('submit', function(event) {
  // CRITICAL: Prevent the browser from refreshing the page on form submit
  event.preventDefault();

  // Read the value entered by the user inside the text box and remove outer spaces
  const textValue = itemInput.value.trim();

  // Verify the input is not empty
  if (textValue !== "") {
    // A. Create a brand-new <li> element node
    const newLi = document.createElement('li');

    // B. Set the text contents of the new <li> element
    newLi.textContent = textValue;

    // C. Append (insert) the <li> element as a child of the <ul> container
    itemList.appendChild(newLi);

    // D. Clear the input field for the next entry
    itemInput.value = "";

    // E. Recount the list items
    updateItemCount();
  }
});

// 4. Remove first list item

// We attach a click event listener to the remove button.
removeBtn.addEventListener('click', function() {
  // Select the first <li> child element inside the list parent
  const firstItem = itemList.querySelector('li');

  // Verify that an item exists before attempting to remove it
  if (firstItem) {
    // Delete the element from the DOM structure
    firstItem.remove();

    // Recount the list items
    updateItemCount();
  } else {
    // Alert the user if the list is empty
    alert("The list is empty! Add items first.");
  }
});


// 5. Count total list items
// A simple function that counts active <li> elements inside the list and updates the page.
function updateItemCount() {
  // Select all <li> elements inside the list
  const listItems = itemList.querySelectorAll('li');

  // Retrieve the length of the listItems collection
  const totalCount = listItems.length;

  // Write the total count directly into the span tag
  itemCountSpan.textContent = totalCount;
}

// Initial count check on page load (starts at 0)
updateItemCount();


