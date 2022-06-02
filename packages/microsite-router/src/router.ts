import { getUserIdentity } from "./auth";
import { fetchPage } from "./pages";
import { render } from "./renderer";

/*
Scenario Outline: Logged in users can view PUBLIC pages, as long as there's no disallowedUrlPath
  Given a page has allowedUsers of PUBLIC
  And the page has a disallowedUrlPath of <disallowedUrlPath>
  And a user is of type <userType>
  When the page is routed to
  Then the router will <action>
  
  Examples:
  | userType   | disallowedUrlPath | action                 |
  | PUBLIC     |                   | render the page        |
  | PUBLIC     | /somewhere        | render the page        |
  | UNVERIFIED |                   | render the page        |
  | UNVERIFIED | /somewhere        | redirect to /somewhere |
  | VERIFIED   |                   | render the page        |
  | VERIFIED   | /somewhere        | redirect to /somewhere |
  
Secnario Outline: Users who do not match allowedUsers are redirected to 
*/

export async function route(pathname: string) {
  console.log("ROUTE", pathname);

  const pageResult = await fetchPage(pathname);
  const user = getUserIdentity();

  const allowedUsers = pageResult.page.allowedUsers;
  const disallowedUrlPath = pageResult.page.disallowedUrlPath;

  const userType = !user
    ? "PUBLIC"
    : user.managedIdentity?.emailVerified
    ? "VERIFIED"
    : "UNVERIFIED";

  console.log(" - USER TYPE:", userType);
  console.log(" - ALLOWED USERS:", allowedUsers);
  console.log(" - DISALLOWED URL PATH:", disallowedUrlPath);

  if (userType != allowedUsers && disallowedUrlPath) {
    console.log(
      " - User is not correct type, redirecting to",
      disallowedUrlPath
    );
    window.history.pushState(undefined, "", disallowedUrlPath);
  } else {
    render(pageResult);
  }
}
