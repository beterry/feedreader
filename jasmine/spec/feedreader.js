/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against this application.
 */

/* All of the tests are placed within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* A test suite which tests the RSS feeds definitions
    * and the allFeeds variable in our application
    */
    describe('RSS Feeds', function() {
         // Test to make sure that the allFeeds variable happens
         // been defined and that it is not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         // Test that loops through each feed in the allFeeds
         // object and ensures it has a URL defined and the
         // URL is not empty
         it('url defined', function(){
           for(let feed of allFeeds){
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           }
         });

         // Test that loops through each feed in the allFeeds
         // object and ensures it has a name defined and the
         // name is not empty
         it('name defined', function(){
           for(let feed of allFeeds){
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           }
         });
    });


    // a menu test suite
    describe('The menu', function(){

         // tests that the menu element is hidden by default
         it('is hidden', function(){
           const body = document.querySelector('body');
           expect(body.classList.contains('menu-hidden')).toBe(true);
         });

          // tests that the menu changes visibility when the
          // menu icon is clicked
          it('toggles correctly', function(){
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');
            //opens menu
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            // closes menu
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
          });

        });

    // test suite named "Initial Entries"
    describe('Initial Entries', function(){

         // loadFeed is asynchronous so this suite requires
         // the use of Jasmines beforeEach() and done() functions
         beforeEach(function(done){
           loadFeed(0, done);
         });

          // test that ensures when the loadFeed function is called
          // and completes its work, there is at least a single element
          // within the .feed container
         it('completes work', function(){
           const feed = document.querySelector('.feed');
           expect(feed.children.length > 0).toBe(true);
         })

    });

    /* test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        let firstFeed = [];
        let secondFeed = [];
        // loadFeed is asynchronous so this suite requires
        // the use of Jasmines beforeEach() and done() functions
         beforeEach(function(done){
           loadFeed(0, function(){
             // push content into firstFeed array
             let feed = document.querySelector('.feed');
             Array.from(feed.children).forEach(function(entry){
               firstFeed.push(entry.innerText);
             });
             loadFeed(1, function(){
               Array.from(feed.children).forEach(function(entry){
                 secondFeed.push(entry.innerText);
               });
               done();
           });
          });
         });

         // a test that ensures when a new feed is loaded
         // by the loadFeed function that the content actually changes.
         it('content changes', function(){
           expect(firstFeed[0] === secondFeed[0]).toBe(false);
         });

    });

}());
