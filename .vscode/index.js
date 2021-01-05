// Get element by Id which is container
const container = document.querySelector('.container');
// Get element the classname is seat and not occupied
const seats  = document.querySelectorAll('.row .seat:not(.occupied)');
// get element "count" to calculate the number of tickets
const count = document.getElementById('count');
// Get total element by the name total to calculate the total value of tickets
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');
// Movie class has values for tickets and it is converting into integer
var ticketPrice = +movieSelect.value; /// Changes string to number 
// Initializing populateUI function
populateUI();
// This function will set data to local storage
function setMovieData(movieIndex,moviePrice)
{
    // setItem saves the index of movie to local storage
  localStorage.setItem('selectedMovieIndex',movieIndex);
  //Setitem saves the price of movie into local storage
  localStorage.setItem('selectedMoviePrice',moviePrice);
}
// This function shows the element of selected seats as the array 
function updateSelectedCount()
{
    // Intializing the selected seats in the table
    const selectedSeats =   document.querySelectorAll('.row .seat.selected');
    // This one shows the index of selected elements in the list
    const seatsIndex = [...selectedSeats].map(function(seat)
    {
      return [...seats].indexOf(seat);
    });
    // It saves data to localStorage
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
    // The element of the count seat is equal to the length of selected seats
    const selectedSeatsCount = selectedSeats.length;
    // Updating the value of count
    count.innerText = selectedSeatsCount;
    // Updating the value of total
    total.innerText = selectedSeatsCount * ticketPrice 
};

movieSelect.addEventListener('change',function(e)
{   
    // Updating the ticket price when movie select changes every time
    ticketPrice =   +e.target.value  
    // Updating index and value for local storage
    setMovieData(e.target.selectedIndex,e.target.value)
    // Updating count and total for local storage as well
    updateSelectedCount();
});

container.addEventListener('click',function(e)
{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied'))
    {
        // This will call the classname selected which is designed in the css file with the color of blue for selected seats
        e.target.classList.toggle('selected');
        // Update the selected seats as well
        updateSelectedCount();
    }
  
});

function populateUI()
{
   // Fetching from local storage and checking if it is not null or less than 0
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats',));
   if(selectedSeats !== null && selectedSeats.length>0)
   {
       seats.forEach((seat,index) =>
       {
           if(selectedSeats.indexOf(index) > -1)
           {
               seat.classList.add('selected');

           }
       });
   }

   /// Fetching the index of movie from localStorage
   const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
   if(selectedMovieIndex !== null)
   {
        movieSelect.selectedIndex = selectedMovieIndex;

   }
}
// Initial count and total set
updateSelectedCount();


