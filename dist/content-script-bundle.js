/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./main/styles.js":
/*!************************!*\
  !*** ./main/styles.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   styled: () => (/* binding */ styled)
/* harmony export */ });
function styled({
  display = "none",
  left = 0,
  top = 0
}) {
  return `
    /* Style for the main highlighter button */
    #meddictHighlighter {
        align-items: center;
        background-color: #BAD4FF;
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

    /* Style for the text marker, changes on hover */
    .text-marker {
        fill: white;
    }
    .text-marker:hover {
        fill: rgb(213, 234, 255);
    }

    /* Popup box styling */
    .popup-box {
        /* Styling for the background, border, and shadow */
        background-color: #2E5288FF; 
        border-radius: 10px; 
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); 
        
        /* Flexbox for alignment and layout */
        display: flex; 
        flex-direction: column; 
        align-items: center;
        
        /* Typography and padding */
        font-family: 'Arial', sans-serif; 
        padding: 15px;
        
        /* Positioning and size */
        position: absolute;
        z-index: 10000;
        max-width: 300px; /* Adjusted maximum width */
        width: 80%; /* Adjusted width to be 90% of the container */
        box-sizing: border-box; 
    }

    /* Responsive design adjustments */
    @media screen and (max-width: 600px) {
        .popup-box {
            width: 95%; /* Full width on smaller screens */
        }
    }

    /* Header Section: Styles for the header container */
    .header-section {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        flex-wrap: nowrap;
    }
    
    /* Header Title: Style for the main title in the header */
    .header-section h1 {
        font-size: 20px;
        padding: 10px 20px;
        font-weight: bold;
        margin: 0;
        color: white;
        text-align: left;
        flex: 1;
    }
    
    /* Meaning Image: Style for images that illustrate meanings */
    .meaning-image {
        width: 100%;
        max-width: 200px;
        max-height: 200px;
        height: auto;
        object-fit: contain;
        margin-bottom: 15px;
    }
    
    /* Meanings List: Styling for list displaying word meanings */
    .meanings-list {
        width: 100%;
        list-style: none;
        padding: 0;
        margin: 0;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        margin-bottom: 15px;
    }
    
    /* Meaning List Items: Style for individual list items */
    .meanings-list li {
        font-size: 14px;
        padding: 10px;
        line-height: 1.6;
        padding: 10px 20px;
        color: white;
    } 
    
    /* Popup Box Links and Buttons: General style for action buttons */
    .popup-box-link, .search-button {
        background-color: #007bff;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 20px;
        display: inline-block;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        margin: 0 20px;
        text-align: center;
        line-height: 20px;
        border: none;
        box-shadow: none;
        transition: background-color 0.3s;
    }
    
    /* Hover Effects for Popup Box Links and Buttons */
    .popup-box-link:hover, .search-button:hover {
        background-color: #0056b3;
    }
    
    /* Search Button Specific Style */
    .search-button {
        background-color: #D32727FF;
    }
    
    /* Hover Style for Search Button */
    .search-button:hover {
        background-color: #990000;
    }
    
    /* Sound Button: Style for the sound control button */
    .sound-button {
        margin-left: auto;
        margin-right: 0;
        width: 40px;
        height: 40px;
        background-color: #D32727FF;
        border-radius: 50%;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    
    /* Sound Icon: Style for the sound button icon */
    .sound-icon {
        width: 70%;
        height: 50%;
        fill: #FFFFFF;
    }
    
    /* Hover and Active State Styles for Sound Button */
    .sound-button:hover {
        background-color: #FF0000FF;
    }
    .sound-button:active {
        background-color: #990000FF;
    }

    .blue-button {
        background-color: #007bff ;
        color: white; /* You can adjust text color as needed */
      }
`;
}

/***/ }),

/***/ "./main/template.js":
/*!**************************!*\
  !*** ./main/template.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   template: () => (/* binding */ template)
/* harmony export */ });
// template.js
// export const highlightColor = "rgb(213, 234, 255)";

const template = `
<template id="highlightTemplate">
  <span class="highlight" style="background-color: transparent; display: inline"></span>
</template>
<button id="meddictHighlighter" style="width: 40px; height: 40px;">
  <img class="text-marker" src="${chrome.runtime.getURL('images/vinuni-icon.png')}" alt="Highlight Icon" style="width: 30px; height: 30px;" />
</button>
`;

/***/ }),

/***/ "./main/utils.js":
/*!***********************!*\
  !*** ./main/utils.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   caCase: () => (/* binding */ caCase),
