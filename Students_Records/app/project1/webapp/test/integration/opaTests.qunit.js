sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/sap/school/project1/test/integration/FirstJourney',
		'com/sap/school/project1/test/integration/pages/StudentsList',
		'com/sap/school/project1/test/integration/pages/StudentsObjectPage',
		'com/sap/school/project1/test/integration/pages/SubjectsObjectPage'
    ],
    function(JourneyRunner, opaJourney, StudentsList, StudentsObjectPage, SubjectsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/sap/school/project1') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheStudentsList: StudentsList,
					onTheStudentsObjectPage: StudentsObjectPage,
					onTheSubjectsObjectPage: SubjectsObjectPage
                }
            },
            opaJourney.run
        );
    }
);