import { useQuery, useUserIdentity } from "@saasquatch/component-boilerplate";
import { gql } from "graphql-request";
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
  const value = customFields?.[props.value];

  console.log("customFields", customFields, "value", value);

  return {
    loadingText: props.loadingText,
    loading,
    value,
  };
}
