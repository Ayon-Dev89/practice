sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'com.sap.school.project1',
            componentId: 'SubjectsObjectPage',
            contextPath: '/Students/subjects'
        },
        CustomPageDefinitions
    );
});