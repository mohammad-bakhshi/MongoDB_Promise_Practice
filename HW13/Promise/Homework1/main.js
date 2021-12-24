const fs = require('fs');

function Access(path) {
    return new Promise((resolve, reject) => {
        fs.access(path, (err) => {
            if (err)
                reject();
            else resolve();
        })
    });
}

function Read(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err)
                reject();
            else resolve(data);
        })
    });
}

function Write(path,data)
{
    return new Promise((resolve, reject) => {
        fs.writeFile(path,data,'utf-8', (err) => {
            if (err)
                reject();
            else resolve();
        })
    });
}


Promise.all([Access('./names.txt'), Access('./numbers.txt')])
    .then(function () {
        return Promise.all([Read('./names.txt'), Read('./numbers.txt')])
    })
    .then(([namesText, numbersText]) => {
        let namesArray = namesText.split('\r\n');
        let numbersArray = numbersText.split('\r\n');
        let names = [];
        let numbers = [];
        let answer='';
        for (let index = 0; index < namesArray.length; index++) {
            names.push(namesArray[index].split('-'));
        }


        for (let index = 0; index < numbersArray.length; index++) {
            numbers.push(numbersArray[index].split('-'));
        }

        for (let index = 0; index < names.length; index++) {
            let array = [];
            for (let counter = 0; counter < numbers.length; counter++) {
                if (numbers[counter][0] === names[index][0]) {
                    array.push(numbers[counter][1]);
                }
            }
            if (array.length === 0) {
                answer+=names[index][1] + "hasn't any phone number.\n";
            }
            else if (array.length === 1) {
                answer+=names[index][1] + "'s phone number is " + array[0]+'\n';
            }
            else {
                let temp = '';
                for (let i = 0; i < array.length; i++) {
                    if (i === array.length - 1) {
                        temp += array[i];
                    }
                    else {
                        temp += array[i] + ',';
                    }
                }
                answer+=names[index][1] + "'s phone numbers are " + temp+'\n';
            }
        }
        Write('./answer.txt',answer);
    }).catch((err) => console.log(err))
