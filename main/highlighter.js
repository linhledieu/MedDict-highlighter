import { styled } from "./styles.js";
import { template } from "./template.js";
import { lowerCase, capitalize } from "./utils.js";

class MedDictHighlighter extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  // Getter for marker position attribute
  get markerPosition() {
    return JSON.parse(this.getAttribute("markerPosition") || "{}");
  }

  // Getter for the style element in the shadow DOM
  get styleElement() {
    return this.shadowRoot.querySelector("style");
  }

  // Getter for the highlight template in the shadow DOM
  get highlightTemplate() {
    return this.shadowRoot.getElementById("highlightTemplate");
  }

  // Observed attributes for the custom element
  static get observedAttributes() {
    return ["markerPosition"];
  }

  // Method to render the element's content
  render() {
    this.attachShadow({ mode: "open" });

    // Append style element to shadowRoot
    const style = document.createElement("style");
    style.textContent = styled({});
    this.shadowRoot.appendChild(style);

    // Append the template HTML to shadowRoot
    this.shadowRoot.innerHTML += template;

    // Add event listener for highlight selection
    this.shadowRoot.getElementById("meddictHighlighter")
      .addEventListener("click", () => this.highlightSelection());
  }

  // Callback for attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "markerPosition") {
      this.styleElement.textContent = styled(this.markerPosition);
    }
  }

  // Method to highlight a text range
  highlightRange(range) {
    const clone = this.highlightTemplate.cloneNode(true).content.firstElementChild;
    clone.appendChild(range.extractContents());
    range.insertNode(clone);
  }

  // Method to remove all highlights
  removeAllHighlights() {
    const highlights = this.shadowRoot.querySelectorAll('.highlight');
    highlights.forEach(highlight => {
      const parent = highlight.parentNode;
      while (highlight.firstChild) {
        parent.insertBefore(highlight.firstChild, highlight);
      }
      parent.removeChild(highlight);
    });
  }

  // Method to create the popup box
  createPopupBox(word, meanings, imageUrl, wordFound = true) {
    // Create the container for the pop-up box
    const popupBox = document.createElement('div');
    popupBox.classList.add('popup-box');

    // Header section with word and icon
    const headerSection = document.createElement('div');
    headerSection.classList.add('header-section');

    const wordHeader = document.createElement('h1');
    wordHeader.textContent = word;
    headerSection.appendChild(wordHeader);

    // Create the button element
    const soundButton = document.createElement('button');
    soundButton.className = 'sound-button'; // Apply the .sound-button class for styling

    // Assuming that 'images/sound.png' is the path within your extension's directory
    const iconUrl = chrome.runtime.getURL('images/sound.png');

    // Instead, create an img element for the icon and append it to the button
    const soundIcon = document.createElement('img');
    soundIcon.src = iconUrl; // Set the image source
    soundIcon.alt = 'Sound icon'; // Set alternative text for the image
    soundIcon.className = 'sound-icon'; // Use .sound-icon class for styling

    // Append the image icon to the button
    soundButton.appendChild(soundIcon);

    // Append the button to the header section
    headerSection.appendChild(soundButton);

    // Append the button to the header section
    headerSection.appendChild(soundButton);

    // Create a style element
    const styleElement = document.createElement('style');
    styleElement.textContent = styled({}); // Get styles from styles.js

    // Append the style element to the document head
    document.head.appendChild(styleElement);
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
    linkButton.href = 'https://meddict-vinuni.com/';
    linkButton.textContent = 'Link to MedDict';
    linkButton.target = '_blank';
    linkButton.classList.add('popup-box-link');
    popupBox.appendChild(linkButton);

    // Adjust visibility based on wordFound
    if (!wordFound) {
      soundButton.style.display = 'none'; // Hide sound button
      imageUrl = chrome.runtime.getURL('images/404.jpg'); // Set default not found image
      meanings = ['If you want to contribute this word to our website, please click the link.']; // Default message
    }
    return { popupBox, soundButton };
  }

  // Method to show the popup box
  showPopupBox(range, word, meanings, imageUrl) {
    // Remove any existing pop-up box
    const existingPopup = this.shadowRoot.querySelector('.popup-box');
    if (existingPopup) {
      existingPopup.remove();
    }

    const { popupBox, soundButton } = this.createPopupBox(word, meanings, imageUrl);

    this.shadowRoot.appendChild(popupBox);

    const rect = range.getBoundingClientRect();
    popupBox.style.position = 'absolute';
    popupBox.style.top = `${window.scrollY + rect.bottom + 10}px`;
    popupBox.style.left = `${window.scrollX + rect.left}px`;

    return soundButton
  }

  // Checks if a click event is outside the popup, and if so, initiates cleanup.
  isClickOutsidePopup(event) {
    const popupBox = this.shadowRoot.querySelector('.popup-box');
    if (popupBox && !popupBox.contains(event.target)) {
      this.closePopupAndReset();
      return true;
    }
    return false;
  }

  // Consolidates the cleanup process into a single method.
  closePopupAndReset() {
    // Remove the popup box
    const popupBox = this.shadowRoot.querySelector('.popup-box');
    if (popupBox) {
      popupBox.remove();
    }
    // Remove all highlights
    this.removeAllHighlights();
  }

  // Method to find a word in API data
  findWordInData(word, data) {
    for (let item of data) {
      if (item.en.toLowerCase() === word.toLowerCase() || item.vn.toLowerCase() === word.toLowerCase()) {
        return [item];
      }
    }
    return "Not Found";
  }

  // Method to handle the highlight selection
  highlightSelection() {
    const userSelection = window.getSelection();
    for (let i = 0; i < userSelection.rangeCount; i++) {
      const range = userSelection.getRangeAt(i);
      this.highlightRange(range);

      const search_word = lowerCase(range.toString()).trim();
      let language = 'en';
      let baseUrl = `https://api.meddict-vinuni.com/words?lang=${language}&pattern=`;

      let englishUrl = `${baseUrl}${search_word}`;
      fetch(englishUrl)
        .then(response => response.json())
        .then(data => {
          let filteredData = this.findWordInData(search_word, data);
          if (filteredData === "Not Found") {
            language = 'vn';
            let vietnameseUrl = encodeURI(`${baseUrl}${search_word}`);
            return fetch(vietnameseUrl)
              .then(response => response.json())
              .then(vnData => this.findWordInData(search_word, vnData));
          }
          return filteredData;
        })
        .then(data => {
          if (data === "Not Found" || data.length === 0) {
            // Word not found or false positive
            const meanings = ['If you want to contribute this word to our website, please click the link.'];
            const imageURL = chrome.runtime.getURL('images/404.jpg');
            const soundButton = this.showPopupBox(range, search_word, meanings, imageURL, false);
            return;
          }

          // If the word is found
          data = data[0];
          const meanings = [data["vn"] || data["en"]];
          const imgID = data["id"];
          let imageUrl = `https://api.meddict-vinuni.com/words/illustration/${imgID}`;
          const soundButton = this.showPopupBox(range, search_word, meanings, imageUrl);
          soundButton.addEventListener('click', () => {
            const audio = new Audio(`https://api.meddict-vinuni.com/words/sound/${language}/${imgID}`);
            audio.play().catch(error => console.error('Error playing the sound:', error));
          });
        })
        .catch(error => console.log('Fetch error:', error));
    }
    userSelection.removeAllRanges();
  }
}


window.customElements.define("meddict-highlighter", MedDictHighlighter);