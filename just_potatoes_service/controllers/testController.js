module.exports.test =  (req, res) => {
    message = "inside test. successful"
    console.log(message);
    res.json({message});
}