/* harmony export */   capitalize: () => (/* binding */ capitalize),
/* harmony export */   isPalindrome: () => (/* binding */ isPalindrome),
/* harmony export */   keCase: () => (/* binding */ keCase),
/* harmony export */   lowerCase: () => (/* binding */ lowerCase),
/* harmony export */   randomString: () => (/* binding */ randomString),
/* harmony export */   reverseString: () => (/* binding */ reverseString),
/* harmony export */   snaCase: () => (/* binding */ snaCase),
/* harmony export */   trimSpaces: () => (/* binding */ trimSpaces),
/* harmony export */   wordCount: () => (/* binding */ wordCount)
/* harmony export */ });
function capitalize(word) {
  if (word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
  return word;
}
function lowerCase(word) {
  if (word) {
    return word.toLowerCase();
  }
  return word;
}
function trimSpaces(str) {
  return str.replace(/\s+/g, ' ').trim();
}
function caCase(str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}
function snaCase(str) {
  return str.toLowerCase().replace(/\s+/g, '_');
}
function keCase(str) {
  return str.toLowerCase().replace(/\s+/g, '-');
}
function reverseString(str) {
  return str.split('').reverse().join('');
}
function isPalindrome(str) {
  const cleanStr = str.replace(/\W/g, '').toLowerCase();
  return cleanStr === reverseString(cleanStr);
}
function wordCount(str) {
  return str.trim().split(/\s+/).length;
}
function randomString(length) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./main/highlighter.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.js */ "./main/styles.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template.js */ "./main/template.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./main/utils.js");




// list all Vietnamese unicode unique characters
const VIETNAMESE_CHARACTERS = ['à', 'á', 'â', 'ã', 'è', 'é', 'ê', 'ì', 'í', 'ò', 'ó', 'ô', 'õ', 'ù', 'ú', 'ý', 'ă', 'đ', 'ĩ', 'ũ', 'ơ', 'ư', 'ạ', 'ả', 'ấ', 'ầ', 'ẩ', 'ẫ', 'ậ', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ', 'ẹ', 'ẻ', 'ẽ', 'ế', 'ề', 'ể', 'ễ', 'ệ', 'ỉ', 'ị', 'ọ', 'ỏ', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ', 'ớ', 'ờ', 'ở', 'ỡ', 'ợ', 'ụ', 'ủ', 'ứ', 'ừ', 'ử', 'ữ', 'ự', 'ỳ', 'ỵ', 'ỷ', 'ỹ'];
const SEARCH_URL = 'https://api.meddict-vinuni.com/words?lang={0}&pattern={1}';
const formatString = (template, ...args) => {
  return template.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] === 'undefined' ? match : args[index];
  });
};
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
    this.attachShadow({
      mode: "open"
    });

    // Append style element to shadowRoot
    const style = document.createElement("style");
    style.textContent = (0,_styles_js__WEBPACK_IMPORTED_MODULE_0__.styled)({});
    this.shadowRoot.appendChild(style);

    // Append the template HTML to shadowRoot
    this.shadowRoot.innerHTML += _template_js__WEBPACK_IMPORTED_MODULE_1__.template;

    // Add event listener for highlight selection
    this.shadowRoot.getElementById("meddictHighlighter").addEventListener("click", () => this.highlightSelection());
  }

  // Callback for attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "markerPosition") {
      this.styleElement.textContent = (0,_styles_js__WEBPACK_IMPORTED_MODULE_0__.styled)(this.markerPosition);
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
    searchButton.classList.add('popup-box-link', 'search-button'); // Reuse the same class for similar styling
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
        console.log(wikiUrl);
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
    return {
      popupBox,
      soundButton
    };
  }

  // Method to show the popup box
  showPopupBox(range, word, meanings, imageUrl, wordFound) {
    // Remove any existing pop-up box
    const existingPopup = this.shadowRoot.querySelector('.popup-box');
    if (existingPopup) {
      existingPopup.remove();
    }
    const {
      popupBox,
      soundButton
    } = this.createPopupBox(word, meanings, imageUrl, wordFound);
    this.shadowRoot.appendChild(popupBox);
    const rect = range.getBoundingClientRect();
    popupBox.style.position = 'absolute';
    popupBox.style.top = `${window.scrollY + rect.bottom + 10}px`;
    popupBox.style.left = `${window.scrollX + rect.left}px`;
    return soundButton;
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
    const payload = {
      suggestion: searchWord,
      lang: language
    };
    fetch('https://api.meddict-vinuni.com/words/suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(response => response.json()).then(data => {
      if (data.success) {
        console.log('Suggestion successfully submitted:', data);
      } else {
        console.log(data);
      }
    }).catch(error => {
      console.error('Network error:', error);
    });
  }
  highlightSelection() {
    const userSelection = window.getSelection();
    for (let i = 0; i < userSelection.rangeCount; i++) {
      const range = userSelection.getRangeAt(i);
      let search_word = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.lowerCase)(range.toString()).trim();
      let language = this.get_language(search_word);
      search_word = this.preprocessWord(search_word);
      let url = encodeURI(`https://api.meddict-vinuni.com/words?lang=${language}&pattern=${search_word}`);
      console.log(url);
      console.log(search_word);
      fetch(url).then(response => response.json()).then(data => {
        let filteredData = this.findWordInData(search_word, data);
        if (filteredData !== "Not Found" && filteredData.length > 0) {
          // Exact word found
          let wordData = filteredData[0];
          const meanings = [language === "en" ? wordData.vn : wordData.en];
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
      }).catch(error => {
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
})();

/******/ })()
;
//# sourceMappingURL=content-script-bundle.js.map