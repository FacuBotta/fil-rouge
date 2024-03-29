/* <<<<<DESCRIPTION>>>>> */
fetch("../Controllers/description.php", {
    method: "POST"
})
    .then((response) => response.json())
    .then((data) => {
        getDataDescription(data);
    });

function getDataDescription(description) {
    const presentation = JSON.parse(description[0].presentation);
    const btn_description = document.getElementById('btn_description');
    const form_description = document.getElementById('form_description');
    btn_description.addEventListener('click', () => {
        form_description.classList.toggle('hidden_element');
        document.getElementById('compagnie_description_fr').textContent = presentation.description_fr;
        document.getElementById('compagnie_description_esp').textContent = presentation.description_esp;

    });
};
/* <<<<<SPECTACLES>>>>> */
fetch("../Controllers/spectacles.php", {
    method: "POST"
})
    .then((response) => response.json())
    .then((data) => {
        getDataSpectacles(data);
    });

// Function to open or close modal elements
function handleVisivility(element) {
    if (element.style.opacity == 0) {
        element.style.opacity = 1;
        element.style.visibility = 'visible';
    } else {
        element.style.opacity = 0;
        element.style.visibility = 'hidden';
    };
};

const container_spectacles = document.getElementById('admin_spectacles');
function getDataSpectacles(spectacles) {
    spectacles.forEach(spectacle => {
        const event_box = container_spectacles.appendChild(document.createElement('div'));
        event_box.setAttribute('class', 'admin_item');
        event_box.setAttribute('id', `${spectacle.id_spectacle}`);
        event_box.style.backgroundImage = `url(${spectacle.affiche_spectacle})`;
        let hidden_div = event_box.appendChild(document.createElement('div'));
        hidden_div.setAttribute('class', 'hidden_div');
        let delete_div = hidden_div.appendChild(document.createElement('div'));
        delete_div.setAttribute('class', 'delete_div');
        let btn_delete = delete_div.appendChild(document.createElement('span'));
        btn_delete.setAttribute('class', 'material-symbols-rounded');
        btn_delete.innerHTML = 'delete';

        let update_div = hidden_div.appendChild(document.createElement('div'));
        update_div.setAttribute('class', 'update_div');
        let btn_update = update_div.appendChild(document.createElement('span'));
        btn_update.setAttribute('class', 'material-symbols-rounded');
        btn_update.innerHTML = 'edit';

        event_box.addEventListener('mouseenter', (e) => {
            e.preventDefault();
            handleVisivility(hidden_div);
        });
        event_box.addEventListener('mouseleave', (e) => {
            e.preventDefault();
            handleVisivility(hidden_div);
        });

        /* DELETE REQUEST */
        btn_delete.addEventListener('click', () => {
            //Showing the form
            const modal_delete = document.getElementById('modal_delete');
            const btn_close_delete = document.getElementById('btn_close_delete');
            handleVisivility(modal_delete);

            // Setting the action to the delete form in ./views/admin.php
            delete_form.setAttribute('action', '../Controllers/spectacles.php')

            // Setting the values to the request
            const form_delete = document.getElementById('form_delete');
            const form_delete_file = document.getElementById('form_delete_file');
            const form_delete_files = document.getElementById('form_delete_files');
            form_delete.setAttribute('value', `${spectacle.id_spectacle}`);
            form_delete_file.setAttribute('value', `${spectacle.affiche_spectacle}`);
            form_delete_files.setAttribute('value', `${spectacle.images_spectacle}`);
            // Confirmation message
            let titre = document.getElementById('titre_delete');
            titre.textContent = `Supprimer ${spectacle.titre_spectacle} de spectacles?`
            // Close delete form 'cancel'
            btn_close_delete.addEventListener('click', () => {
                form_delete.setAttribute('value', '');
                handleVisivility(modal_delete);
            });
        });

        /* UPDATE REQUEST */
        // Showing the update form after click
        btn_update.addEventListener('click', () => {
            const modal_update = document.getElementById('modal_update_spectacle');
            handleVisivility(modal_update);

            // Setting the value of form_update to handle it in the PHP controller
            // This value will be used as a condition in the update request to take the correct 'spectacle'
            const form_update = document.getElementById('id_update_spectacle');
            form_update.setAttribute('value', `${spectacle.id_spectacle}`);

            // Setting the values for the form fields
            document.getElementById('titre_spectacle').setAttribute("value", `${spectacle.titre_spectacle}`);
            document.getElementById('description_spectacle_fr').textContent = spectacle.description_spectacle.description_fr;
            document.getElementById('site_spectacle_fr').textContent = spectacle.site_spectacle.site_fr;
            document.getElementById('description_spectacle_esp').textContent = spectacle.description_spectacle.description_esp;
            document.getElementById('site_spectacle_esp').textContent = spectacle.site_spectacle.site_esp;
            document.getElementById('video_spectacle').setAttribute("value", `${spectacle.video_spectacle}`);
            document.getElementById('old_affiche_spectacle').setAttribute("value", `${spectacle.affiche_spectacle}`);
            document.getElementById('old_files_spectacle').setAttribute("value", spectacle.images_spectacle);

            // Creating an array from the infos
            const btn_ajouter_new_info = document.getElementById("ajouter_new_info");
            const form_info = document.getElementById('form_info');
            const info_array = Object.entries(spectacle.info_spectacle);
            let new_field_count = info_array.length + 1;
            let action = 'update';
            for (let i = 1; i < info_array.length + 1; i++) {
                infoFieldAdder(i, form_info, action, spectacle);
            };
            btn_ajouter_new_info.addEventListener('click', (e) => {
                e.preventDefault();
                infoFieldAdder(new_field_count, form_info);
                new_field_count++;
            });
        });
    });
};

