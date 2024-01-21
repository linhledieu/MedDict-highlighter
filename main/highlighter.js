import { styled } from "./styles.js";
import { template } from "./template.js";
import { lowerCase, capitalize } from "./utils.js";

// list all Vietnamese unicode unique characters
const VIETNAMESE_CHARACTERS = ['à', 'á', 'â', 'ã', 'è', 'é', 'ê', 'ì', 'í', 'ò', 'ó', 'ô', 'õ', 'ù', 'ú', 'ý', 'ă', 'đ', 'ĩ', 'ũ', 'ơ', 'ư', 'ạ', 'ả', 'ấ', 'ầ', 'ẩ', 'ẫ', 'ậ', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ', 'ẹ', 'ẻ', 'ẽ', 'ế', 'ề', 'ể', 'ễ', 'ệ', 'ỉ', 'ị', 'ọ', 'ỏ', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ', 'ớ', 'ờ', 'ở', 'ỡ', 'ợ', 'ụ', 'ủ', 'ứ', 'ừ', 'ử', 'ữ', 'ự', 'ỳ', 'ỵ', 'ỷ', 'ỹ']
const SEARCH_URL = 'https://api.meddict-vinuni.com/words?lang={0}&pattern={1}';

const formatString = (template, ...args) => {
  return template.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] === 'undefined' ? match : args[index];
  });
}

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

  get_language(word) {
    // check if the word contains any Vietnamese character
    for (let i = 0; i < word.length; i++) {
      if (VIETNAMESE_CHARACTERS.includes(word[i])) {
        return 'vn';
      }
    }
    return 'en';
  }

  // Method to preprocess English words
  preprocessWord(word) {
    if (this.get_language(word) !== 'en') {
      return word; // Return the original word if it's not English
    }

    // Remove special characters while retaining spaces between words, and apostrophes
    word = word.replace(/[^a-zA-Z0-9'\s]+|(?<=\s)'|'(?=\s)/g, "");


    // Remove 'ing' from verbs (longer suffixes first)
    if (word.endsWith('ing') && word.length > 4) {
      let base = word.slice(0, -3);

      // Check if the base ends in a single consonant preceded by a single vowel
      // and the base is not just a single vowel and consonant (to avoid cases like 'at' in 'eating')
      if (/[aeiou][b-df-hj-np-tv-z]$/i.test(base) && base.length > 2) {
        base = base.slice(0, -1); // Remove the last consonant (e.g., running -> runn -> run)
      }
      return base;
    }

    // Remove 'ed' from verbs
    else if (word.endsWith('ed') && word.length > 3) {
      let base = word.slice(0, -2);
      // Check if the base ends in a single consonant preceded by a single vowel
      if (/[aeiou][b-df-hj-np-tv-z]$/i.test(base) && base.length > 2) {
        base = base.slice(0, -1);
      }
      return base;
    }

    // Remove 'es' and check if the preceding character is not 's' or 'x'
    else if (word.endsWith('es') && !/(s|x)es$/.test(word) && word.length > 3) {
      // Special case for words like 'diseases' where only the last 's' should be removed
      if (/[aeiou]s$/.test(word)) {
        word = word.slice(0, -1);
      } else {
        word = word.slice(0, -2);
      }
    }

    // Remove trailing 's' if it's not preceded by a vowel
    else if (word.endsWith('s') && !/[aeiou]s$/.test(word) && word.length > 2) {
      word = word.slice(0, -1);
    }

    return word;
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

  // // Method to highlight a text range
  // highlightRange(range) {
  //   const clone = this.highlightTemplate.cloneNode(true).content.firstElementChild;
  //   clone.appendChild(range.extractContents());
  //   range.insertNode(clone);
  // }

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

  // Create the button element for sound
  const soundButton = document.createElement('button');
  soundButton.className = 'sound-button'; // Apply the .sound-button class for styling

  // Assuming that 'images/sound.png' is the path within your extension's directory
  const iconUrl = chrome.runtime.getURL('images/sound.png');

  // Create an img element for the icon and append it to the button
  const soundIcon = document.createElement('img');
  soundIcon.src = iconUrl; // Set the image source
  soundIcon.alt = 'Sound icon'; // Set alternative text for the image
  soundIcon.className = 'sound-icon'; // Use .sound-icon class for styling

  // Append the image icon to the button
  soundButton.appendChild(soundIcon);

  // Append the sound button to the header section
  headerSection.appendChild(soundButton);

  // Append the header section to the popup box
  popupBox.appendChild(headerSection);

  // Add the image for meaning illustration
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

  // Buttons container
  const buttonsContainer = document.createElement('div');
  buttonsContainer.style.display = 'flex'; // Ensure buttons are in-line

  // Add the link button for MedDict
  const linkButton = document.createElement('a');
  linkButton.href = 'https://meddict-vinuni.com/';
  linkButton.textContent = 'MedDict';
  linkButton.target = '_blank';
  linkButton.classList.add('popup-box-link');
  buttonsContainer.appendChild(linkButton);

  // Add the Wikipedia/Google search button
  const searchButton = document.createElement('button');
  searchButton.textContent = 'Search';
  searchButton.classList.add('popup-box-link', 'search-button');  // Reuse the same class for similar styling
  searchButton.onclick = () => {
    const wikiUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(word)}`;
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(word)}`;
    window.open(wikiUrl, '_blank'); // Directly open Wikipedia search
  };
  buttonsContainer.appendChild(searchButton);

  // Append buttons container to popup box
  popupBox.appendChild(buttonsContainer);

  // Adjust visibility based on wordFound
  if (!wordFound) {
    soundButton.style.display = 'none'; // Hide sound button
    imageUrl = chrome.runtime.getURL('images/404.png'); // Set default not found image
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
      // this.highlightRange(range);

      let search_word = lowerCase(range.toString()).trim();
      let language = this.get_language(search_word);
      search_word = this.preprocessWord(search_word);
      let url = encodeURI(`https://api.meddict-vinuni.com/words?lang=${language}&pattern=${search_word}`);
      console.log(url)
      console.log(search_word)
      // let englishUrl = `${baseUrl}${search_word}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          let filteredData = this.findWordInData(search_word, data);
          return filteredData;
        })
        .then(data => {
          if (data === "Not Found" || data.length === 0) {
            // Word not found or false positive
            const meanings = ['If you want to contribute this word to our website, please click the link.'];
            const imageURL = chrome.runtime.getURL('images/404.png');
            const soundButton = this.showPopupBox(range, search_word, meanings, imageURL, false);
            return;
          }

          // If the word is found
          data = data[0];
          const meanings = [(language === "en" ? data.vn : data.en)];
          console.log(meanings)
          const imgID = data["id"];
          const dictWord = data[language]
          console.log(dictWord)
          let imageUrl = `https://api.meddict-vinuni.com/words/illustration/${imgID}`;
          const soundButton = this.showPopupBox(range, dictWord, meanings, imageUrl);
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