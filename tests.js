//1.  What is wrong with this statement? 
typeof bar === "object"

// Nothing except that if bar was assigned to null, it would still be a confirmed object. We would therefore need to check 
// that the variable wasn't equal to null before confirming it's an object - like this: 
console.log((bar !== null) && (typeof bar === "object")); 

// 2. 
(function(){
    var a = b = 3
})

console.log("a defined?" + typeof a !== 'undefined')
console.log("b defined?" + typeof b !== 'undefined')

answer is actually "a defined?  false "  "b defined? true" --- in unstrict mode 
// this is because var a = b = 3 is short for: 
var a = b 
b = 3 
// In STRICT mode it would actually come back as a reference error because b has not been defined.


//  3. 
var myObject = {
    foo: "bar",
    func: function() {
        // func is instance with function 
        var self = this;
        // self refers to function 
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        }());
    }
};
myObject.func();

outer func:  this.foo = bar
outer func:  self.foo = bar
inner func:  this.foo = undefined
inner func:  self.foo = bar
In the outer function, both this and self refer to myObject and therefore both can properly reference and access foo.

In the inner function, though, this no longer refers to myObject. As a result, this.foo is undefined in the inner function, 
whereas the reference to the local variable self remains in scope and is accessible there.

// This is SUPER IMPORTANT BECAUSE IT IS ABOUT SCOPE. The this and self refer to object in outer function, but no longer become accessible
// in the inner function. 

4. What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?
// It's a modern practice used to make functions easily accessible and exportable. It also means namespacing is easier because it
// creates a private namespace - names can be repeated but because you're in a function, it does not matter as much. it's also clearer and 
// easier to get what you need on a global scale. 

What is the significance, and what are the benefits, of including 'use strict' at the beginning of a JavaScript source file?

*Makes debugging easier 
*prevents accidental globals 
*prevents this coercion - this for a null or undefined variable will show an error 


//5.  Do these two functions return the same thing? 

function foo1()
{
  return {
      bar: "hello"
  };
}

function foo2()
{
  return
  {
      bar: "hello"
  };
}

// Interestingly, NO they don't - because foo2 will come back as undefined. This is due to the fact that 
// return is given a semi-colon on the end of it because there is nothing else on that line. JS adds a semi-colon in 
// situations like these. No error is thrown since the remainder of the code is perfectly valid, even though it doesn’t 
// ever get invoked or do anything (it is simply an unused code block that defines a property bar which is equal to the string 
// "hello"). - making it undefined. So the answer is: 
// foo1 returns:
// Object {bar: "hello"}
// foo2 returns:
// undefined 

// 6. NaN == "not a Number". It is used when a sum cannot be completed because an element in the equation is not a Number. 

// 7. What will the code below output? Explain your answer.

console.log(0.1 + 0.2);
console.log(0.1 + 0.2 == 0.3);

// The correct answer is YOU CANNOT BE SURE. Numbers in JS are all treated with floating point precision. 
// So this could actually come back as: 
0.30000000000000004
false

// To work out whether the answer is actually close to this result: 
function areTheNumbersAlmostEqual(num1, num2) {
	return Math.abs( num1 - num2 ) < Number.EPSILON;
}
console.log(areTheNumbersAlmostEqual(0.1 + 0.2, 0.3));

The Number.EPSILON property represents the difference between 1 and the smallest floating point number greater than 1.
// So if the result is less that Number.EPSILON you can expect that they are close to being equal. 

Discuss possible ways to write a function isInteger(x) that determines if x is an integer.

// Because, esp prior to E6, integers weren't really established things - everyhing was really a floating object - you have to 
// check if something isInteger via functions. 
One way of doing this is: 

function isInteger(x){
    if ((typeof x === Number) && (x % 1 === 0)){
        return true
    }
}


(function() {
    console.log(1); 
    setTimeout(function(){console.log(2)}, 1000); 
    setTimeout(function(){console.log(3)}, 0); 
    console.log(4);
})();
=== 1,4,3,2

