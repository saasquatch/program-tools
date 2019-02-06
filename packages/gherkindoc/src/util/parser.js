import gherkin from 'gherkin';

/**
 * Parses the feature file and returns the stream
 * @param {String} path The path to the feature file
 * @return {Stream} The stream of data from the Gherkin parser
 */
export const parse = (path) => {
  const options = {
    includeSource: false,
    includeGherkinDocument: true,
    includePickles: false
  };

  return gherkin.fromPaths([path], options);
};
