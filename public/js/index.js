
function openForm() {
    
    const box = document.getElementById("loginFormDiv");
    box.style.display = "block";

}

function closeForm() {
    
    const box = document.getElementById("loginFormDiv");
    box.style.display = "none";

}

function activatePersonalTab() {
    
    const personal = document.getElementById("personalPage");
    const serviceProvider = document.getElementById("serviceProviderPage");
    const culturalPromoter = document.getElementById("culturalPromoterPage");

    personal.style.display = "block";
    serviceProvider.style.display = "none";
    culturalPromoter.style.display = "none";
}

function activateServiceProviderTab() {
    
    const personal = document.getElementById("personalPage");
    const serviceProvider = document.getElementById("serviceProviderPage");
    const culturalPromoter = document.getElementById("culturalPromoterPage");
    
    personal.style.display = "none";
    serviceProvider.style.display = "block";
    culturalPromoter.style.display = "none";
}

function activateCulturalPromoterTab() {
    
    const personal = document.getElementById("personalPage");
    const serviceProvider = document.getElementById("serviceProviderPage");
    const culturalPromoter = document.getElementById("culturalPromoterPage");
    
    personal.style.display = "none";
    serviceProvider.style.display = "none";
    culturalPromoter.style.display = "block";
}



var objectXHR;
function populateHomeDisplay() {
	objectXHR = new XMLHttpRequest();
	
	objectXHR.open("get","src/loadAllServices.php",true);
	objectXHR.send(null);
		
	objectXHR.onreadystatechange = doPopulateHomeDisplay;
}

function populateLanguages() {
	objectXHR = new XMLHttpRequest();
	
    langName = document.getElementById("query").value;
	objectXHR.open("get","src/filterByLanguage.php?query="+langName,true);
	objectXHR.send(null);
		
	objectXHR.onreadystatechange = doPopulateHomeDisplay;
}

function populateServices() {
	objectXHR = new XMLHttpRequest();
	
    servName = document.getElementById("query").value;
	objectXHR.open("get","src/filterByService.php?query="+servName,true);
	objectXHR.send(null);
		
	objectXHR.onreadystatechange = doPopulateHomeDisplay;
}

function doPopulateHomeDisplay() {
    if (objectXHR.readyState == 4 && objectXHR.status == 200) {
        
        // responseText = echo by php file
        result = objectXHR.responseText;
        
        let arrayHomeDisplay = generateArrayHomeDisplay(result);
        //console.log(arrayServices);
        loadHomeDisplay(arrayHomeDisplay);

        // handle no results
        if (result.trim() == "empty") {
            alert("No Results Found!");
        }
    }
}

function generateArrayHomeDisplay(arrServEvents) {
    let arr = [];
    let oneRow = arrServEvents.split("|");
    oneRow.forEach(row => {
        let temp = row.split(",");
        if (temp.length == 3) {
            arr.push(temp); 
        }   
    });
    return arr;
}

function loadHomeDisplay(arr) {
    const section_services_list = document.querySelector("#section_services_list");
    for (let i = 0; i < arr.length; i++) {
        //console.log("Execute");
        section_services_list.appendChild(createCard(arr[i]));
    }
} 

function reloadAllServices() {
    const section_services_list = document.querySelector("#section_services_list");
    section_services_list.innerHTML = '';
}

function createCard(oneRow) {
    const divCard = document.createElement("div");
    divCard.className = "serviceCard";

    const divImg = document.createElement("div");
    divImg.className = "service-img";

    const divDetails = document.createElement("div");
    divDetails.className = "service-details";

    const h2 = document.createElement("h2");
    h2.className = "service-title";
    const txtH2 = document.createTextNode(oneRow[0]);
    h2.appendChild(txtH2);

    const divTags = document.createElement("div");
    divTags.className = "service-tags";

    const pService = document.createElement("p");
    const txtPService = document.createTextNode(oneRow[1]);
    pService.appendChild(txtPService);

    const pLang = document.createElement("p");
    const txtPLang = document.createTextNode(oneRow[2]);
    pLang.appendChild(txtPLang);

    divTags.appendChild(pService);
    divTags.appendChild(pLang);

    divDetails.appendChild(h2);
    divDetails.appendChild(divTags);

    divCard.appendChild(divImg);
    divCard.appendChild(divDetails);

    return divCard;
}

populateHomeDisplay();


const filterLang = document.querySelector("#filter-lang");
filterLang.addEventListener('click', () => {
    reloadAllServices();
    populateLanguages();
});

const filterServices = document.querySelector("#filter-serv");
filterServices.addEventListener('click', () => {
    reloadAllServices();
    populateServices();
});

const queryBox = document.querySelector("#query");
queryBox.addEventListener('input',() => {

    if (queryBox.value === "") {
        reloadAllServices();
        populateHomeDisplay();
    }
})