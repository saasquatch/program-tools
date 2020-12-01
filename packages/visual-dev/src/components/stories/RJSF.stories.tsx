import { storiesOf } from "@storybook/react";
import React from "react";
import { RJSFContainer } from "../Layouts";
import { Link } from "../Links";
import { P } from "../Typography";
import Form from "react-jsonschema-form";
import { JSONSchema6 } from "json-schema";
import { ActionsArrayTemplate, DefaultTemplate } from "../FormTemplates";

const submitActionsSchema: JSONSchema6 = {
  $id: "http://json-schema.org/draft-06/schema#",
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "object",
  properties: {
    submitActions: {
      title: "",
      type: "array",
      items: {
        $ref: "#/definitions/submitAction",
      },
    },
  },
  definitions: {
    salesforceObject: {
      type: "string",
      title: "Salesforce Object",
      description:
        "The name of the Salesforce Object you would like to retrieve.",
    },
    fieldMapExpr: {
      type: "string",
      title: "Field Map Expression (JSONata)",
      description:
        "Mapping expression from form fields to Salesforce object fields.",
    },
    filterExpr: {
      type: "string",
      title: "Filter Expression (JSONata)",
      description: "The filter for looking up the existing Salesforce Object.",
    },
    customScriptExpr: {
      type: "string",
      title: "Custom Script Expression (JSONata)",
    },
    failOnDuplicateContacts: {
      type: "boolean",
      title: "Fail on Duplicate Contacts",
    },
    referenceabilityNameExpr: {
      type: "string",
      title: "Referenceability Name (JSONata)",
      description: "The referenceability name.",
    },
    submitAction: {
      type: "object",
      required: ["type"],
      properties: {
        type: {
          title: "Action Type",
          type: "string",
          enum: [
            "create",
            "update",
            "create_or_update",
            "custom_script",
            "refedge_create_contact_nomination",
            "refedge_add_contact_referenceability",
            "refedge_create_contact_request",
          ],
          default: "create",
        },
      },
      dependencies: {
        type: {
          oneOf: [
            {
              type: "object",
              required: ["customScriptExpr"],
              properties: {
                type: {
                  enum: ["custom_script"],
                },
                customScriptExpr: {
                  $ref: "#/definitions/customScriptExpr",
                },
              },
            },
            {
              type: "object",
              required: ["salesforceObject", "fieldMapExpr"],
              properties: {
                type: {
                  enum: ["create"],
                },
                salesforceObject: {
                  $ref: "#/definitions/salesforceObject",
                },
                fieldMapExpr: {
                  $ref: "#/definitions/fieldMapExpr",
                },
              },
            },
            {
              type: "object",
              required: ["salesforceObject", "filterExpr", "fieldMapExpr"],
              properties: {
                type: {
                  enum: ["update", "create_or_update"],
                },
                salesforceObject: {
                  $ref: "#/definitions/salesforceObject",
                },
                fieldMapExpr: {
                  $ref: "#/definitions/fieldMapExpr",
                },
                filterExpr: {
                  $ref: "#/definitions/filterExpr",
                },
              },
            },
            {
              type: "object",
              required: ["filterExpr"],
              properties: {
                type: {
                  enum: ["refedge_create_contact_nomination"],
                },
                filterExpr: {
                  $ref: "#/definitions/filterExpr",
                },
                failOnDuplicateContacts: {
                  $ref: "#/definitions/failOnDuplicateContacts",
                },
              },
            },
            {
              type: "object",
              required: ["filterExpr", "referenceabilityNameExpr"],
              properties: {
                type: {
                  enum: ["refedge_add_contact_referenceability"],
                },
                filterExpr: {
                  $ref: "#/definitions/filterExpr",
                },
                referenceabilityNameExpr: {
                  $ref: "#/definitions/referenceabilityNameExpr",
                },
                failOnDuplicateContacts: {
                  $ref: "#/definitions/failOnDuplicateContacts",
                },
              },
            },
            {
              type: "object",
              required: [
                "filterExpr",
                "referenceabilityNameExpr",
                "fieldMapExpr",
              ],
              properties: {
                type: {
                  enum: ["refedge_create_contact_request"],
                },
                filterExpr: {
                  $ref: "#/definitions/filterExpr",
                },
                referenceabilityNameExpr: {
                  $ref: "#/definitions/referenceabilityNameExpr",
                },
                fieldMapExpr: {
                  $ref: "#/definitions/fieldMapExpr",
                },
                failOnDuplicateContacts: {
                  $ref: "#/definitions/failOnDuplicateContacts",
                },
              },
            },
          ],
        },
      },
    },
  },
};

