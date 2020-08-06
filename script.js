
    window.alert("Welcome!")
    var heading = document.createElement("h1");
    var heading_text = document.createTextNode("Big Head!");
    heading.appendChild(heading_text);

    // you have to append the child to an element on the DOM for it to be shown. 
    // document.body.appendChild(heading);

    var div1 = document.getElementById("heading")

    div1.appendChild(heading);

    var paragraph = document.createElement("p");
    var paragraph_text = document.createTextNode("hello my name is Lizzie and this page will be made completely with the DOM and JS");

    paragraph.appendChild(paragraph_text);
    // this reiterates the inheritance of different elements on the DOM. paragraph appends the child of paragraph_text because 
    // this element holds the content of the text inside of it. 

    document.body.appendChild(paragraph);

    var div2 = document.getElementById("paragraph")

    secondParagraph = document.createElement("p")
    secondParagraphText = document.createTextNode('hello again this is my second paragraph'); 

    secondParagraph.appendChild(secondParagraphText)
    div1.appendChild(secondParagraph)


    // making a form with the DOM 
    
    var form = document.getElementById("form")


    // var submit = document.getElementById("submit")
    // submit.addEventListener('click', submit)

    function myFunction() {
        alert("The form was submitted");
 }

    // PHP 
    // <?php
    
    // echo "This is PHP";
    // ?>

    

