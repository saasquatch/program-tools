import { storiesOf } from "@storybook/react";
import React from "react";
import { Badge } from "../Badges";

storiesOf("Components / Badges", module).add("Default, Default, Short", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="default">
                Default Badge
            </Badge>
        </div>
    );
});

storiesOf("Components / Badges", module).add("With Icon, Default, Short", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="default" icon="icon-sqh-gift">
                Badge with icon
            </Badge>
        </div>
    );
});

storiesOf("Components / Badges", module).add("Default, Success, Short", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="success">
                Default Badge
            </Badge>
        </div>
    );
});

storiesOf("Components / Badges", module).add("With Icon, Success, Short", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="success" icon="icon-sqh-gift">
                Badge with icon
            </Badge>
        </div>
    );
});

storiesOf("Components / Badges", module).add("Default, Active, Short", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="active">
                Default Badge Active
            </Badge>
        </div>
    );
});

storiesOf("Components / Badges", module).add("With Icon, Active, Short", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="active" icon="icon-sqh-gift">
                Badge with icon
            </Badge>
        </div>
    );
});

storiesOf("Components / Badges", module).add("Default, Critical, Short", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="critical">
                Default Badge
            </Badge>
        </div>
    );
});

storiesOf("Components / Badges", module).add("With Icon, Critical, Short", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="critical" icon="icon-sqh-gift">
                Badge with icon
            </Badge>
        </div>
    );
});

storiesOf("Components / Badges", module).add("Default, Warning, Short", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="warning">
                Default Badge
            </Badge>
        </div>
    );
});

storiesOf("Components / Badges", module).add("With Icon, Warning, Short", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="warning" icon="icon-sqh-gift">
                Badge with icon
            </Badge>
        </div>
    );
});

storiesOf("Components / Badges", module).add("Default, Default, Long", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="default">
                A badge with a really really long name
            </Badge>
        </div>
    );
});

storiesOf("Components / Badges", module).add("With Icon, Default, Long", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="default" icon="icon-sqh-gift">
                A badge with a really really long name
            </Badge>
        </div>
    );
});

storiesOf("Components / Badges", module).add("Icon Only, Default, Short", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="default" icon="icon-sqh-gift"/>
        </div>
    );
});