const uiSchema = {
  submitActions: {
    "ui:options": { label: false },
    items: {
      "ui:order": [
        "*",
        "salesforceObject",
        "filterExpr",
        "failOnDuplicateContacts",
        "referenceabilityNameExpr",
        "fieldMapExpr",
        "customScriptExpr",
      ],
      fieldMapExpr: {
        "ui:title": "Update a record",
        "ui:options": {
          defaultValue: `{"":""}`,
        },
      },
      filterExpr: {
        "ui:options": {
          defaultValue: `{"":""}`,
        },
      },
      referenceabilityNameExpr: {
        "ui:options": {
          defaultValue: `[""]`,
          singleRowArray: true,
        },
        "ui:title": "Referenceability name",
        "ui:description": (
          <P>
            The name of the Referenceability Type associated with the Contact
            Request
          </P>
        ),
      },
      customScriptExpr: {
        "ui:title": "Custom JSONata script",
        "ui:description": (
          <P>
            A{" "}
            <Link blue={true} href="http://docs.jsonata.org/overview.html">
              JSONata expression
            </Link>{" "}
            can be used to update a record in Salesforce.{" "}
          </P>
        ),
        "ui:widget": "textarea",
      },
      failOnDuplicateContacts: {
        "ui:title": (
          "Prevent contact records from being updated if duplicate contacts exist in Salesforce."
        ),
        "ui:label": <P>Fail on Duplicate Contacts</P>,
        "ui:widget": "checkbox",
      },
      type: {
        "ui:title": "Action type",
        "ui:options": {
          cardFormat: true,
          radioOptions: [
            {
              key: "create",
              label: "Create",
              description:
                "Insert a new Salesforce record with data from your form.",
              name: "action",
            },
            {
              key: "update",
              label: "Update",
              description:
                "Update an existing Salesforce record with data from your form.",
              name: "action",
            },
            {
              key: "create_or_update",
              label: "Create or update",
              description:
                "Update and existing Salesforce record with data from your form. Create a new Salesforce record if the requested record is not found.",
              name: "action",
            },
            {
              key: "custom_script",
              label: "Custom script",
              description:
                "Execute a custom script with data from your form.",
              name: "action",
            },
            {
              key: "refedge_create_contact_nomination",
              label: "Create Contact Nomination",
              description:
                "Create a Reference Edge nomination for a contact. Reference Edge can be configured to automatically approve the nomination to create a Basic Reference Profile.",
              name: "action",
            },
            {
              key: "refedge_create_contact_request",
              label: "Add Contact Request",
              description:
                "Add a Reference Edge Contact Request for a Contact and a specific referenceability type.",
              name: "action",
            },
            {
              key: "refedge_add_contact_referenceability",
              label: "Add Contact Referenceabillity",
              description:
                "Add a Reference Edge referenceabillity type to a contact's reference profile.",
              name: "action",
            },
          ],
        },
      },
    },
  },
};

storiesOf("Components / RJSF", module).add("Array", () => {
  return (
    <div style={{ margin: "100px" }}>
      <RJSFContainer>
        <Form
          schema={submitActionsSchema}
          uiSchema={uiSchema}
          ArrayFieldTemplate={ActionsArrayTemplate}
          FieldTemplate={DefaultTemplate}
          disabled={false}
          showErrorList={false}
          onSubmit={() => {console.log("submitted")}}
          noHtml5Validate
        >
          <button type="submit" className="btn btn-info">
            Save
          </button>
        </Form>
      </RJSFContainer>
    </div>
  );
});
