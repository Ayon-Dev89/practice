const cds = require("@sap/cds");
const { Upskills_emp } = cds.entities("com.cg.ayon");

module.exports["adminService"] = srv => {

    srv.on("CREATE", "Insert_upskillsSRV", async (req) => {
        let returnData = await cds.transaction(req).run(
            INSERT.into(Upskills_emp).entries({
                id: req.data.id,
                trainingid: req.data.trainingid,
                trainingname: req.data.trainingname,
                numberofdays: req.data.numberofdays,
                startdate: req.data.startdate,
                completiondate: req.data.completiondate,
                status: req.data.status
            })
        ).then((resolve, reject) => {
            console.log("resolve:", resolve);
            console.log("reject:", reject);

            if (typeof resolve !== "undefined") {
                return req.data;
            } else { req.error(409, "Records not found") }
        }).catch(err => {
            console.log(err);
            req.error(500, "Error in Updating Records");
        });
        console.log("Before End", returnData);
        return returnData;
    });
}
