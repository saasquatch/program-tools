import { mockFirebase } from "./mocks/mockFirebase";
mockFirebase();

import { loadFeatures, autoBindSteps } from "jest-cucumber";

import steps from "./steps";

const features = loadFeatures("__tests__/features/**/*.feature");
autoBindSteps(features, steps);
