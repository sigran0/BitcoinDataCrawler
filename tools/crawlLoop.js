const coinAPI = require('./coinAPI');
const Spinner = require('cli-spinner').Spinner;

let count = 0;
let launchTime = new Date().getTime();

let spinner = new Spinner('waiting... %s');
spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏');

exports.run = () => {
    let loop = () => {
        let start = new Date().getTime();

        setTimeout(() => {
            if(spinner.isSpinning())
                spinner.stop();
            let end = new Date().getTime();

            count += 1;
            console.log('\033c');
            console.log(`#${count} loop called in ${(end - start) / 1000.0} seconds (server life time : ${(end - launchTime) / 1000.0} seconds)`);

            coinAPI.updateData().then((data) => {
                if(!spinner.isSpinning())
                    spinner.start();
            });
            loop();
        }, 10000);
    };
    loop();
};