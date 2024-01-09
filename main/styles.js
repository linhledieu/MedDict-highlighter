export function styled({ display = "none", left = 0, top = 0 }) {
    return `
    #meddictHighlighter {
        align-items: center;
        background-color: #2E5288FF;
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
        padding: 20px;
        position: absolute;
        z-index: 10000;
        max-width: 400px; 
        width: 100%; 
        box-sizing: border-box; 
    }
    
    .header-section {
        width: 100%; /* Take the full width of its container */
        display: flex; 
        justify-content: space-between; /* Space content between left and right sides */
        align-items: center; /* Center content vertically */
        margin-bottom: 20px; 
    }

    .header-section h1 {
        font-size: 24px; 
        font-weight: bold; 
        margin: 0; 
        color: white; 
        text-align: left; /* Align the text to the left */
        flex: 1; /* Allows the h1 to grow and take available space */
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
        color: white; 
    } 
    
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

    
    .sound-button {
        margin-left: auto; /* Push the button to the right */
        margin-right: 0; /* Optional: for clarity, ensures button is right-aligned */
        width: 50px;
        height: 50px;
        background-color: #D32727FF;
        border-radius: 50%;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    
      .sound-icon {
        width: 80%;
        height: 60%;
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
