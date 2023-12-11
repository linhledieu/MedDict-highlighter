const highlightColor = "rgb(213, 234, 255)";

const template = `
  <template id="highlightTemplate">
    <span class="highlight" style="background-color: ${highlightColor}; display: inline"></span>
  </template>

  <button id="meddictHighlighter">
    <svg class="text-marker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544 512"><path d="M0 479.98L99.92 512l35.45-35.45-67.04-67.04L0 479.98zm124.61-240.01a36.592 36.592 0 0 0-10.79 38.1l13.05 42.83-50.93 50.94 96.23 96.23 50.86-50.86 42.74 13.08c13.73 4.2 28.65-.01 38.15-10.78l35.55-41.64-173.34-173.34-41.52 35.44zm403.31-160.7l-63.2-63.2c-20.49-20.49-53.38-21.52-75.12-2.35L190.55 183.68l169.77 169.78L530.27 154.4c19.18-21.74 18.15-54.63-2.35-75.13z"></path></svg>
  </button>
`;

const styled = ({ display = "none", left = 0, top = 0 }) => `
  #meddictHighlighter {
    align-items: center;
    background-color: black;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    display: ${display};
    justify-content: center;
    left: ${left}px;
    padding: 5px 10px;
    position: fixed;
    top: ${top}px;
    width: 40px;
    z-index: 9999;
  }
  .text-marker {
    fill: white;
  }
  .text-marker:hover {
    fill: ${highlightColor};
  }
  .popup-box {
    background-color: #FAF5DE; 
    border-radius: 10px; 
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); 
    display: flex; 
    flex-direction: column; 
    align-items: center;
    font-family: 'Arial', sans-serif; 
    padding: 20px;
    position: absolute;
    z-index: 10000;
    max-width: 350px; 
    width: 100%; 
    box-sizing: border-box; 
  }
  
  .header-section {
    width: 100%; 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-bottom: 20px; 
  }
  
  .header-section h1 {
    font-size: 24px; 
    font-weight: bold; 
    margin: 0; 
  }
  
  .meaning-image {
    width: 100%;
    height: auto; 
    border: 1px solid #ccc; 
    margin-bottom: 20px; 
  }
  
  .meanings-list {
    width: 100%; 
    list-style: none; 
    padding: 0; 
    margin: 0;
    border-top: 1px solid #ccc; 
    border-bottom: 1px solid #ccc; 
  }
  
  .meanings-list li {
    font-size: 16px; 
    line-height: 1.6; 
    padding: 10px 0; 
  
  .popup-box-link {
    background-color: #007bff; 
    color: white; 
    padding: 10px 20px; 
    text-decoration: none; 
    border-radius: 20px; 
    margin-top: 20px; 
    display: inline-block;
    font-weight: bold; 
  }
  
  .popup-box-link:hover {
    background-color: #0056b3; 
  }
  
`;
function capitalize(word) {
  if (word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
  return word;
}

class MedDictHighlighter extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  get markerPosition() {
    return JSON.parse(this.getAttribute("markerPosition") || "{}");
  }

  get styleElement() {
    return this.shadowRoot.querySelector("style");
  }

  get highlightTemplate() {
    return this.shadowRoot.getElementById("highlightTemplate");
  }

  static get observedAttributes() {
    return ["markerPosition"];
  }

  render() {
    this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = styled({});
    this.shadowRoot.appendChild(style);
    this.shadowRoot.innerHTML += template;
    this.shadowRoot
      .getElementById("meddictHighlighter")
      .addEventListener("click", () => this.highlightSelection());
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "markerPosition") {
      this.styleElement.textContent = styled(this.markerPosition);
    }
  }

  highlightSelection() {
    var userSelection = window.getSelection();
    for (let i = 0; i < userSelection.rangeCount; i++) {
      this.highlightRange(userSelection.getRangeAt(i));
    }
    window.getSelection().empty();
  }

  highlightRange(range) {
    const clone =
      this.highlightTemplate.cloneNode(true).content.firstElementChild;
    clone.appendChild(range.extractContents());
    range.insertNode(clone);
  }

  createPopupBox(word, meanings, imageUrl) {
    // Create the container for the pop-up box
    const popupBox = document.createElement('div');
    popupBox.classList.add('popup-box');
  
    // Header section with word and icon
    const headerSection = document.createElement('div');
    headerSection.classList.add('header-section');
    
    const wordHeader = document.createElement('h1');
    wordHeader.textContent = word;
    headerSection.appendChild(wordHeader);
    
    const soundIcon = document.createElement('span');
    soundIcon.innerHTML = '&#x1F50A;'; 
    headerSection.appendChild(soundIcon);
    
    popupBox.appendChild(headerSection);
  
    // Add the image
    const image = new Image();
    image.src = imageUrl;
    image.alt = 'Meaning illustration';
    image.classList.add('meaning-image');
    popupBox.appendChild(image);
  
    // Add the meanings list
    const meaningsList = document.createElement('ol');
    meaningsList.classList.add('meanings-list');
    meanings.forEach(meaning => {
      const listItem = document.createElement('li');
      listItem.textContent = meaning;
      meaningsList.appendChild(listItem);
    });
    popupBox.appendChild(meaningsList);
  
    // Add the link button
    const linkButton = document.createElement('a');
    linkButton.href = 'https://meddict.org';
    linkButton.textContent = 'Link to MedDict';
    linkButton.target = '_blank';
    linkButton.classList.add('popup-box-link');
    popupBox.appendChild(linkButton);
  
    return popupBox;
  }

  showPopupBox(range, word, meanings, imageUrl) {
    // Remove any existing pop-up box
    const existingPopup = this.shadowRoot.querySelector('.popup-box');
    if (existingPopup) {
      existingPopup.remove();
    }

    const popupBox = this.createPopupBox(word, meanings, imageUrl);

    this.shadowRoot.appendChild(popupBox);

    const rect = range.getBoundingClientRect();
    popupBox.style.position = 'absolute';
    popupBox.style.top = `${window.scrollY + rect.bottom + 10}px`; 
    popupBox.style.left = `${window.scrollX + rect.left}px`;
  }
  
  highlightSelection() {
    const userSelection = window.getSelection();
    for (let i = 0; i < userSelection.rangeCount; i++) {
      const range = userSelection.getRangeAt(i);
      this.highlightRange(range);
      const word = capitalize(range.toString());
      const meanings = ['pain in the head', 'a vexatious or baffling situation or problem'];
      const imageUrl = 'https://via.placeholder.com/100'; // Placeholder image URL
      this.showPopupBox(range, word, meanings, imageUrl);
    }
    userSelection.removeAllRanges();
  }
}

window.customElements.define("meddict-highlighter", MedDictHighlighter);
