function calculateRecommendedFrontDimensions(height, width, depth) {
    const recommendedHeight = height - 0.4; // Smanjite visinu za 4mm
    const recommendedWidth = width - 0.4; // Smanjite širinu za 4mm
    return { recommendedHeight, recommendedWidth };
}
const kuhinjaDetailsDiv1 = document.getElementById('kuhinja-details');
const savedItems = JSON.parse(localStorage.getItem('items')) || [];
const kuhinjaData = JSON.parse(localStorage.getItem('kuhinjaData')); // Dodajte ovu liniju

if (savedItems.length > 0) {
    
    savedItems.forEach((item, index) => {
        const itemDetails = document.createElement('tr');
        itemDetails.className = 'item-details';
        
        // Izračunajte preporučene dimenzije fronta na osnovu unetih dimenzija
        const recommendedFrontDimensions = calculateRecommendedFrontDimensions(item.height, item.width, item.depth);
        
        itemDetails.innerHTML = `

           
    <td>
    Ime elemenat: ${item.height}cm x ${item.width}cm x ${item.depth}cm, cena vašeg elementa je ${item.price} evra.
    
</td>
<td>
    Front: visina ${item.message}cm
</td>
<td>
    Da li želite da vaš element ima nogice? Odgovor: ${item.answer}
    Da li želite da šarke budu sa leve ili desne strane? Odgovor: ${item.hinges}
</td>
<td>
    Izabrani dezen: ${item.dezen}
</td>
<td>
    <button class="order-button" data-index="${index}">Naruči</button>
    <button class="delete-button" data-index="${index}">Izbriši</button>
</td>

            
        `;
        kuhinjaDetailsDiv1.appendChild(itemDetails);

        /*dodato*/
        // Dodajte preporučene dimenzije u lokalno skladište za svaki element
    savedItems[index].recommendedFrontDimensions = recommendedFrontDimensions;
    localStorage.setItem('items', JSON.stringify(savedItems));
        /*dodato*/
    });
} else {
    kuhinjaDetailsDiv1.innerHTML = "<p>Nemate nijedan element u korpi.</p>";
}
// Ostatak vašeg koda...

// Ostatak vašeg koda...








const orderButtons = document.querySelectorAll('.order-button');
orderButtons.forEach(button => {
    button.addEventListener('click', function () {
        const itemIndex = parseInt(button.getAttribute('data-index'));
        const selectedItem = savedItems[itemIndex];
        
        // Prikazujemo popup
        showPopup();

        // Ažuriramo vrednosti u popup prozoru na osnovu izabranog elementa
        const popupContent = document.getElementById('popup-content');
        popupContent.innerHTML = `
            <span id="zatvori">&times;</span>
            <p>Unesite vaše podatke i potvrdite narudžbinu:</p>
            <p>Dimenzije elementa: ${selectedItem.height} x ${selectedItem.width} x ${selectedItem.depth}</p>
            <p>Cena elementa: ${selectedItem.price} evra</p>
            <p>Preporučene dimenzije fronta: visina ${selectedItem.recommendedFrontDimensions.recommendedHeight}cm i širina ${selectedItem.recommendedFrontDimensions.recommendedWidth}cm</p>
            <form action="https://formsubmit.co/filip.jovetic753@gmail.com" method="POST">
                <input type="hidden" name="height" value="${selectedItem.height}">
                <input type="hidden" name="width" value="${selectedItem.width}">
                <input type="hidden" name="depth" value="${selectedItem.depth}">
                <input type="hidden" name="price" value="${selectedItem.price}">
                <input type="hidden" name="recommendedHeight" value="${selectedItem.recommendedFrontDimensions.recommendedHeight}">
                <input type="hidden" name="recommendedWidth" value="${selectedItem.recommendedFrontDimensions.recommendedWidth}">
                <input type="hidden" name="_next" value="https://iwamotokogan.github.io/DIPO/thanks.html">
                <input type="text" name="ime" placeholder="Ime" required>
                <input type="text" name="prezime" placeholder="Prezime" required>
                <input type="email" name="email" placeholder="Email Adresa" required>
                <input type="tel" name="telefon" placeholder="Broj Telefona" required>
                <button type="submit">Naruči</button>
            </form>
        `;
    });
});
/*DODATOOOOOOO*/
/*ovan2*/

// Dodatak za "Naruči sve" dugme
const orderAllButton = document.getElementById('order-all-button');
orderAllButton.addEventListener('click', function () {
    // Prikazujemo popup
    showPopup();

    // Ažuriramo vrednosti u popup prozoru na osnovu svih elemenata
    const popupContent = document.getElementById('popup-content');
    popupContent.innerHTML = `
        <span id="zatvori">&times;</span>
        <p>Unesite vaše podatke i potvrdite narudžbinu:</p>
        ${savedItems.map((item, index) => `
            <p>Dimenzije elementa ${index + 1}: ${item.height} x ${item.width} x ${item.depth}</p>
            <p>Cena elementa ${index + 1}: ${item.price} evra</p>
            <p>Preporučene dimenzije fronta ${index + 1}: visina ${item.recommendedFrontDimensions.recommendedHeight}cm i širina ${item.recommendedFrontDimensions.recommendedWidth}cm</p>
            <!-- Dodajte ostale informacije koje želite prikazati -->
        `).join('')}
        <form action="https://formsubmit.co/filip.jovetic753@gmail.com" method="POST">
            ${savedItems.map((item, index) => `
                <input type="hidden" name="height_${index + 1}" value="${item.height}">
                <input type="hidden" name="width_${index + 1}" value="${item.width}">
                <input type="hidden" name="depth_${index + 1}" value="${item.depth}">
                <input type="hidden" name="price_${index + 1}" value="${item.price}">
                <input type="hidden" name="recommendedHeight_${index + 1}" value="${item.recommendedFrontDimensions.recommendedHeight}">
                <input type="hidden" name="recommendedWidth_${index + 1}" value="${item.recommendedFrontDimensions.recommendedWidth}">
            `).join('')}
            <input type="hidden" name="item_count" value="${savedItems.length}">
            <input type="hidden" name="items_data" value="${JSON.stringify(savedItems)}">
            <input type="text" name="ime" placeholder="Ime" required>
            <input type="text" name="prezime" placeholder="Prezime" required>
            <input type="email" name="email" placeholder="Email Adresa" required>
            <input type="tel" name="telefon" placeholder="Broj Telefona" required>
            <button type="submit">Naruči</button>
        </form>
    `;
});

