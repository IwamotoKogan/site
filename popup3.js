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
 <td class="product-thumbnail ">
                <img src="images/product-3.png" alt="Image" class="img-fluid">
            </td>
            <td class="product-name ">
                <h2 class="h5 text-black">Ime elementa</h2>
            </td>
            <td class="product-name ">
                <h2 class="h5 text-black">Visina: ${item.height}cm x širina: ${item.width}cm x dubina: ${item.depth}cm</h2>
            </td>
            <td class=" ">Izabrani dezen:<strong>${item.dezen}</strong></td>
            <td class=" ">
               Front: ${item.message}cm
            </td>
            <td class="product-name ">
                <h2 class="h5 text-black">Pozicija šarki? ${item.hinges}</h2>
                <h2 class="h5 text-black">Potrebne nogice? ${item.answer}</h2>
            </td>
            <td class="product-name ">cena vašeg elementa je<strong> ${item.price}</strong>  evra</td>
               
<<button type="button" class="btn btn-danger delete-button custom-delete-button" data-index="${index}" data-toggle="modal" data-target="#exampleModalCenter">
 Izbriši
</button>


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
    kuhinjaDetailsDiv1.innerHTML = `
    <tr>
            <td class="product-thumbnail">
                <img src="images/empty.png" alt="Image" class="img-fluid">
            </td>
            <td class="product-name">
                <h2 class="h5 text-black">Nemate nijedan element u korpi.</h2>
            </td>
            <td>$00.00</td>
            <td>
                <div class="input-group mb-3 d-flex align-items-center quantity-container" style="max-width: 120px;">
                    <div class="input-group-prepend">
                        <button class="btn btn-outline-black decrease" type="button">&minus;</button>
                    </div>
                    <input type="text" class="form-control text-center quantity-amount" value="1" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
                    <div class="input-group-append">
                        <button class="btn btn-outline-black increase" type="button">&plus;</button>
                    </div>
                </div>
            </td>
            <td>prazno</td>
            <td><a href="#" class="btn btn-black btn-sm"></a></td>
        </tr>
    `;
}
// Ostatak vašeg koda...

// Ostatak vašeg koda...








/*const orderButtons = document.querySelectorAll('.order-button');
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
                <input type="text" name="prezime" placeholder="Prezime#####" required>
                <input type="email" name="email" placeholder="Email Adresa" required>
                <input type="tel" name="telefon" placeholder="Broj Telefona" required>
                <button type="submit">Naruči</button>
            </form>
        `;
    });
});*/
/*DODATOOOOOOO*/
/*ovan2*/

// Dodatak za "Naruči sve" dugme
/*const orderAllButton = document.getElementById('order-all-button');
orderAllButton.addEventListener('click', function () {
    // Prikazujemo popup
    showPopup();

    // Ažuriramo vrednosti u popup prozoru na osnovu svih elemenata
    const popupContent = document.getElementById('popup-content');
    popupContent.innerHTML = `
        <span id="zatvori">&times;</span>
        <p>Unesite vaše podatke i potvrdite narudžbinu:</p>
        ${savedItems.map((item, index) => `
            
            <!-- Dodajte ostale informacije koje želite prikazati -->
        `).join('')}
        <form action="https://formsubmit.co/filip.jovetic753@gmail.com" method="POST">
            ${savedItems.map((item, index) => `
                <input type="hidden" name="height_${index + 1}" value="${item.height}">
                <input type="hidden" name="width_${index + 1}" value="${item.width}">
                <input type="hidden" name="depth_${index + 1}" value="${item.depth}">
                <input type="hidden" name="price_${index + 1}" value="${item.price}">
                <input type="hidden" name="message_${index + 1}" value="${item.message}">
                <input type="hidden" name="dezen_${index + 1}" value="${item.dezen}">
                <input type="hidden" name="hinges_${index + 1}" value="${item.hinges}">
                <input type="hidden" name="answer_${index + 1}" value="${item.answer}">
                
            `).join('')}
            <!--<input type="hidden" name="item_count" value="${savedItems.length}">
            <input type="hidden" name="items_data" value="${JSON.stringify(savedItems)}">-->
            <input type="text" name="ime" placeholder="Ime" required>
            <input type="text" name="prezime" placeholder="Prezimeeeeeee" required>
            <input type="email" name="email" placeholder="Email Adresa" required>
            <input type="tel" name="telefon" placeholder="Broj Telefona" required>
            <button type="submit">Naruči</button>
        </form>
    `;
});*/

/*ovan2*/


// JavaScript kod za prikazivanje/sakrivanje popup prozora
//const orderButton = document.getElementById('order-button');
const popup = document.getElementById('popup');


// Funkcija za prikazivanje popup prozora
/*function showPopup() {
    popup.style.display = 'block';
}*/

// Funkcija za sakrivanje popup prozora
/*function hidePopup() {
    popup.style.display = 'none';
}*/

// Postavljanje događaja "click" na dugme "Naruči" za prikazivanje popup prozora

//orderButton.addEventListener('click', showPopup);

// Postavljanje događaja "click" na dugme "Naruči" unutar popup prozora za sakrivanje popup prozora

// Postavljanje događaja "click" na X dugme za zatvaranje popup prozora





/**delete button************* */



// Dohvatimo sva dugmad "Izbriši"
const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Prikazujemo modalni prozor kada korisnik klikne "Izbriši"
        
      

        // Obrada klika na dugme "Da"
        const deleteYesButton = document.getElementById('deleteYes');
        deleteYesButton.addEventListener('click', function () {
            // Ovde treba da dodate logiku za brisanje elementa
           
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


