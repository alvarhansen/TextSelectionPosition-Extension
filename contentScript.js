function createLabel(textarea) {
    const label = document.createElement("span");
    label.classList.add("selection-end-label");
    label.textContent = getPositionInfo(textarea);
    textarea.insertAdjacentElement("afterend", label);
    return label;
  }
  
  function getCurrentRow(textarea) {
    const text = textarea.value;
    const selectionEnd = textarea.selectionEnd;
  
    let row = 1;
  
    for (let i = 0; i < selectionEnd; i++) {
      if (text[i] === '\n') {
        row++;
      }
    }
  
    return row;
  }
  
  function getCurrentRowSelectionEnd(textarea) {
    const text = textarea.value;
    const selectionEnd = textarea.selectionEnd;
  
    let col = 1;
  
    for (let i = 0; i < selectionEnd; i++) {
      if (text[i] === '\n') {
        col = 1;
      } else {
        col++;
      }
    }
  
    return col;
  }
  
  function getPositionInfo(textarea) {
    return `Ln ${getCurrentRow(textarea)}, Col ${getCurrentRowSelectionEnd(textarea)}`;
  }
  
  function updateLabel(label, textarea) {
    label.textContent = getPositionInfo(textarea);
  }
  
  function processTextarea(textarea) {
    const label = createLabel(textarea);
  
    textarea.addEventListener("input", () => {
      updateLabel(label, textarea);
    });
  
    textarea.addEventListener("mouseup", () => {
      updateLabel(label, textarea);
    });
  
    textarea.addEventListener("keydown", () => {
      updateLabel(label, textarea);
    });
  
    textarea.addEventListener("keyup", () => {
      updateLabel(label, textarea);
    });
  }
  
  function init() {
    const textareas = document.querySelectorAll("textarea");
    textareas.forEach((textarea) => {
      processTextarea(textarea);
    });
  }
  
  function observeNewTextareas() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.tagName.toLowerCase() === "textarea") {
                processTextarea(node);
              } else {
                const newTextareas = node.querySelectorAll("textarea");
                newTextareas.forEach((textarea) => {
                  processTextarea(textarea);
                });
              }
            }
          });
        }
      });
    });
  
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
  
  init();
  observeNewTextareas();
  