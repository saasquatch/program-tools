import { storiesOf } from "@storybook/react";
import React from "react";
import { Badge } from "../Badges";

storiesOf("Components / Badges", module).add("Default, Default", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="default">
                Default Badge
            </Badge>
        </div>
    );
});

storiesOf("Components / Badges", module).add("With Icon, Default", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="default" icon="icon-sqh-gift">
                Badge with icon
            </Badge>
        </div>
    );
});

storiesOf("Components / Badges", module).add("Default, Success", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="success">
                Default Badge
            </Badge>
        </div>
    );
});

storiesOf("Components / Badges", module).add("With Icon, Success", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="success" icon="icon-sqh-gift">
                Badge with icon
            </Badge>
        </div>
    );
});

storiesOf("Components / Badges", module).add("Default, Active", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="active">
                Default Badge Active
            </Badge>
        </div>
    );
});

storiesOf("Components / Badges", module).add("With Icon, Active", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="active" icon="icon-sqh-gift">
                Badge with icon
            </Badge>
        </div>
    );
});

storiesOf("Components / Badges", module).add("Default, Critical", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="critical">
                Default Badge
            </Badge>
        </div>
    );
});

storiesOf("Components / Badges", module).add("With Icon, Critical", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="critical" icon="icon-sqh-gift">
                Badge with icon
            </Badge>
        </div>
    );
});

storiesOf("Components / Badges", module).add("Default, Warning", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="warning">
                Default Badge
            </Badge>
        </div>
    );
});

storiesOf("Components / Badges", module).add("With Icon, Warning", () => {
    return (
        <div style={{ margin: "100px" }}>
            <Badge variant="warning" icon="icon-sqh-gift">
                Badge with icon
            </Badge>
        </div>
    );
});