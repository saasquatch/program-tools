import { useQuery, useUserIdentity } from "@saasquatch/component-boilerplate";
import { gql } from "graphql-request";
import { DateTime } from "luxon";
import { UserAttribute } from "./sqm-user-attribute";
import { UserAttributeViewProps } from "./sqm-user-attribute-view";

const GET_CUSTOM_FIELDS = gql`
  query getCustomFields {
    viewer {
      ... on User {
        customFields
      }
    }
  }
`;

export function useUserAttribute(props: UserAttribute): UserAttributeViewProps {
  const user = useUserIdentity();
  const res = useQuery(GET_CUSTOM_FIELDS, {}, !user?.jwt);
  const loading = res.loading;
  const customFields = res.data?.viewer?.customFields;
  let value = customFields?.[props.value as string];

  if (props.value === "lastSeenDate" && typeof value === "number") {
    value = DateTime.fromMillis(value).toLocaleString(DateTime.DATE_MED);
  }

  return {
    loading,
    value,
    fontSize: props.fontSize,
    color: props.color,
    fontWeight: props.fontWeight,
  };
}
