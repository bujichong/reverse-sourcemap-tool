const path = require('path');
const fs = require('fs-extra');
const findFiles = (filepath, matcher, is_recurse) => {
	let files = [], stat;
	try {
    	stat = fs.statSync(filepath);
  	}
  	catch (error) {
    	console.error(`Filepath "${filepath}" could not be read`);
    	return files;
  	}
	if (stat.isDirectory() && is_recurse) {
        const list = fs.readdirSync(filepath);
        list.forEach((item) => {
        	files = files.concat(findFiles(path.join(filepath, item), matcher, is_recurse));
        });
    }
    else if (filepath.match(matcher) && stat.isFile()) {
        files.push(filepath);
    }
    return files;
}

exports = module.exports = findFiles;