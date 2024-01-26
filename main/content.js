// Create and append the 'meddict-highlighter' custom element to the body
const meddictHighlighter = document.createElement("meddict-highlighter");
document.body.appendChild(meddictHighlighter);

// Function to set the marker position attribute of 'meddict-highlighter'
const setMarkerPosition = (markerPosition) =>
  meddictHighlighter.setAttribute("markerPosition", JSON.stringify(markerPosition));

// Function to get the selected text
const getSelectedText = () => window.getSelection().toString();

// Event listener to handle clicks and text selection changes
document.addEventListener("click", (event) => {
  const selection = window.getSelection();
  const highlighter = document.querySelector('meddict-highlighter');

  if (getSelectedText().length > 0) {
    // Set marker position if text is selected
    setMarkerPosition(getMarkerPosition());
  } else if (selection.toString().trim() === '' && highlighter && !highlighter.contains(event.target)) {
    // Close and reset the highlighter if click is outside and no text is selected
    highlighter.closePopupAndReset();
  }
});

// Event listener to handle changes in text selection
document.addEventListener("selectionchange", () => {
  if (getSelectedText().length === 0) {
    // Hide the marker button if there's no selected text
    setMarkerPosition({ display: "none" });
  }
});

// Event listener to hide the marker on scroll
window.addEventListener("scroll", () => {
  setMarkerPosition({ display: "none" }); // Hide the marker when the user scrolls
});

// Function to calculate the marker position
function getMarkerPosition() {
  const rangeBounds = window.getSelection().getRangeAt(0).getBoundingClientRect();
  const markerWidth = 40; // Width of the marker button
  return {
    left: rangeBounds.right, // Adjust the left position to the right side
    top: rangeBounds.top - 30,
    display: "flex",
  };
}


