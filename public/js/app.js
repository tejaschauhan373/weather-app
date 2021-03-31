const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
var paragraphMessage = document.querySelector('#message-1')
var msg2 = document.querySelector('#message-2')
var msgHead = document.querySelector('#msg-head')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (paragraphMessage) {
        paragraphMessage.textContent = "Loading..."
    }


    const location = search.value;

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.Error) {
                if (paragraphMessage) {
                    let node = document.createTextNode("Error: " + data.Error);
                    msg2.textContent = "";
                    msgHead.textContent = "";
                    paragraphMessage.appendChild(node);
                    // paragraphMessage.textContent = ;
                }
            } else {
                if (paragraphMessage) {
                    paragraphMessage.textContent = "";
                    msg2.textContent = "";
                    msgHead.textContent = `Location: ${data["Data"]["location"]}`;
                    let node1 = document.createTextNode("Temperature: " + data["Data"]["temperature"] + "° , Observation time: " + data["Data"]["observation_time"]);
                    paragraphMessage.appendChild(node1);

                    var table = document.createElement("table");
                    var tr = document.createElement("tr");
                    var td1 = document.createElement("td");
                    var td2 = document.createElement("td");
                    td1.setAttribute("width", "50%");
                    td2.setAttribute("width", "50%");
                    td1.setAttribute('align', 'center');
                    td2.setAttribute('align', 'center');

                    let node2 = document.createTextNode("Weather description: " + data["Data"]["weather_descriptions"]);
                    td1.appendChild(node2);
                    // paragraphMessage.textContent = ;
                    var img = document.createElement("IMG");

                    img.setAttribute("width", "75");
                    img.setAttribute("src", data["Data"]["icon"]);
                    img.setAttribute("height", "75");
                    img.setAttribute("alt", "Weather icon");
                    td2.appendChild(img);
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    table.appendChild(tr);
                    msg2.appendChild(table);
                }
            }
        })
    })
})