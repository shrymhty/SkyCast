const searchBtn = document.getElementById('search-svg');
const searchInput = document.getElementById('search-input');

// When search icon is clicked
searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    searchInput.classList.toggle('show');
    if (searchInput.classList.contains('show')) {
        searchInput.style.display = 'block';
        searchInput.focus();
        searchBtn.style.display = 'none';
    } else {
        setTimeout(() => {
            searchInput.style.display = 'none';
        }, 300); 
    }
});

// When Enter is pressed inside input
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        
        searchInput.classList.remove('show');
        searchInput.style.display = 'none';
        searchBtn.style.display = 'block';

        // (Optional) — you can capture the searched city value
        const city = searchInput.value;
        console.log("Searched for:", city);
        searchInput.value = ''; // Clear the input
    }
});