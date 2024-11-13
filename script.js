const API_URL = "https://striveschool-api.herokuapp.com/books";

async function fetchBooks() {
    try {
        const response = await fetch(API_URL);
        const books = await response.json();
        renderBooks(books);
    } catch (error) {
        console.error("Errore nel recupero dei libri:", error); 
    }
}

function renderBooks(books) {
    const booksRow = document.getElementById("books-row");
    booksRow.innerHTML = ""; 
    books.forEach(book => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";
        col.innerHTML = `
            <div class="card">
                <img src="${book.img}" class="card-img-top" alt="${book.title}">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5> <!-- Corretto il tag chiuso mancante -->
                    <p class="card-text">Prezzo: €${book.price}</p>
                    <button class="btn btn-danger discard-btn">Scarta</button>
                    <button class="btn btn-primary add-to-cart-btn">Compra ora</button>
                </div>
            </div>`;

        
        col.querySelector(".discard-btn").addEventListener("click", () => {
            col.remove();
        });
        col.querySelector(".add-to-cart-btn").addEventListener("click", () => { 
            alert(`Hai aggiunto "${book.title}" al carrello!`)
                        addToCart(book);
        });

        booksRow.appendChild(col);
    });
}

let cart = JSON.parse(localStorage.getItem("cart")) || []; 

function renderCart() { 
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = "";
    cart.forEach((book, index) => {
        const listItem = document.createElement("li"); 
        listItem.className = "list-group-item d-flex justify-content-between align-items-center"; 
        listItem.innerHTML = `
            ${book.title} - €${book.price}
            <button class="btn btn-sm btn-danger remove-from-cart-btn">Rimuovi</button>`; 
        
        listItem.querySelector(".remove-from-cart-btn").addEventListener("click", () => {
            removeFromCart(index);
        });

        cartList.appendChild(listItem);
    });

    localStorage.setItem("cart", JSON.stringify(cart)); 
}

function addToCart(book) { 
    cart.push(book);
    renderCart();
}

function removeFromCart(index) { 
    cart.splice(index, 1);
    renderCart();
}


document.addEventListener("DOMContentLoaded", () => {
    fetchBooks(); 
    renderCart(); 
});

addEventListener()