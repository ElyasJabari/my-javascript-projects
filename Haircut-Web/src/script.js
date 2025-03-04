var postModalMap = {
    'post1': 'myModal1',
    'post2': 'myModal2',
    'post3': 'myModal3',
};

// Ein Array, um die IDs aller Modalen zu speichern
var allModals = [];

for(const postId in postModalMap) {
    var postItem = document.getElementById(postId);
    var modalId = postModalMap[postId];
    var modal = document.getElementById(modalId);
    var span = modal.getElementsByClassName("close")[0];

    allModals.push(modal);

    postItem.onclick = (function(modal) {
        return function() {
            modal.className = 'modal';
        }
    })(modal);

    span.onclick = (function(modal) {
        return function() {
            modal.className = 'modal hidden';
        }
    })(modal);
}

var tableModal = document.getElementById("myTableModal");

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
            var time = `${hour < 10 ? '0' + hour : hour}:${minutes === 0 ? '00' : minutes}`;

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
generateTimeSlots();

tableCloseBtn.onclick = function() {
    tableModal.style.display = "none";
}

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

const bookButton = document.querySelector("button");
const terminBereich = document.querySelector(".separator");

bookButton.addEventListener("click", () => {
  if (terminBereich.style.display === "none" || terminBereich.style.display === "") {
    terminBereich.style.display = "block";
  }
});

