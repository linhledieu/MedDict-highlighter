// template.js
// export const highlightColor = "rgb(213, 234, 255)";

export const template = `
<template id="highlightTemplate">
  <span class="highlight" style="background-color: transparent; display: inline"></span>
</template>
<button id="meddictHighlighter" style="width: 40px; height: 40px;">
  <img class="text-marker" src="${chrome.runtime.getURL('images/vinuni-icon.png')}" alt="Highlight Icon" style="width: 30px; height: 30px;" />
</button>
`;

