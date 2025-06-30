sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/cpg/bookshop/bookshop/test/integration/FirstJourney',
		'com/cpg/bookshop/bookshop/test/integration/pages/BooksList',
		'com/cpg/bookshop/bookshop/test/integration/pages/BooksObjectPage',
		'com/cpg/bookshop/bookshop/test/integration/pages/ReviewsObjectPage'
    ],
    function(JourneyRunner, opaJourney, BooksList, BooksObjectPage, ReviewsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/cpg/bookshop/bookshop') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheBooksList: BooksList,
					onTheBooksObjectPage: BooksObjectPage,
					onTheReviewsObjectPage: ReviewsObjectPage
                }
            },
            opaJourney.run
        );
    }
);