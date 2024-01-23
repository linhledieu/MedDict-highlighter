export function styled({ display = "none", left = 0, top = 0 }) {
    return `
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
    .text-marker {
        fill: white;
    }
    .text-marker:hover {
        fill: rgb(213, 234, 255);
    }

    .popup-box {
        background-color: #2E5288FF; 
        border-radius: 10px; 
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); 
        display: flex; 
        flex-direction: column; 
        align-items: center;
        font-family: 'Arial', sans-serif; 
        padding: 15px;
        position: absolute;
        z-index: 10000;
        max-width: 300px; /* Adjusted maximum width */
        width: 80%; /* Adjusted width to be 90% of the container */
        box-sizing: border-box; 
    }
    
    .header-section {
        width: 100%; /* Take the full width of its container */
        display: flex; 
        justify-content: space-between; /* Space content between left and right sides */
        align-items: center; /* Center content vertically */
        margin-bottom: 20px; 
        flex-wrap: nowrap; // Prevent wrapping of child elements
        justify-content: space-between; // Space out children

    }

    .header-section h1 {
        font-size: 20px; 
        font-weight: bold; 
        margin: 0; 
        color: white; 
        text-align: left; /* Align the text to the left */
        flex: 1; /* Allows the h1 to grow and take available space */
    }
    
    .meaning-image {
        width: 100%; /* Adjust width to 100% of its container */
        max-width: 200px; /* Maximum width of the image */
        max-height: 200px; /* Maximum height of the image */
        height: auto; /* Ensure height adjusts automatically */
        object-fit: contain; /* Maintain aspect ratio within given dimensions */
        margin-bottom: 15px; 
    }
    
    .meanings-list {
        width: 100%; 
        list-style: none; 
        padding: 0; 
        margin: 0;
        border-top: 1px solid #ccc; 
        border-bottom: 1px solid #ccc; 
        margin-bottom: 15px; /* Increased bottom margin */
    }
    
    .meanings-list li {
        font-size: 14px; 
        line-height: 1.6; 
        padding: 10px 0; 
        color: white; 
    } 
    
    .popup-box-link, .search-button {
        background-color: #007bff; /* Blue background for MedDict button */
        color: white; /* White text */
        padding: 10px 20px; /* Adjusted padding for vertical centering */
        text-decoration: none;
        border-radius: 20px;
        display: inline-block;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        margin: 0 20px; /* Space between buttons */
        text-align: center; /* Center text horizontally */
        line-height: 20px; /* Adjust line height to vertically center the text */
        border: none; /* Remove any borders */
        box-shadow: none; /* Remove any box shadows */
        transition: background-color 0.3s; /* Smooth background color transition on hover */
    }

    .popup-box-link:hover, .search-button:hover {
        background-color: #0056b3; // Darker blue on hover for MedDict button
    }

    .search-button {
        background-color: #D32727FF; 
        box-shadow: none;
        border: none;
    }

    .search-button:hover {
        background-color: #990000; // Lighter red on hover
    }
    
    .sound-button {
        margin-left: auto;
        margin-right: 0;
        width: 40px; /* Reduced width */
        height: 40px; /* Reduced height */
        background-color: #D32727FF;
        border-radius: 50%;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    
    .sound-icon {
        width: 70%; /* Adjusted size */
        height: 50%; /* Adjusted size */
        fill: #FFFFFF;
    }
    
    .sound-button:hover {
        background-color: #FF0000FF;
    }
    
    .sound-button:active {
        background-color: #990000FF;
    }
`;
}
