export function styled({ display = "none", left = 0, top = 0 }) {
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
        line-height: 1.6;
        padding: 10px 0;
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
`;
}
