/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Tests to ensure each feed in the allFeeds object has a URL defined
         it('all have defined URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefinedf();
            });
         });

        // Tests to ensure each feed in the allFeeds object has a name defined
         it('all have defined names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefinedf();
            });
         });
    });


    /* Creates test suite named "The menu" */
    describe('The menu', function() {

        /* This test ensures that the menu element is
         * hidden by default. Don't forget to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            var bodyDocument = document.body;
            expect ($(bodyDocument).hasClass('menu-hidden')).toBe(true);
        });

        /* This test ensures that the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('menu changes visibility when clicked', function() {
            $('a.menu-icon-link').click();
            expect(document.body.className).not.toContain('menu-hidden');
            
            $('a.menu-icon-link').click();
            expect(document.body.className).toContain('menu-hidden');
        });

    });


    /*Creates test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('a .entry element exists within the .feed container when loadFeed function is called and completes its work', function() {
             expect( $('.feed').length ).toBeGreaterThan(0);
             done();
        });

        beforeEach(function (done) {
            loadFeed(0, done);
       });
    });


    //Creates test suite named "New Feed Selection"
    describe('New Feed Selection', function() {
             /*This test ensures that when a new feed is loaded
             by the loadFeed function that the content actually changes.
             Note: loadFeed() is asynchronous.*/
            resetFeed(function(done) {
                var oldFeed;
                loadFeed(0, function(){
                    oldFeed = $('.feed .entry > h2').first().text();
                done();
                });
            });
            
            beforeEach(function(done) {
                loadFeed(2, done);
            });

        it ('ensures that the content changes when a new feed is loaded by the loadFeed function', function (done){
            var newFeed = $('.feed .entry > h2').first().text();
            expect(newFeed).not.toBe(oldFeed);
         });    
    });

}());
