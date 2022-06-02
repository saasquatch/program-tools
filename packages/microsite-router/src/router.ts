import { getUserIdentity } from "./auth";
import { fetchPage } from "./pages";
import { render } from "./renderer";
import { debug } from "./debug";

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
  
Secnario Outline: Users who do not match allowedUsers are redirected to disallowedUrlPath if it exists
*/

export async function route(pathname: string) {
  const pageResult = await fetchPage(pathname);
  const user = getUserIdentity();

  debug("router", `routing to ${pathname}"`);

  const allowedUsers = pageResult.page.allowedUsers;
  const disallowedUrlPath = pageResult.page.disallowedUrlPath;

  const userType = !user
    ? "PUBLIC"
    : user.managedIdentity?.emailVerified
    ? "VERIFIED"
    : "UNVERIFIED";

  debug(
    `router`,
    `pathname[${pathname}] userType[${userType}] allowedUsers[${allowedUsers}] disallowedUrlPath:[${disallowedUrlPath}]`
  );

  if (userType != allowedUsers && disallowedUrlPath) {
    debug(
      `router`,
      `pathname[${pathname}] user is ${userType}, but expected ${allowedUsers}, redirecting to ${disallowedUrlPath}`
    );
    window.history.pushState(undefined, "", disallowedUrlPath);
  } else {
    render(pageResult);
  }
}
