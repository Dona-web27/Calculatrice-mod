const display = document.getElementById('screen');


// Ajouter une valeur dans l'écran 
function appendValue(val) { 
    // On enlève les espaces pour éviter les bugs 
    let raw = cleanNumber(display.textContent);
    // Si c'est un opérateur on l'ajoute tel quel
    if (['+', '-', '*', '/'].includes(val)) {
        display.textContent += val;
        autoResize();
        return;
    }

    raw += val; // On reformate avec les espaces 
    display.textContent = formatNumber(raw); 
    autoResize();
}

// Calculer le résultat 
function calculate() { 
    try { 
        let raw = cleanNumber(display.textContent); 
        let result = eval(raw); 
        display.textContent = formatNumber(result); 
        autoResize(); 
         } catch { 
            display.textContent = "Erreur"; 
        } 
    }

// Effacer l'écran
function clearDisplay() { 
    display.textContent = ''; 
    display.style.transform = "scale(1)";
}

// Supprimer le dernier caractère
function deleteLast() { 
    let txt = display.textContent.slice(0, -1);

    // Si ça finit par un opérateur, pas de formatage
    if (/[+\-*/]$/.test(txt)) {
        display.textContent = txt;
        autoResize();
        return;
    }

    let raw = cleanNumber(txt); 
    display.textContent = formatNumber(raw); 
    autoResize();
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

function autoResize() {
  const maxScale = 1;   // taille normale
  const minScale = 0.4; // taille minimum (40%)
  let scale = maxScale;

  // On remet la taille normale avant de mesurer
  display.style.transform = `scale(${maxScale})`;

  // Si le texte dépasse, on réduit progressivement
  while (display.scrollWidth > display.parentElement.clientWidth && scale > minScale) {
    scale -= 0.01;
    display.style.transform = `scale(${scale})`;
  }
}
