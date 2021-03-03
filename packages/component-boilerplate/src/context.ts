import { GraphQLClient } from "graphql-request";
import { createIntl, createIntlCache, IntlShape } from "@formatjs/intl";
import { createContext } from "@saasquatch/stencil-hooks";

export const GraphQLClientContext = createContext<GraphQLClient>(
  "sq-context:graphql"
);

/**
 * Provides the SaaSquach-compatible Locale string
 */
export const LocaleContext = createContext<string>("sq-context:locale");

/**
 * Provides the program ID as a string
 */
export const ProgramContext = createContext<string>("sq-context:program");
