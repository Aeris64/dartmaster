exports.gameplay = questions = [
    {
        type: 'list',
        name: 'type',
        message: 'Choose your gameplay :',
        choices: ['N1', 'N2', 'N3'],
        filter: function(val) {
          return val.toLowerCase();
        }
      }
]

exports.nbPlayer = questions = [
    {
        type: "input",
        name: "nbPlayer",
        message: "How many player ?",
        default: 2,
        validate: function(value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
          },
        filter: Number
    }
]

exports.createPlayer = questions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is your name fighter ?',
    }
]

exports.world = questions = [
    {
        type: 'input',
        name: 'shoot',
        message: 'Sector :',
    }
]

exports.scoring = questions = [
    {
        type: 'input',
        name: 'shoot',
        message: 'Scoring :',
        validate: function(value) {
          var valid = !isNaN(parseFloat(value));
          return valid || 'Please enter a number';
        },
        filter: Number
    }
]

exports.playerName = (index) => {
    return     {
        type: 'input',
        name: 'p'+ index,
        message: 'Name of player :'
    }
}