function infoFieldAdder(counter, container, action='', tab='null') {
    // Creating a new field container and its inputs
    const new_field_info = document.createElement("div");
    new_field_info.classList.add("new_field_info");
    new_field_info.setAttribute("id", "field_" + counter);

    const input_titre_fr = document.createElement("input");
    input_titre_fr.setAttribute("type", "text");
    // Setting the name attribute to handle it in the PHP controller
    input_titre_fr.setAttribute("name", `titre_info_fr_${counter}`);
    input_titre_fr.setAttribute("placeholder", "Titre Info Fr:");

    const input_titre_esp = document.createElement("input");
    input_titre_esp.setAttribute("type", "text");
    input_titre_esp.setAttribute("name", `titre_info_esp_${counter}`);
    input_titre_esp.setAttribute("placeholder", "Titre Info Esp:");

    const input_contenue = document.createElement("input");
    input_contenue.setAttribute("type", "text");
    input_contenue.setAttribute("name", `contenue_info_${counter}`);
    input_contenue.setAttribute("placeholder", "Contenue Info");

    // Creating the button to delete the info field
    const btn_supprimer_field = document.createElement("span");
    btn_supprimer_field.setAttribute('id', counter);
    btn_supprimer_field.setAttribute('class', 'material-symbols-rounded btn_supr_new_field');
    btn_supprimer_field.innerHTML = 'delete';

    if (action === 'update') {
        input_titre_fr.setAttribute("value", `${tab.info_spectacle[counter].titre_info_fr}`);
        input_titre_esp.setAttribute("value", `${tab.info_spectacle[counter].titre_info_esp}`);
        input_contenue.setAttribute("value", `${tab.info_spectacle[counter].contenue_info}`);
    };

    new_field_info.appendChild(input_titre_fr);
    new_field_info.appendChild(input_titre_esp);
    new_field_info.appendChild(input_contenue);
    new_field_info.appendChild(btn_supprimer_field);

    //inserting the new field into the reference container
    const btn_ajouter_info = container.querySelector('button');
    container.insertBefore(new_field_info, btn_ajouter_info.nextSibling);

    // Setting the button event to delete the info field
    btn_supprimer_field.addEventListener('click', (e) => {
        const field_to_del = document.getElementById(`field_${e.target.id}`);
        field_to_del.remove();
    });
};