/*ovan2*/


// JavaScript kod za prikazivanje/sakrivanje popup prozora
//const orderButton = document.getElementById('order-button');
const popup = document.getElementById('popup');
const confirmOrderButton = document.getElementById('confirm-order-button');

// Funkcija za prikazivanje popup prozora
function showPopup() {
    popup.style.display = 'block';
}

// Funkcija za sakrivanje popup prozora
function hidePopup() {
    popup.style.display = 'none';
}

// Postavljanje događaja "click" na dugme "Naruči" za prikazivanje popup prozora

//orderButton.addEventListener('click', showPopup);

// Postavljanje događaja "click" na dugme "Naruči" unutar popup prozora za sakrivanje popup prozora
confirmOrderButton.addEventListener('click', function () {
    hidePopup();
    sendOrderEmail();
});
// Postavljanje događaja "click" na X dugme za zatvaranje popup prozora
const closeButton = document.getElementById('close-popup');
closeButton.addEventListener('click', closePopup);
// Funkcija za zatvaranje popup prozora
function closePopup() {
    popup.style.display = 'none';
}







/**delete button************* */

// Prikazivanje modalnog prozora
function showDeleteModal() {
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'flex';
}

// Sakrivanje modalnog prozora
function hideDeleteModal() {
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'none';
}

// Dohvatimo sva dugmad "Izbriši"
const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Prikazujemo modalni prozor kada korisnik klikne "Izbriši"
        
        showDeleteModal();

        // Obrada klika na dugme "Da"
        const deleteYesButton = document.getElementById('deleteYes');
        deleteYesButton.addEventListener('click', function () {
            // Ovde treba da dodate logiku za brisanje elementa
           hideDeleteModal();
            location.reload();
            // Implementirajte brisanje elementa iz liste (savedItems)
            const itemIndex = parseInt(button.getAttribute('data-index'));
            if (!isNaN(itemIndex) && itemIndex >= 0 && itemIndex < savedItems.length) {
        savedItems.splice(itemIndex, 1); // Uklonite element iz niza
        localStorage.setItem('items', JSON.stringify(savedItems)); // Ažurirajte lokalno skladište
    }
            // Sakrijte modalni prozor nakon brisanja
              
        });

        // Obrada klika na dugme "Ne"
        const deleteNoButton = document.getElementById('deleteNo');
        deleteNoButton.addEventListener('click', function () {
            // Samo sakrijemo modalni prozor
            hideDeleteModal();
        });
    });
});

// Dohvatanje "X" simbola i dodavanje događaja za zatvaranje modalnog prozora
const closeModalButton = document.querySelector('.close-modal');
closeModalButton.addEventListener('click', hideDeleteModal);

/**delete button************* */



/*sumiranje cena svih elemenata */
let totalCost = 0;
savedItems.forEach(item => {
    totalCost += item.price;
});
const totalCostElement = document.getElementById('total-cost');
totalCostElement.textContent = `Ukupna cena: ${totalCost} evra`;

/*sumiranje cena svih elemenata */












/*DODATO BRISANJE ZA SUBMITOVANJEeeeEEE NASTAVITI DALJE HOSTOVATI OVO NA GITHUB I VIDETI DA LI RADI**********
*****************************************************************/
/**************************************PROCITATI GORE*********************************************************/
// Funkcija za brisanje elementa iz korpe
function deleteItem(index) {
    savedItems.splice(index, 1); // Uklonite element iz niza
    localStorage.setItem('items', JSON.stringify(savedItems)); // Ažurirajte lokalno skladište

    // Ovde možete dodati kod za osvežavanje prikaza korpe ili bilo koji drugi odgovarajući korak
    location.reload(); // Osveži stranicu kako bi se prikaz korpe ažurirao
}

// ...

// Unutar funkcije za potvrdu narudžbine (kada se klikne na dugme "Naruči"), dodajte sledeći kod:
confirmOrderButton.addEventListener('click', function () {
    // ...
    // Vaša postojeća logika za slanje podataka putem forme
    // ...

    // Nakon uspešnog slanja, brišemo element iz korpe
    deleteItem(itemIndex);

    // Nakon brisanja, preusmeravamo korisnika na stranicu "https://iwamotokogan.github.io/DIPO/thanks.html"
    window.location.href = "https://iwamotokogan.github.io/DIPO/thanks.html";
});
