// Eine Liste aller Posts und ihrer Modalen
var postModalMap = {
    'post1': 'myModal1',
    'post2': 'myModal2',
    'post3': 'myModal3',
};

// Ein Array, um die IDs aller Modalen zu speichern
var allModals = [];

// Durchlaufen aller Posts im postModalMap
for(const postId in postModalMap) {
    // Holen Sie sich das Post-Item, das das Modal öffnet
    var postItem = document.getElementById(postId);
    var modalId = postModalMap[postId];
    var modal = document.getElementById(modalId);
    var span = modal.getElementsByClassName("close")[0];

    // Füge die ID des Modals zum allModals-Array hinzu
    allModals.push(modal);

    // Wenn der Benutzer auf das Post-Item klickt, öffnen Sie das Modal
    postItem.onclick = (function(modal) {
        return function() {
            modal.className = 'modal';
        }
    })(modal);

    // Wenn der Benutzer auf <span> (x) klickt, schließen Sie das Modal
    span.onclick = (function(modal) {
        return function() {
            modal.className = 'modal hidden';
        }
    })(modal);
}

// Get the modal
var tableModal = document.getElementById("myTableModal");

// Get the <span> element that closes the modal
var tableCloseBtn = document.getElementsByClassName("tableClose")[0];

var modalLabelValue = document.getElementById("modalLabelValue")
var tableSubmitBtn = document.getElementById("tableSubmit")
function generateTimeSlots() {
    var tableBody = document.getElementById('timeSlots');
    var startTime = 9; // Startzeit (Stunde)
    var endTime = 19;  // Endzeit (Stunde)

    for (var hour = startTime; hour <= endTime; hour++) {
        // Erzeugt die volle Stunde nur einmal pro Stunde
        var fullHour = `${hour < 10 ? '0' + hour : hour}:00`;

        for (var minutes = 0; minutes < 60; minutes += 20) {
            // Erzeugt die Zeit im Format hh:mm
            var time = `${hour < 10 ? '0' + hour : hour}:${minutes === 0 ? '00' : minutes}`;

            // Fügt die volle Stunde nur zum ersten Mal in der Stunde hinzu
            var hourCell = minutes == 0 ? `<td rowspan="3">${fullHour}</td>` : '';

            var row = `<tr class="${hour % 2 === 0 ? 'evenHour' : 'oddHour'}">${hourCell}<td>${time}</td>
                                  <td class="tdValue"><button class="addNameBtn">+</button></td>
                                  <td class="tdValue"><button class="addNameBtn">+</button></td>
                                  <td class="tdValue"><button class="addNameBtn">+</button></td>
                                  <td class="tdValue"><button class="addNameBtn">+</button></td>
                              </tr>`;
            tableBody.innerHTML += row;
        }
    }

    tableBody.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('addNameBtn')) {
            var currentButton = e.target;
            tableModal.style.display = "block";

            // Zuerst entfernen wir alle früheren EventListeners
            var newSubmit = tableSubmitBtn.cloneNode(true);
            tableSubmitBtn.parentNode.replaceChild(newSubmit, tableSubmitBtn);
            tableSubmitBtn = newSubmit;

            tableSubmitBtn.onclick = function () {
                var ausgabe = modalLabelValue.value;
                if (ausgabe.trim() !== '') {
                    var parentTd = currentButton.parentElement;
                    parentTd.textContent = ausgabe;
                }
                modalLabelValue.value = "";
                tableModal.style.display = "none";
                return false;
            };
        }
    });
}
// Aufruf der Funktion zum Generieren der Zeitstempel
generateTimeSlots();

// When the user clicks on <span> (x), close the modal
tableCloseBtn.onclick = function() {
    tableModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    allModals.forEach(function(modal) {
        if (event.target === modal) {
            modal.className = 'modal hidden';
        }
    })

    if (event.target === tableModal) {
        tableModal.style.display = "none";
    }
}

// Hole den Button "Termin buchen" und den Terminbereich
const bookButton = document.querySelector("button");
const terminBereich = document.querySelector(".separator");

// Event Listener für den Button "Termin buchen"
bookButton.addEventListener("click", () => {
  // Überprüfe, ob der Terminbereich bereits sichtbar ist
  if (terminBereich.style.display === "none" || terminBereich.style.display === "") {
    // Mache den Terminbereich sichtbar
    terminBereich.style.display = "block";
  }
});

