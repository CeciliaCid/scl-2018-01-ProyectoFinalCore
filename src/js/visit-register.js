// Select residentes

window.onload = () => {
    database = firebase.database()
    const ref = database.ref("residentes")
    ref.on("value", gotData, errData)
};

// Funciones para select
function gotData(data) {
    community = data.val();
    const keys = Object.keys(community);
    //console.log(keys);
    for (i = 0; i < keys.length; i++) {
        const k = keys[i];
        const names = community[k].name;
        const mail = community[k].mail;
        const company = community[k].company;
        //console.log(names, mail, company);
        const appendingTo = document.getElementById("communityselect");
        const select = document.createElement("option")
        select.text = company + " - " + names;
        select.value = mail;
        appendingTo.appendChild(select);
    }
}


function errData(err) {
    console.log("Error!" + err);

}

let vtime = "Reunión o Evento";
let vmotive = "15 minutos";
let vresident = "laboratoria@laboratoria.cl"


// Registrar visitas
function newVisit() {
    const vname = visitName.value;
    const vdni = visitDNI.value;
    const vmail = visitMail.value;
    const timestamp = new Date().toUTCString();
    const vpatente = visitPatente.value;
    //const vphoto = visitPhoto; //falta foto

    const rootRef = firebase.database().ref();
    const storesRef = rootRef.child("visitas");
    const newStoreRef = storesRef.push();
    newStoreRef.set({
        name: vname,
        DNI: vdni,
        mail: vmail,
        motive: JSON.stringify(vmotive),
        visitTime: JSON.stringify(vtime),
        enterTime: timestamp,
        patente: vpatente,
        visitTo: vresident,
        //photo: vphoto
    });
    console.log("registro exitoso")
}

//Select Motivo
function motive(event) {
    vmotive = this.options[this.selectedIndex].value;
    console.log(vmotive)
}

// Select time
function time(event) {
    vtime = this.options[this.selectedIndex].value;
    console.log(vtime)
}

// select residente
function resident(event) {
    vresident = this.options[this.selectedIndex].value;
    console.log(vresident)
}

// enviar mail
function sendMail(vresident) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.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);
    const msg = {
        to: vresident,
        from: 'quetltehue@gmail.com',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);

}