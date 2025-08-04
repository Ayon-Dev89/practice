const cds = require("@sap/cds");
const { Upskills_emp } = cds.entities("com.sap.capgemini");


module.exports["adminService"] = srv =>{

    //read

// *********************************************************************************************************
    // insert
    srv.on("CREATE" , "Insert_upskillsSRV" , async (req ) => {
        let returnData = await cds
            .transaction(req)
            .run(
                INSERT.into(Upskills_emp).entries({
                    id         : req.data.id,
                    trainingid : req.data.trainingid,
                    trainingname   : req.data.trainingname,
                    numberofdays   : req.data.numberofdays,
                    startdate      : req.data.startdate,
                    completiondate : req.data.completiondate,
                    status         : req.data.status
                })
            ).then((resolve, reject)=>{
                console.log("resolve:", resolve);
                console.log("reject:", reject);

                if(typeof resolve !== "undefined"){
                    return req.data;
                }else{
                    req.error(409,"Records Not Founds")
                }
            }).catch(err => {
                console.log(err);
                req.error(500,"Error In Updating Records");
            });
            console.log("Before End", returnData);
            return returnData;
    });


    // insert js function
    srv.on("CREATE", "Insert_upskillsSRV1", async (req) => {
        try {
            const result = await cds.transaction(req).run(
                INSERT.into(Upskills_emp).entries(req.data)
            );
    
            if (result) {
                console.log("Inserted:", result);
                return req.data;
            } else {
                req.error(409, "Record not inserted");
            }
        } catch (err) {
            console.error("Insertion Error:", err);
            req.error(500, "Error during record insertion");
        }
    });
//************************************************************************************************* */

// update*************************************************************************************************

srv.on("CREATE", "Update_upskillsSRV" , async (req,res)=>{
    
    const { id, trainingid, trainingname, numberofdays, startdate, completiondate, status } = req.data;
    let returnData = await cds
        .transaction(req)
        .run([
            UPDATE(Upskills_emp)
            .set({
                trainingname,
                numberofdays,
                startdate,
                completiondate,
                status
              })
              .where({ id, trainingid })
        ]).then((resolve , reject)=>{
            console.log("resolve:", resolve);
            console.log("reject:", reject);

            if (typeof resolve !== "undefined") {
                return req.data;
            } else {
                req.error(409, "Record Not Found");
            }
        }).catch(err=>{
            console.log(err);
            req.error(500, "Error in Updating Record");    
        });
        console.log("Before End", returnData);
        return returnData;
});

// second update************************************

srv.on("CREATE", "Update_upskillsSRV1", async (req) => {
    const { id, trainingid, trainingname, numberofdays, startdate, completiondate, status } = req.data;
  
    try {
      const result = await cds.transaction(req).run(
        UPDATE(Upskills_emp)
          .set({
            trainingname,
            numberofdays,
            startdate,
            completiondate,
            status
          })
          .where({ id, trainingid })
      );
  
      console.log("Update result:", result);
  
      if (result > 0) {
        return req.data;
      } else {
        req.error(409, `Record with ID ${id} and TrainingID ${trainingid} not found`);
      }
    } catch (err) {
      console.error("Error during update:", err);
      req.error(500, "Internal server error while updating record");
    }
  });

// *************************************************************************************************************


// delete ******************************************************************************************************
srv.on("CREATE", "Delete_upskillsSRV" , async (req,res)=>{
    
    let returnData = await cds
        .transaction(req)
        .run([
            DELETE.from(Upskills_emp)
            .where({ id : req.data.id, trainingid:req.data.trainingid })
        ]).then((resolve , reject)=>{
            console.log("resolve:", resolve);
            console.log("reject:", reject);

            if (typeof resolve !== "undefined") {
                return req.data;
            } else {
                req.error(409, "Record Not Found");
            }
        }).catch(err=>{
            console.log(err);
            req.error(500, "Error in Updating Record");    
        });
        console.log("Before End", returnData);
        return returnData;
});



// ***********************
srv.on("CREATE", "Delete_upskillsSRV1", async (req) => {
    const { id, trainingid } = req.data;
  
    try {
      const result = await cds.transaction(req).run(
        DELETE.from(Upskills_emp).where({ id, trainingid })
      );
  
      console.log("Delete result:", result);
  
      if (result > 0) {
        return req.data;
      } else {
        req.error(409, `Record with ID ${id} and Training ID ${trainingid} not found`);
      }
    } catch (err) {
      console.error("Error during deletion:", err);
      req.error(500, "Internal server error while deleting record");
    }
  });

}