// Selecting the form to add spectacles in the DOM
const btn_add_spectacle = document.getElementById('btn_add_spectacle');
const modal_add_spectacle = document.getElementById('modal_add_spectacle');
const btn_close_spectacle = document.getElementById('btn_close_spectacle');
// buttons events
btn_add_spectacle.addEventListener('click', (e)=> {
    e.preventDefault();
    handleVisivility(modal_add_spectacle);
});

btn_close_spectacle.addEventListener('click', (e)=> {
    e.preventDefault();
    handleVisivility(modal_add_spectacle);
});

// Adding new field options to the form
const btn_ajouter_info = document.getElementById("ajouter_info");
const form_new_info = document.getElementById("form_new_info");
//Counter fields
let field_count = 1;
btn_ajouter_info.addEventListener('click', (e) => {
    e.preventDefault();
    infoFieldAdder(field_count, form_new_info);
    field_count++;
});

/* <<<<<AGENDA>>>>> */
const btn_add_event = document.getElementById('btn_add_event');
const modal_add_event = document.getElementById('modal_add_event');
const btn_close_agenda = document.getElementById('btn_close_agenda');
const container_agenda = document.getElementById('admin_agenda');

btn_add_event.addEventListener('click', handleVisivility(modal_add_event));
btn_close_agenda.addEventListener('click', handleVisivility(modal_add_event));

fetch("../Controllers/agenda.php", {
    method: "POST"
})
    .then((response) => response.json())
    .then((data) => {
        getDataAgenda(data);
    });
function getDataAgenda(events) {
    events.forEach(date => {
        const event_box = container_agenda.appendChild(document.createElement('div'));
        event_box.setAttribute('class', 'admin_item');
        event_box.setAttribute('id', `${date.id_event}`);
        event_box.style.backgroundImage = `url(${date.image_event})`;
        let hidden_div = event_box.appendChild(document.createElement('div'));
        hidden_div.setAttribute('class', 'hidden_div');
        let delete_div = hidden_div.appendChild(document.createElement('div'));
        delete_div.setAttribute('class', 'delete_div');
        let btn_delete = delete_div.appendChild(document.createElement('span'));
        btn_delete.setAttribute('class', 'material-symbols-rounded');
        btn_delete.innerHTML = 'delete';

        let update_div = hidden_div.appendChild(document.createElement('div'));
        update_div.setAttribute('class', 'update_div');
        let btn_update = update_div.appendChild(document.createElement('span'));
        btn_update.setAttribute('class', 'material-symbols-rounded');
        btn_update.innerHTML = 'edit';

        event_box.addEventListener('mouseenter', (e) => {
            e.preventDefault();
            handleVisivility(hidden_div);
        });
        event_box.addEventListener('mouseleave', (e) => {
            e.preventDefault();
            handleVisivility(hidden_div);
        });

        /* DELETE REQUEST */
        btn_delete.addEventListener('click', () => {
            let modal_delete = document.getElementById('modal_delete');
            let btn_close_delete = document.getElementById('btn_close_delete');
            handleVisivility(modal_delete);

            // Seting action value to the delete form in ./views/admin.php
            delete_form.setAttribute('action', '../Controllers/agenda.php')

            // Deleting the image of the membre
            const form_delete = document.getElementById('form_delete');
            const form_delete_file = document.getElementById('form_delete_file');
            form_delete.setAttribute('value', `${date.id_event}`);
            form_delete_file.setAttribute('value', `${date.image_event}`);

            // Confirmation message
            let titre = document.getElementById('titre_delete');
            titre.textContent = `Supprimer ${date.titre_event} de la agenda?`
            // Close delete dialog 'cancel'
            btn_close_delete.addEventListener('click', () => {
                form_delete.setAttribute('value', '');
                handleVisivility(modal_delete);
            });
        });

        /* UPDATE REQUEST */
        btn_update.addEventListener('click', () => {
            const modal_update = document.getElementById('modal_update_agenda');
            handleVisivility(modal_update);

            const form_update = document.getElementById('id_update_agenda');
            form_update.setAttribute('value', `${date.id_event}`);
            document.getElementById('nom_agenda').setAttribute("value", `${date.titre_event}`);
            document.getElementById('date_agenda').setAttribute("value", `${date.date_event}`);
            document.getElementById('old_image_agenda').setAttribute("value", `${date.image_event}`);
            document.getElementById('adresse_lieu').setAttribute("value", `${date.lieu_event}`);
            document.getElementById('adresse_num').setAttribute("value", `${date.adr_num_event}`);
            document.getElementById('adresse_rue').setAttribute("value", `${date.adr_rue_event}`);
            document.getElementById('adresse_ville').setAttribute("value", `${date.adr_ville_event}`);

        });
    });
};

