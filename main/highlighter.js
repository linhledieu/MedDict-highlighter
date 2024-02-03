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
  createPopupBox(word, meanings, imageUrl, wordFound) {
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
    let soundButton = null;
    let suggestButton = null;

    if (wordFound) {
      soundButton = document.createElement('button');
      soundButton.className = 'sound-button'; 

      // Assuming that 'images/sound.png' is the path within your extension's directory
      const iconUrl = chrome.runtime.getURL('images/sound.png');

      // Create an img element for the icon and append it to the button
      const soundIcon = document.createElement('img');
      soundIcon.src = iconUrl; 
      soundIcon.alt = 'Sound icon'; // Set alternative text for the image
      soundIcon.className = 'sound-icon'; 

      // Append the image icon to the button
      soundButton.appendChild(soundIcon);

      // Append the sound button to the header section
      headerSection.appendChild(soundButton);
    } else {
      // Create the suggest button when word is not found
      suggestButton = document.createElement('button');
      suggestButton.textContent = 'Suggest';
      suggestButton.className = 'suggest-button'; // Apply the .suggest-button class for styling
      suggestButton.classList.add('popup-box-link', 'search-button');
      // Append the suggest button to the header section
      headerSection.appendChild(suggestButton);
    }

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

    //linkButton for Google search
    const linkButton = document.createElement('a');
    linkButton.textContent = 'Google';
    linkButton.target = '_blank';
    linkButton.classList.add('popup-box-link');
    linkButton.onclick = () => {
      // Encode the highlighted word
      const encodedWord = encodeURIComponent(word);
      const googleUrl = `https://www.google.com/search?q=${encodedWord}`;
      linkButton.href = googleUrl;
    };
    buttonsContainer.appendChild(linkButton);

    // searchButton for Wikipedia search
    const searchButton = document.createElement('button');
    searchButton.textContent = 'Wikipedia';
    searchButton.classList.add('popup-box-link', 'search-button');  // Reuse the same class for similar styling
    searchButton.onclick = () => {
      // Encode the highlighted word
      const encodedWord = encodeURIComponent(word);

      // Determine the language of the word (English or Vietnamese)
      const language = this.get_language(word);

      // Construct the Wikipedia search URL based on the language
      let wikiUrl;
      if (language === 'en') {
        // English language, use English Wikipedia
        wikiUrl = `https://en.wikipedia.org/wiki/${encodedWord}`;
        console.log(wikiUrl)
      } else if (language === 'vn') {
        // Vietnamese language, use Vietnamese Wikipedia
        wikiUrl = `https://vi.wikipedia.org/w/index.php?go=Go&search=${encodedWord}`;
      } else {
        // Default to English Wikipedia if language is not determined
        wikiUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${encodedWord}`;
      }

      window.open(wikiUrl, '_blank');
    };

    buttonsContainer.appendChild(searchButton);

    // Append buttons container to popup box
    popupBox.appendChild(buttonsContainer);

    return { popupBox, soundButton };
  }

  // Method to show the popup box
  showPopupBox(range, word, meanings, imageUrl, wordFound) {
    // Remove any existing pop-up box
    const existingPopup = this.shadowRoot.querySelector('.popup-box');
    if (existingPopup) {
      existingPopup.remove();
    }

    const { popupBox, soundButton } = this.createPopupBox(word, meanings, imageUrl, wordFound);

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


  handleSuggestButtonClick(searchWord, language) {
    const payload = { suggestion: searchWord, lang: language };
    fetch('https://api.meddict-vinuni.com/words/suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Suggestion successfully submitted:', data);
        } else {
          console.log(data);
        }
      })
      .catch(error => {
        console.error('Network error:', error);
      });
  }

  highlightSelection() {
    const userSelection = window.getSelection();
    for (let i = 0; i < userSelection.rangeCount; i++) {
      const range = userSelection.getRangeAt(i);
      let search_word = lowerCase(range.toString()).trim();
      let language = this.get_language(search_word);
      search_word = this.preprocessWord(search_word);
      let url = encodeURI(`https://api.meddict-vinuni.com/words?lang=${language}&pattern=${search_word}`);
      console.log(url)
      console.log(search_word)
      fetch(url)
        .then(response => response.json())
        .then(data => {
          let filteredData = this.findWordInData(search_word, data);
          if (filteredData !== "Not Found" && filteredData.length > 0) {
            // Exact word found
            let wordData = filteredData[0];
            const meanings = [(language === "en" ? wordData.vn : wordData.en)];
            const imgID = wordData["id"];
            const dictWord = wordData[language];
            let imageUrl = `https://api.meddict-vinuni.com/words/illustration/${imgID}`;
            const soundButton = this.showPopupBox(range, dictWord, meanings, imageUrl, true);
            soundButton.addEventListener('click', () => {
              const audio = new Audio(`https://api.meddict-vinuni.com/words/sound/${language}/${imgID}`);
              audio.play().catch(error => console.error('Error playing the sound:', error));
            });
          } else if (data.length > 0) {
            // Partial match found, suggest top 3 words and their meanings
            let topWords = data.slice(0, 3);
            let meanings = topWords.map(item => `${language === 'en' ? item.en : item.vn}: ${language === 'en' ? item.vn : item.en}`);
            const imageURL = chrome.runtime.getURL('images/suggestion.png');
            this.showPopupBox(range, search_word, meanings, imageURL, false);
            // Add event listener to the suggestButton
            const suggestButton = this.shadowRoot.querySelector('.suggest-button');
            suggestButton.addEventListener('click', () => {
              // Pass the appropriate values for search_word and language to the function
              this.handleSuggestButtonClick(search_word, language);
              suggestButton.classList.add('blue-button');
            });
          } else {
            // Word not found
            const meanings = ['If you want to contribute this word to our website, please click the button above.'];
            const imageURL = chrome.runtime.getURL('images/404.png');
            this.showPopupBox(range, search_word, meanings, imageURL, false);
            // Add event listener to the suggestButton
            const suggestButton = this.shadowRoot.querySelector('.suggest-button');
            suggestButton.addEventListener('click', () => {
              // Pass the appropriate values for search_word and language to the function
              this.handleSuggestButtonClick(search_word, language);
              suggestButton.classList.add('blue-button');
            });
          }
        })
        .catch(error => {
          console.log('Fetch error:', error);
          // Handle fetch error
          const meanings = ['Error fetching data.'];
          const imageURL = chrome.runtime.getURL('images/404.png');
          this.showPopupBox(range, search_word, meanings, imageURL, false);
        });
    }
    userSelection.removeAllRanges();
  }
}
window.customElements.define("meddict-highlighter", MedDictHighlighter);