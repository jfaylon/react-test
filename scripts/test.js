const jest = require("jest");
let argv = process.argv.slice(2);

argv.push("--detectOpenHandles");
// prevents open handles
argv.push("--runInBand");
argv.push("--colors");

jest.run(argv);