/* <<<<<EQUIPE>>>>> */

const btn_add_membre = document.getElementById('btn_add_membre');
const modal_add_membre = document.getElementById('modal_add_membre');
const btn_close_membre = document.getElementById('btn_close_membre');

const container_membres = document.getElementById('admin_membres');
const delete_form = document.getElementById('delete_form');

btn_add_membre.addEventListener('click', handleVisivility(modal_add_membre));
btn_close_membre.addEventListener('click', handleVisivility(modal_add_membre));

fetch("../Controllers/equipe.php", {
    method: "POST"
})
    .then((response) => response.json())
    .then((data) => {
        getDataMembre(data);
    });
function getDataMembre(membres) {

    membres.forEach(membre => {
        const membre_box = container_membres.appendChild(document.createElement('div'));
        membre_box.setAttribute('class', 'admin_item');
        membre_box.setAttribute('id', `${membre.id_membre}`);
        membre_box.style.backgroundImage = `url(${membre.image_membre})`;
        let hidden_div = membre_box.appendChild(document.createElement('div'));
        hidden_div.setAttribute('class', 'hidden_div');
        let delete_div = hidden_div.appendChild(document.createElement('div'));
        delete_div.setAttribute('class', 'delete_div');
        let btn_delete = delete_div.appendChild(document.createElement('span'));
        btn_delete.setAttribute('class', 'material-symbols-rounded');
        btn_delete.innerHTML = 'delete';

        let update_div = hidden_div.appendChild(document.createElement('div'));
        update_div.setAttribute('class', 'update_div');
        let btn_update = update_div.appendChild(document.createElement('span'));
        btn_update.setAttribute('class', 'material-symbols-rounded');
        btn_update.innerHTML = 'edit';

        membre_box.addEventListener('mouseenter', (e) => {
            e.preventDefault();
            handleVisivility(hidden_div);
        });
        membre_box.addEventListener('mouseleave', (e) => {
            e.preventDefault();
            handleVisivility(hidden_div);
        });
        /* DELETE REQUEST */
        btn_delete.addEventListener('click', () => {
            console.log(membre.description_membre);
            let modal_delete = document.getElementById('modal_delete');
            let btn_close_delete = document.getElementById('btn_close_delete');
            handleVisivility(modal_delete);

            // Seting action value to the delete form in views/admin.php
            delete_form.setAttribute('action', '../Controllers/equipe.php')

            // Deleting the image of the membre
            let form_delete = document.getElementById('form_delete');
            let form_delete_file = document.getElementById('form_delete_file');
            form_delete.setAttribute('value', `${membre.id_membre}`);
            form_delete_file.setAttribute('value', `${membre.image_membre}`);

            // Confirmation message
            let titre = document.getElementById('titre_delete');
            titre.textContent = `Supprimer ${membre.prenom_membre} ${membre.nom_membre} du équipe?`
            // Close delete dialog 'cancel'
            btn_close_delete.addEventListener('click', () => {
                form_delete.setAttribute('value', '');
                handleVisivility(modal_delete);
            });
        });
        /* UPDATE REQUEST */
        btn_update.addEventListener('click', () => {
            let modal_update = document.getElementById('modal_update_membre');
            handleVisivility(modal_update);

            let form_update = document.getElementById('id_update');
            form_update.setAttribute('value', `${membre.id_membre}`);
            document.getElementById('nom_membre').setAttribute("value", `${membre.nom_membre}`);
            document.getElementById('prenom_membre').setAttribute("value", `${membre.prenom_membre}`);
            document.getElementById('vignette_membre').setAttribute("value", `${membre.description_membre.vignette_fr}`);
            document.getElementById('description_membre').setAttribute("value", `${membre.description_membre.description_fr}`);
            document.getElementById('vignette_membre_esp').setAttribute("value", `${membre.description_membre.vignette_esp}`);
            document.getElementById('description_membre_esp').setAttribute("value", `${membre.description_membre.description_esp}`);
            document.getElementById('old_image_membre').setAttribute("value", `${membre.image_membre}`);
        });
    });
}

