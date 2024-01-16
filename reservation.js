document.addEventListener('DOMContentLoaded', function () {
    // Načtení rezervací z local storage
    let reservations = JSON.parse(localStorage.getItem('reservations')) || {};

    // Funkce pro aktualizaci seznamu rezervací
    function updateMyReservations() {
        const myReservationsList = document.getElementById('myReservations');
        myReservationsList.innerHTML = '';

        for (const key in reservations) {
            if (reservations[key]) {
                const listItem = document.createElement('li');
                listItem.textContent = key;
                listItem.className = 'cursor-pointer text-blue-500 hover:underline';
                listItem.addEventListener('click', function () {
                    // Při kliknutí na rezervaci v seznamu se zavolá funkce pro úpravu
                    editReservation(key);
                });
                myReservationsList.appendChild(listItem);
            }
        }
    }

    // Funkce pro aktualizaci nabídky editace
    function updateEditOptions() {
        const timeSelect = document.getElementById('editTime');
        timeSelect.innerHTML = '';

        for (const key in reservations) {
            if (reservations[key]) {
                const timeOption = document.createElement('option');
                timeOption.value = key.split(' ')[1];
                timeOption.textContent = key.split(' ')[1];
                timeSelect.appendChild(timeOption);
            }
        }
    }

    // Funkce pro odebrání rezervace z nabídky
    function removeTimeOption(time) {
        const timeSelect = document.getElementById('time');
        const optionToRemove = timeSelect.querySelector(`option[value="${time}"]`);

        if (optionToRemove) {
            timeSelect.removeChild(optionToRemove);
        }
    }

    // Funkce pro úpravu rezervace
    function editReservation(key) {
        const editDate = document.getElementById('editDate');
        const editTime = document.getElementById('editTime');
        const [date, time] = key.split(' ');

        // Nastavení aktuálních hodnot pro editaci
        editDate.value = date;
        editTime.value = time;

        // Odstranění původní rezervace z nabídky
        removeTimeOption(time);

        // Zrušení původní rezervace
        reservations[key] = false;
        localStorage.setItem('reservations', JSON.stringify(reservations));

        // Aktualizace nabídky editace
        updateEditOptions();
    }

    // Inicializace seznamu rezervací a nabídky editace
    updateMyReservations();
    updateEditOptions();

    // Obsluha tlačítka pro potvrzení rezervace
    document.getElementById('reserveBtn').addEventListener('click', function () {
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        const key = `${date} ${time}`;

        // Kontrola, zda termín není již rezervovaný
        if (!reservations[key]) {
            // Uložení rezervace do local storage
            reservations[key] = true;
            localStorage.setItem('reservations', JSON.stringify(reservations));

            // Odebrání rezervované hodiny z nabídky
            removeTimeOption(time);

            // Aktualizace seznamu rezervací
            updateMyReservations();

            alert('Rezervace úspěšně potvrzena!');
        } else {
            alert('Termín je již rezervovaný. Vyberte prosím jiný termín.');
        }
    });

    // Obsluha tlačítka pro editaci rezervace
    document.getElementById('editBtn').addEventListener('click', function () {
        const editDate = document.getElementById('editDate').value;
        const editTime = document.getElementById('editTime').value;

        const editKey = `${editDate} ${editTime}`;

        // Kontrola, zda termín není již rezervovaný
        if (!reservations[editKey]) {
            // Uložení upravené rezervace do local storage
            reservations[editKey] = true;
            localStorage.setItem('reservations', JSON.stringify(reservations));

            // Aktualizace seznamu rezervací
            updateMyReservations();
            updateEditOptions();

            alert('Rezervace úspěšně upravena!');
        } else {
            alert('Termín je již rezervovaný. Vyberte prosím jiný termín pro úpravu.');
        }
    });
});