Write a simple function (less than 160 characters) that returns a boolean 
indicating whether or not a string is a palindrome.
// A palindrome is a word that is the exact same when reversed. - hannah, poop, pop 
function isPalindrome("hannah"){
    console.log("is palindrome?" + x.reverse() === x)
// }change to ARRAY before reversing -- but on the right lines. 


Write a sum method which will work properly when invoked using either syntax below.

console.log(sum(2,3));   // Outputs 5

function sum(2, 3){
    return a + b ;
}


// what gets logged to the console: 

for (var i = 0; i < 5; i++) {
    var btn = document.createElement('button');
    btn.appendChild(document.createTextNode('Button ' + i));
    btn.addEventListener('click', function(){ console.log(i); });
    document.body.appendChild(btn);
  }

//   answer is always 5.  This is because, at the point that the onclick method is 
// invoked (for any of the buttons), the for loop has already completed and the variable i already has a value of 5. 
// To avoid this issue, capture the value of i at each pass through the for loop by passing it into a newly created function object. 
// main thing is passing through the current (i) into the function 

for (var i = 0; i < 5; i++) {
    var btn = document.createElement('button');
    btn.appendChild(document.createTextNode('Button ' + i));
    btn.addEventListener('click', (function(i) {
      return function() { console.log(i); };
    })(i));
    document.body.appendChild(btn);
  }


console.log(1 +  "2" + "2");
console.log(1 +  +"2" + "2");
console.log(1 +  -"1" + "2");
console.log(+"1" +  "1" + "2");
console.log( "A" - "B" + "2");
console.log( "A" - "B" + 2);
// answers;

"122"
"32"
"02"
"112"
"NaN2"
NaN

Based on order of operations, the first operation to be performed is +"2" 
(the extra + before the first "2" is treated as a unary operator). 
Thus, JavaScript converts the type of "2" to numeric and then applies the unary + sign to it 
(i.e., treats it as a positive number). As a result, the next operation is now 1 + 2 which of course yields 3
// super interesting ^^^^


The following recursive code will cause a stack overflow if the array list is too large. 
How can you fix this and still retain the recursive pattern?

var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        nextListItem();
    }
};

// answer: 

var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        setTimeout( nextListItem, 0);
    }
};

The stack overflow is eliminated because the event loop handles the recursion, not the call stack. When nextListItem runs, if item is not null, the timeout function (nextListItem) 
is pushed to the event queue and the function exits, thereby leaving the call stack clear. 
/ITS ABOUT PUSHING SOMETHING TO THE EVENT QUEUE INSTEAD OF THE CALL STACK. 



// CLOSURES EXPLAINED: 

var globalVar = "xyz"

(function(outerArg){
    var outerVar = "a"
    (function(innerArg){
        var innerVar = "b"

        console.log(globalVar)
        console.log(outerArg)
        console.log(innerArg)
        console.log(outerVar)
        console.log(innerVar)
    })(456)
})(789)

// answers: 
"xyz"
789
456
"a"
"b"

This is because inner functions - closures - have access to 3 scopes: 
1. variables in it's own scope
2. variables in the outer function's scope
3. global variables. 


// What will the output be here?
for (var i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
}

The answer is 5,5,5,5,5 -- this is because any function inside the loop will be run after the loop has finished. 
To avoid this circumstance, we need to reference the item inside the function, like below: 

for (let i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
}


What would the following lines of code output to the console?
console.log("0 || 1 = "+(0 || 1));
console.log("1 || 2 = "+(1 || 2));
console.log("0 && 1 = "+(0 && 1));
console.log("1 && 2 = "+(1 && 2));

// answers: 

0 || 1 = 1
1 || 2 = 1
0 && 1 = 0
1 && 2 = 2

In JavaScript, both || and && are logical operators that return the 
first fully-determined “logical value” when evaluated from left to right.

The and (&&) operator. In an expression of the form X&&Y, X is first evaluated and interpreted as a boolean value. 
If this boolean value is false, then false (0) is returned and Y is not evaluated, since the “and” condition has already failed. 
If this boolean value is “true”, though, we still don’t know if X&&Y is true or false until we evaluate Y, and interpret it as a boolean value as well.
So, for || the first digit will be returned, with && it's likely the first digit will be returned if false - because it will not 
need to check the second digit (0). If it does require to check this second digit, the express will be evaluated as true, and this digit may be returned. 

However, the interesting thing with the && operator is that when an expression is evaluated as “true”, 
then the expression itself is returned. This is fine, since it counts as “true” in logical expressions, 
but also can be used to return that value when you care to do so. 
This explains why, somewhat surprisingly, 1 && 2 returns 2 (whereas you might it expect it to return true or 1).


What is the output out of the following code? Explain your answer.

var a={},
    b={key:'b'},
    c={key:'c'};

a[b]=123;
a[c]=456;

console.log(a[b]);

The answer here is actually 456. This is because a[b] and a[c] are completely interchangable. When setting an object property, JavaScript will implicitly stringify the parameter value.
 In this case, since b and c are both objects, they will both be converted to "[object Object]". As a result, a[b] anda[c] are both equivalent to a["[object Object]"] and can be used interchangeably.
 Therefore, setting or referencing a[c] is precisely the same as setting or referencing a[b].



 What will the following code output to the console and why:

var hero = {
    _name: 'John Doe',
    getSecretIdentity: function (){
        return this._name;
    }
};

var stoleSecretIdentity = hero.getSecretIdentity;

