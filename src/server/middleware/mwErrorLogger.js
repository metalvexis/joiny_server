
export const mwErrorLogger = ( err, req, res, next ) => {
  // console.error("Error Detected");
  console.error(err);
  res.status(400).send({error:err.message});
};

