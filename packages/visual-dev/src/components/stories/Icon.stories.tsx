import React from 'react';
import { Icon } from '../Icon'

export default {
  title: "Components / Icon",
  component: Icon
}

export const Success = () => <Icon icon={"icon-sqh-trash"}>Success</Icon>
export const Alert = () => <Icon fontSize={"23px"} icon={"sqh-alert"}>Success</Icon>

export const Success2 = () => <Icon color={"#65bd60"} icon={"icon-sqh-trash"}>Success</Icon>

