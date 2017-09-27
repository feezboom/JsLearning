var animal = {
    eats: true
};

var rabbit = {
    jumps: true
};

rabbit.__proto__ = animal;

// console.log(animal.eats);
// console.log(rabbit.eats);


var Animal = function() {
    this.sound = undefined;
};

var Mammal = function() {
    this.prototype = Animal;
};


var Person = function(name, surname, age) {
    debugger;
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.sex = "undef";
    this.prototype = Mammal;
    // this.getSex = function() {
    //     return this.sex;
    // }
};

Person.prototype.getName = function() {
    return this.name + ' ' + this.surname;
};


// How to define method inside class?
// Person.prototype.getSex = function () {
//     return this.sex;
// };

Person.getSex = function () {
    return this.sex;
};

var Man = function()
{
    base(this);

    this.sex = "male";
};

var Woman = function() {
    this.sex = "female";
};
//
// function tempCtor() {}
// tempCtor.prototype = Person.prototype;
//
// Man.prototype = new tempCtor();

//Woman.prototype = Person;

var inherits = function(childCtor, parentCtor) {
    /** @constructor */
    var tempCtor = function() {};
    tempCtor.prototype = parentCtor.prototype;
    childCtor.superClass_ = parentCtor.prototype;
    childCtor.prototype = new tempCtor();
    /** @override */
    childCtor.prototype.constructor = childCtor;
};

var base = function(me, opt_methodName, var_args) {
    var caller = arguments.callee.caller;

    if (goog.STRICT_MODE_COMPATIBLE || (goog.DEBUG && !caller)) {
        throw Error(
            'arguments.caller not defined.  goog.base() cannot be used ' +
            'with strict mode code. See ' +
            'http://www.ecma-international.org/ecma-262/5.1/#sec-C');
    }

    if (caller.superClass_) {
        // Copying using loop to avoid deop due to passing arguments object to
        // function. This is faster in many JS engines as of late 2014.
        var ctorArgs = new Array(arguments.length - 1);
        for (var i = 1; i < arguments.length; i++) {
            ctorArgs[i - 1] = arguments[i];
        }
        // This is a constructor. Call the superclass constructor.
        return caller.superClass_.constructor.apply(me, ctorArgs);
    }

    // Copying using loop to avoid deop due to passing arguments object to
    // function. This is faster in many JS engines as of late 2014.
    var args = new Array(arguments.length - 2);
    for (var i = 2; i < arguments.length; i++) {
        args[i - 2] = arguments[i];
    }
    var foundCaller = false;
    for (var ctor = me.constructor; ctor;
         ctor = ctor.superClass_ && ctor.superClass_.constructor) {
        if (ctor.prototype[opt_methodName] === caller) {
            foundCaller = true;
        } else if (foundCaller) {
            return ctor.prototype[opt_methodName].apply(me, args);
        }
    }

    // If we did not find the caller in the prototype chain, then one of two
    // things happened:
    // 1) The caller is an instance method.
    // 2) This method was not called by the right caller.
    if (me[opt_methodName] === caller) {
        return me.constructor.prototype[opt_methodName].apply(me, args);
    } else {
        throw Error(
            'goog.base called from a method of one name ' +
            'to a method of a different name');
    }
};

inherits(Man, Person);

///////////////////////////////////////////////////////////////////////////////

var test1 = function () {
    // console.log("Hello, world!");
    var p = new Man("hello", "world", 20);
    console.log(p.getSex());
};



var Car = function() {

};

Car.__proto__.drive = function() {
    console.log('driving!');
};


var test2 = function () {
    var car = new Car();
    car.drive();
};

var test3 = function () {
    alert('test3');
};

var test4 = function () {
    alert('test4');
};
