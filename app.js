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