console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());


This will return: 
undefined 
John Doe 

The reason for this, is in the first console.log, it refers to an element that goes directly to the method of hero - bypassing the name variable. 
Because it hasn't gone through the name, that means it makes it impossible to know what the name actually is. 
One way to resolve this is to change the variable to var stoleSecretIdentity = hero.getSecretIdentity.bind(hero); - which means it binds the method to the object, 
therefore encompassing the name too. 

Create a function that, given a DOM Element on the page, will visit the element itself and all of its descendents (not just its immediate children). For each element visited, the function should pass that element to a provided callback function.

The arguments to the function should be:

a DOM element
a callback function (that takes a DOM element as its argument)

function Traverse(p_element,p_callback) {
    p_callback(p_element);
    var list = p_element.children; //interesting way to go about this - grabs all the children elements and adds them to a list
    // then iterates over them - and completes the function inside with each child. 
    for (var i = 0; i < list.length; i++) {
        Traverse(list[i],p_callback);  // recursive call
    }
 }



 Testing your this knowledge in JavaScript: What is the output of the following code?

var length = 10;
function fn() {
	console.log(this.length);
}

//answer: 10 for first console.log because this refers to the window length - which has globally been declared at 10. 

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};

obj.method(fn, 1);

// answer: 2 for second console - not 5.
// arguments[0]() is nothing but calling fn(). Inside fn now, the scope of this function becomes the arguments array, and logging the length of arguments[] will return 2.
// Hence the output will be as above.

Consider the following code. What will the output be, and why?

(function () {
    try {
        throw new Error();
    } catch (x) {
        var x = 1, y = 2;
        console.log(x);
    }
    console.log(x);
    console.log(y);
})();

output: 
1
undefined 
2
The reason for this is that statements are hoisted to the top of the global or function scope it belongs to. y is at it's highest point (there is no othey y above it), therefore it will be the same result 
outside of the try/catch formula as it is inside. X, however, has been declared again above it - in a parameter of catch. This means the scope of the x exists solely in the 
catch/throw formula - as opposed to the wider function. For this reason, the second output of x has to be undefined. This is all within a function - it would not work the same with global 
scope as we will soon see. 

another example:
var statements are hoisted (without their value initialization) to the top of the global or function scope it belongs to, even when it’s inside a with or catch block. However, the error’s identifier is only visible inside the catch block. It is equivalent to:

(function () {
    var x, y; // outer and hoisted
    try {
        throw new Error();
    } catch (x /* inner */) {
        x = 1; // inner x, not the outer one
        y = 2; // there is only one y, which is in the outer scope
        console.log(x /* inner */);
    }
    console.log(x);
    console.log(y);
})();


var x = 21;
var girl = function () {
    console.log(x);
    var x = 20;
};
girl ();

This will come back as neither 20 or 21 because no x has been declared inside the function, prior to the console.log. 


How do you clone an object? 

var obj = {a: 1 ,b: 2}
var objclone = Object.assign({},obj);


Note the potential pitfall, though: Object.clone() will just do a shallow copy, not a deep copy. This means that nested objects aren’t copied. They still refer to the same nested objects as the original:

let obj = {
    a: 1,
    b: 2,
    c: {
        age: 30
    }
};

var objclone = Object.assign({},obj);
console.log('objclone: ', objclone);

obj.c.age = 45;
console.log('After Change - obj: ', obj);           // 45 - This also changes
console.log('After Change - objclone: ', objclone); // 45

// so ^ when you clone and change the objclone instances, it will also change the obj instances, because they are tighed together. 

What do the following lines output, and why?

console.log(1 < 2 < 3);
console.log(3 > 2 > 1);

first: true
second: false 

This is due to the way that these operators are used - they manoeuvre from left to right. 
Therefore, even though 3 > 2 is correct, it will then measure if true is > 1. True has the value of 1, so it then compares 1 > 1, which is false.
3 GREATER THANS IN A ROW WILL ALWAYS EQUATE TO FALSE BECAUSE IT TURNS TO TRUE AND TRUE IS EQUIVALENT TO ONE. 

var a = [1 2, 3]

a[6] 
a[10]
What will they equal? 

Here, a[6] will output undefined, but the slot still remains empty rather than filled with undefined. 
So, essentially, even though the output is undefined - the important thing to note is that the remaining indexes will still be formed - but they will be blanks. 
a = [1, 2, 3, , , , , , ,]
but because the position is blank, the output will still be undefined. 

What is the value of typeof undefined == typeof NULL?


The expression will be evaluated to true, since NULL will be treated as any other undefined variable.
Note: JavaScript is case-sensitive and here we are using NULL instead of null.
if it was null, the answer would be false because null and undefined are differet data types 