/* <<<<<SOUTIENS>>>>> */

let btn_add_soutien = document.getElementById('btn_add_soutien');
let modal_add_soutien = document.getElementById('modal_add_soutien');
let btn_close_soutien = document.getElementById('btn_close_soutien');
const container_soutiens = document.getElementById('admin_soutiens');

btn_add_soutien.addEventListener('click',handleVisivility(modal_add_soutien));
btn_close_soutien.addEventListener('click',handleVisivility(modal_add_soutien));

fetch("../Controllers/soutiens.php", {
    method: "POST"
})
    .then((response) => response.json())
    .then((data) => {
        getDataSoutien(data);
    });

function getDataSoutien(soutiens) {
    soutiens.forEach(soutien => {
        const soutien_box = container_soutiens.appendChild(document.createElement('div'));
        soutien_box.setAttribute('class', 'admin_item');
        soutien_box.setAttribute('id', `${soutien.id_coll}`);
        soutien_box.style.backgroundImage = `url(${soutien.image_coll})`;
        let hidden_div = soutien_box.appendChild(document.createElement('div'));
        hidden_div.setAttribute('class', 'hidden_div');
        let delete_div = hidden_div.appendChild(document.createElement('div'));
        delete_div.setAttribute('class', 'delete_div');
        let btn_delete = delete_div.appendChild(document.createElement('span'));
        btn_delete.setAttribute('class', 'material-symbols-rounded');
        btn_delete.innerHTML = 'delete';

        let update_div = hidden_div.appendChild(document.createElement('div'));
        update_div.setAttribute('class', 'update_div');
        let btn_update = update_div.appendChild(document.createElement('span'));
        btn_update.setAttribute('class', 'material-symbols-rounded');
        btn_update.innerHTML = 'edit';

        soutien_box.addEventListener('mouseenter', (e) => {
            e.preventDefault();
            handleVisivility(hidden_div);
        });
        soutien_box.addEventListener('mouseleave', (e) => {
            e.preventDefault();
            handleVisivility(hidden_div);
        });

        /* DELETE REQUEST */
        btn_delete.addEventListener('click', () => {
            let modal_delete = document.getElementById('modal_delete');
            let btn_close_delete = document.getElementById('btn_close_delete');
            handleVisivility(modal_delete);

            // Seting action value to the delete form in views/admin.php
            delete_form.setAttribute('action', '../Controllers/soutiens.php')

            // Deleting the image of the membre
            let form_delete = document.getElementById('form_delete');
            let form_delete_file = document.getElementById('form_delete_file');
            form_delete.setAttribute('value', `${soutien.id_coll}`);
            form_delete_file.setAttribute('value', `${soutien.image_coll}`);

            // Confirmation message
            let titre = document.getElementById('titre_delete');
            titre.textContent = `Supprimer ${soutien.nom_coll} du collaborateurs?`
            // Close delete dialog 'cancel'
            btn_close_delete.addEventListener('click', () => {
                form_delete.setAttribute('value', '');
                handleVisivility(modal_delete);
            });
        });

        /* UPDATE REQUEST */
        btn_update.addEventListener('click', () => {
            let modal_update = document.getElementById('modal_update_soutien');
            handleVisivility(modal_update);

            let form_update = document.getElementById('id_update_coll');
            form_update.setAttribute('value', `${soutien.id_coll}`);
            document.getElementById('nom_coll').setAttribute("value", `${soutien.nom_coll}`);
            document.getElementById('lien_coll').setAttribute("value", `${soutien.lien_coll}`);
            document.getElementById('old_image_coll').setAttribute("value", `${soutien.image_coll}`);
        });
    });
};