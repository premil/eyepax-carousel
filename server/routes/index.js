module.exports = (app) => {
    require("./carousel")(app);
    
    app.get("/", (req, res) => {
        res.status(200).json({
            status: true,
            status_code: 200,
            message: "Success",
          });
    })
}