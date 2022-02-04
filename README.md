# PiedPiper workspace test AKA Automation Interview Task - Frontend
Task: Automate a test for starring a message in Slack <br>
Test scenario:
 - As a user of PiedPiper (test data workspace) login to workspace
 - Navigate to general channel
 - Post a message
 - Verify message appearing in current channel
 - Hover over message, click on 'Add to saved items'
 - On the channel sidebar click on Saved items to open Saved items list
 - Verify that message appears in list
 - Click on the search bar at the top and search for 'has:star'
 - Verify that message appears in the search results
 
## Technologies
 - TypeScript
 - Node
 - @playwright/test
 
 #### Why Pllaywright / TS ?
 I decided to go with Playwright for 2 reasons:
 - that's the growing in popularity tool that I'm actively exploring right now
 - Alan mentioned that you're looking into it at as well at Slack 
 Feel free to use anything from this framework, that you find interesting 
 Initial thought was to choose between Cypress and Playwright, but after a couple dry-runs I haven't noticed any 
 performance benefits for Cypress considering pretty small scope of the test scenario
 
 ## Project structure
 - ```global-setup-teardown``` directory contains files for a global setup and teardown
    - global-setup.ts - logs into a workspace and saves current cookies and local storage snapshot to the storageState.json file, which then allows to reuse 'authenticated' state between all tests. Runs once before all tests
    - global-teardown.ts - cleans up the test data (deletes the posted message). Runs once after all tests
 - ```globalconfig``` directory contains global configuration file. Current configuration links global-setup-teardown files, overrides some default timeouts, provides viewport size for the browser, turns off headless mode, slows down execution (make it easier to see what's happening in the browser), configures multiple report types
 - ```pages``` directory contains representation of pages with Page Object Model design pattern.
    - ```components``` contains pages braked down into smaller component pieces (I call it Component Object Model =) )
 - ```test``` contains actual test
 - ```test-data``` directory contains test-data, in the case of this challenge it contains some constant values, which are used in different parts of the project
 - ```util``` utilities
 
 ## How to run
 1. If you have Slack desktop application installed on your machine (I don't), move it (temporarily) to the trash folder. There is a chance you might be force switched from web to desktop version in case you have desktop app installed
 
 2. You'll need Node. If you don't have it, here is the installation [LINK](https://nodejs.org/en/)
 
 3. Since Typescript is not included in dependencies, you might need to install it. You can follow instructions from [typescript link](https://www.typescriptlang.org/download) (I have TS installed globally)
 
 4. To install dependencies run in CLI
    ```bash
    npm i
    ```
    
 5. To install playwright browsers run in CLI
    ```bash
    npx playwright install
    ```
    
 6. To run tests 
    ```bash
    npm test
    ```
    it will execute ```npx playwright test --config=globalconfig/playwright.config.ts``` script, which points to global configuration file
    
 7. Enjoy the test run! (Config is set to headless=false, so you can actually see what's going on in the browser, you can switch it to =true and check the test logging in console)
 
 ## Test results
 Playwright Test will provide test result in CLI as well as it will generate/update ```test-results.json``` file in this project. Also, you can find test results in the test execution log in console
 
 ## Something went wrong AKA Hiccups
 - As I already mentioned above there could be some issues, if you have desktop client installed. By default Playwright 
 dismisses all the browser alerts, but I envision there might be some hiccups there. Explicit dismiss for browser alert 
 might solve the issue or mouse click by coordinates, where 'Dismiss' button located, but I'm sure more elegant way of
 doing that already exists in Slack automation utilities =)
 
 - I noticed some latency for the saved message to be displayed on the 'has:star' search. Basically it takes some time
 for the search network call to response with just recently saved message included. I intentionally changed the task test
 steps to check the 'Saved items' first to give some extra time buffer, for the latency to be resolved. Also, I created
 a function that is polling for 36 seconds with 3 seconds interval for the search results to appear. Again, I believe
 a better way for doing that already exists in Slack automation utils
 
 - Playwright refused to resolve some of the 'data-qa' attributes, therefore alternative locator strategy had to be picked
 
## What can be improved
- Obviously all the hiccups above can be addressed in a more 'optimal' way =)

- Test data generation and clean up. Ideally, each test can create own test user, test workspace, scopes and all the test data and delete all of them after the test run is done. Potentially utility can be created that will make all the setup and cleanup with the API calls

- Logging. It might be a good idea to invest some time and research for logging library, that will allow to replace
most of execution console.logs and help to make code cleaner

- Screenshot comparison can be added to provide visual testing capabilities, which can be also used for some accessibility testing use cases

- Adding multibrowser support in configuration, splitting into parallel runs (potentially dealing with a concurrency, when different browsers will post the same message, which may lead to false positive results)

- Formatting. In case you don't like the one I used =)

## Thanks for taking time to review, any feedback will be highly appreciated! Let the coding force be with you!

#### P. S.
When I was researching websockets I did a small side project - Slack copy, to get  a better understanding of socket.io library. 
Design is super ugly and overall functionality is primitive, but I find it to be a fun coinsidence that I'm actually interviewing with Slack at the moment. 
If you're interested to check it out (as I mentioned it's very very basic), here is the [Repo](https://github.com/MykeSelivanov/chat-chat)
 