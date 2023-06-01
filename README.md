# This program was created as a semester project of the KAJ

## (CTU - SIT summer semester 2023)

## Authors: Dmitry Rastvorov

## Contents

### [Web page](#webPage)

### [Project goal](#projGoal)

### [Process](#proc)

### [Description of functionality](#descfunc)

### [Comments in source code](#comment)

<a name="webPage"><h2>Web page</h2></a>
Project web page can be found by [clicking here](https://unknownpug.github.io/DijaCZ/)

<a name="projGoal"><h2>Project goal</h2></a>

🔘 The goal of the project was to get familiar with HTML, CSS, JavaScript languages, learn how to use libraries, API. explore how to create a website on the Front End side.

🔘 Dija.cz was made to make it easier for people to work with documents by storing them on this website and thus interacting with them online.

<a name="proc"><h2>Process</h2></a>

🔘 The development process consists of 3 parts: HTML5, CSS, JavaScript. If the item is marked as "⚠️", it means that the item was not done for a specific reason, which will be explained.

🔘 This description of the process is directly linked to the project evaluation table, which you can find [by clicking here](https://docs.google.com/spreadsheets/d/18rSiofsqOHGTXj_Zbs1s-rtB2URXG4iUmxn_5JtwWDY/edit#gid=0)

#### HTML
✅ Validity - Valid use of HTML5 doctype (https://validator.w3.org)

✅ Validity - Functioning in modern browsers in the latest development versions (Chrome, Firefox, Safari, Edge, Opera)

✅ Semantic tags - Correct use of semantic tags (section, article, nav, aside, ...)

✅ Graphics - SVG / Canvas

✅ Media - Audio/Video

✅ Form elements - Wildcard, autofocus

⚠️ Offline application - Using the possibility of the site functioning without Internet connection
   - Explanation: The application cannot be used offline, as there is a need to connect to the network to create new documents and save them. Also, there will be no access to the radio, as there is a need to be connected to the network to play it.

#### CSS
✅ Advanced selectors - Use of advanced pseudo-classes and combinators

✅ Vendor prefixes

✅ CSS3 2D/3D transformations

✅ CSS3 transitions/animations

✅ Media queries - The site works on mobile devices and others (i.e. it doesn't crash)

#### JavaScript
✅ OOP usage - Prototype inheritance, its use, namespaces

⚠️ Using a JS framework or library - Use and understanding of jQuery, React, Vue
   - Explanation: Using a JavaScript framework or library like jQuery, React, or Vue might not be a good choice for this code because it is relatively simple and does not require the additional complexity, learning curve, performance overhead, dependency management, and increased file size that comes with using a framework or library. It's better to keep the code lean and minimize dependencies.

✅ Using advanced JS APIs - Use of advanced APIs (File API, Drag & Drop, LocalStorage)

✅ Functional history - Scrolling with back/forward buttons of the browser - if it follows from the functionatilty (History API)

✅ Media control - Use Media API (video, audio), playback from JS

⚠️ Offline application - Use of JS API for status discovery
   - Explanation: The provided code doesn't require the use of a JavaScript API for status discovery. It primarily focuses on managing document cards and performing actions such as adding, deleting, and updating their data.

⚠️ JS work with SVG - events, creation, editing.
   - Explanation: There are no events, creations, or edits in this project that require the use of JavaScript with SVG.

<a name="descfunc"><h2>Description of functionality</h2></a>

The website is a way of storing documents. The user can browse through the website and has 5 buttons available:

    - "Home" - The page contains a description of the website.

    - "Czech Radio" - The page contains a radio player wich is connected to "Český Rozhlas". Contains 12 different channels. 

    - "My Documents" - The page where our documents will be. You can add new documents and delete them (manipulate them).

    - "About Us" - The page contains a description about us. What the page was made for.

    - "Contact Info" - Admin information page.
    
<a name="comment"><h2>Comments in source code</h2></a>

🔘 The comments to the description of the document manipulation can be found in the code itself by [clicking here](https://github.com/UnknownPug/DijaCZ/blob/main/src/js/ControllerDocument.js)

🔘 The comments to the description of the audio script can be found in the code itself by [clicking here](https://github.com/UnknownPug/DijaCZ/blob/main/src/js/AudioScript.js)

## Thank you for your attention 🤝
