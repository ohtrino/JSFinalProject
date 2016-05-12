var car = (function(kind) {
  var wheelCount = 4;
  var gasInTank = TRUE;
  var i=0;

    // a closure
  var start = function() {
    if (gasInTank) {
      console.log('started with ' + wheelCount + ' wheels - vroom, vroom baby! Oh wait, I need gas :( help me I\'m poor');
      i++;
      if (i>4) {
        gasInTank = FALSE;
      }
    } else {
      console.log("Fill up the tank.")
    }
  };

  return {
    make: kind,
    wheels: wheelCount,
    startEngine: start,
    fillUpTank: function(){
      gasInTank=TRUE;
      i=0;
    }
  };
})('Hummer')

// => Tesla
console.log(car.make);

// => started with 4 wheels.
car.startEngine();