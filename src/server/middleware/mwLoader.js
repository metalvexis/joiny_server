
// skip exectution of 'middleware' on matching 'paths'
const skip = function (middleware, ...paths) {
  console.log(`MW skip ${paths}`);
  // console.log({paths});
  return function (req, res, next) {
    const pathCheck = paths.some(path => path === req.path);
    pathCheck ? next() : middleware(req, res, next);
  };
};


export const mwLoader = {
  skip
};