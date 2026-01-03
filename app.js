const display = document.getElementById('screen');


// Ajouter une valeur dans l'écran 
function appendValue(val) { 
    display.textContent += val; 
}

// Calculer le résultat 
function calculate() { 
    try { 
        display.textContent = eval(display.textContent); // ⚠️ eval juste pour apprendre 
         } catch { 
            display.textContent = "Erreur"; 
        } 
    }

// Effacer l'écran
function clearDisplay() { 
    display.textContent = ''; 
}

// Supprimer le dernier caractère
function deleteLast() { 
    display.textContent = display.textContent.slice(0, -1); 
}

// Gérer les touches du clavier
document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (!isNaN(key) || ['+', '-', '*', '/','.'].includes(key)) {
        appendValue(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
})

// Fonction pour formater les nombres avec espaces 
function formatNumber(num) { 
return Number(num).toLocaleString("fr-FR"); 
}

// Fonction pour enlever les espaces avant un calcul 
function cleanNumber(num) { 
 return num.replace(/\s/g, ""); 
}

// Quand on appuie sur un bouton 
 function appendValue(val) {  
// On enlève les espaces pour éviter les bugs 
let raw = cleanNumber(display.textContent); 
// On ajoute la valeur 
raw += val; // On reformate avec les espaces 
display.textContent = formatNumber(raw); 
}