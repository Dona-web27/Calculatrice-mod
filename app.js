const display = document.getElementById('screen');


// Ajouter une valeur dans l'écran 
function appendValue(val) { 
    let txt = display.textContent;

    // Si c'est un opérateur, on l'ajoute sans formatage
    if (['+', '-', '*', '/'].includes(val)) {
        display.textContent += val;
        autoResize();
        return;
    }

    // Trouver le dernier opérateur dans l'expression
    let lastOpIndex = Math.max(
        txt.lastIndexOf('+'),
        txt.lastIndexOf('-'),
        txt.lastIndexOf('*'),
        txt.lastIndexOf('/')
    );
    
    // Partie avant le nombre en cours
    let before = txt.slice(0, lastOpIndex + 1);

    // Nombre en cours (après le dernier opérateur)
    let number = txt.slice(lastOpIndex + 1);

    // Nettoyer et ajouter le chiffre
    number = cleanNumber(number) + val;

    // Reformatter uniquement le nombre
    let formatted = formatNumber(number);

    // Mettre à jour l'affichage avec formatage
    display.textContent = before + formatted;

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
