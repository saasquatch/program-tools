import * as React from "react";
import { ListView } from ".";

export default {
  title: "Components / List",
  component: ListView,
};

export const defaultList = () => (
  <ListView>
    <ListView.ItemView>First element</ListView.ItemView>
    <ListView.ItemView>Second element</ListView.ItemView>
    <ListView.ItemView>Third element</ListView.ItemView>
  </ListView>
);

export const numberedList = () => (
  <ListView type="number">
    <ListView.ItemView>First element</ListView.ItemView>
    <ListView.ItemView>Second element</ListView.ItemView>
    <ListView.ItemView>Third element</ListView.ItemView>
  </ListView>
);
